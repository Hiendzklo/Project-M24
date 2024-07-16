import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../auth/login/Footer';

const Checkout: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();

  
  const handleCheckout = () => {
    if (!address || !phone || !name) {
      toast.error('Vui lòng điền đầy đủ thông tin người nhận');
      return;
    }

    // Thực hiện logic thanh toán ở đây
    clearCart();
    toast.success('Thanh toán thành công!');
    navigate('/');
  };

  return (
    <>
      
      <div className="container mx-auto p-4 bg-white shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Thanh Toán</h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Tên Người Nhận</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Địa Chỉ</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Số Điện Thoại</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <h2 className="text-xl font-bold mb-4">Giỏ Hàng</h2>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng của bạn đang trống.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center mb-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="ml-4">
                  <h3 className="text-lg">{item.name}</h3>
                  <p>Số Lượng: {item.quantity}</p>
                  <p>Giá: ₫{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
            <button
              onClick={handleCheckout}
              className="bg-orange-500 text-white px-4 py-2 rounded mt-4"
            >
              Thanh Toán
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;