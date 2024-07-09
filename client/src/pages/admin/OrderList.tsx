// src/pages/admin/OrderList.tsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../store/axiosConfig';
import { FaSort } from 'react-icons/fa';

interface Order {
  id: number;
  productName: string;
  orderId: string;
  userId: string;
  status: string;
  totalPrice: number;
  date: string;
  note: string;
}

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('There was an error fetching the orders!', error);
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 bg-white shadow rounded-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="relative">
          <select className="bg-gray-100 rounded-full px-4 py-2">
            <option>Sort by: ID</option>
          </select>
          <FaSort className="absolute top-3 right-3 text-gray-400" />
        </div>
      </div>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Tên sản phẩm</th>
            <th className="px-4 py-2 text-left">Mã đơn hàng</th>
            <th className="px-4 py-2 text-left">ID User</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Total Price</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Note</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map(order => (
            <tr key={order.id} className="border-b border-gray-200">
              <td className="px-4 py-2">{order.id}</td>
              <td className="px-4 py-2">{order.productName}</td>
              <td className="px-4 py-2">{order.orderId}</td>
              <td className="px-4 py-2">{order.userId}</td>
              <td className="px-4 py-2">{order.status}</td>
              <td className="px-4 py-2">${order.totalPrice.toFixed(2)}</td>
              <td className="px-4 py-2">{order.date}</td>
              <td className="px-4 py-2">{order.note}</td>
              <td className="px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded mx-1">Details</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded mx-1">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex list-none">
            {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, index) => (
              <li key={index} className={`mx-1 ${currentPage === index + 1 ? 'bg-gray-300' : ''}`}>
                <button onClick={() => paginate(index + 1)} className="px-3 py-1 rounded-full">
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default OrderList;
