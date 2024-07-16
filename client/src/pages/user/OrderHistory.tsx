import React, { useState, useEffect } from 'react';
import axiosInstance from '../../store/axiosConfig';
import HeaderUser from './HeaderUser';
import Footer from '../auth/login/Footer';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  address: string;
  phone: string;
  name: string;
  date: string;
  status: string;
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
          const userResponse = await axiosInstance.get(`/users/${storedUserId}`);
          setUsername(userResponse.data.username);
          setAvatar(userResponse.data.avatar || null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchOrders = async () => {
      try {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
          const ordersResponse = await axiosInstance.get(`/orders?userId=${storedUserId}`);
          setOrders(ordersResponse.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchUserData();
    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderUser username={username} avatar={avatar} />
      <div className="container mx-auto p-4 bg-white shadow rounded-lg flex-grow">
        <h1 className="text-2xl font-bold mb-4">Lịch Sử Đơn Hàng</h1>
        {orders.length === 0 ? (
          <p>Bạn chưa có đơn hàng nào.</p>
        ) : (
          orders.map(order => (
            <div key={order.id} className="mb-4 p-4 border rounded-lg">
              <h2 className="text-xl font-bold mb-2">Đơn hàng #{order.id}</h2>
              <p className="mb-1">Tên người nhận: {order.name}</p>
              <p className="mb-1">Địa chỉ: {order.address}</p>
              <p className="mb-1">Số điện thoại: {order.phone}</p>
              <p className="mb-1">Ngày đặt: {new Date(order.date).toLocaleString()}</p>
              <p className="mb-1">Trạng thái: {order.status}</p>
              <h3 className="text-lg font-bold mt-4 mb-2">Sản phẩm:</h3>
              {order.items.map(item => (
                <div key={item.id} className="flex items-center mb-2">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="ml-4">
                    <h4 className="text-md">{item.name}</h4>
                    <p>Số lượng: {item.quantity}</p>
                    <p>Giá: ₫{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistory;
