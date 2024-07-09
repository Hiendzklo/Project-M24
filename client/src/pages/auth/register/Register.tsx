// src/pages/Register/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../store/axiosConfig';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import Footer from '../login/Footer';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = {
      id: Date.now(), // Tạo ID duy nhất dựa trên thời gian hiện tại
      username,
      password,
      email
    };

    try {
      await axiosInstance.post('/users', newUser);
      alert('Đăng ký thành công!');
      navigate('/login');
    } catch (error) {
      console.error('There was an error registering the user!', error);
      alert('Đăng ký thất bại, vui lòng thử lại.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-red-600">Shopee</div>
        <div className="text-sm text-red-600">Bạn cần giúp đỡ?</div>
      </header>
      <div className="relative flex-1 flex bg-gray-100" style={{ minHeight: '90vh' }}>
        <div className="relative w-2/3">
          <img 
            src="https://down-vn.img.susercontent.com/file/sg-11134004-7rd47-lwqocuzahgi2c3" 
            alt="Background" 
            className="absolute inset-0 w-full h-full object-cover z-0" 
          />
        </div>
        <div className="relative z-10 w-1/3 bg-white p-12 rounded-lg shadow-lg flex items-center justify-center border border-red-500 m-8">
          <div className="max-w-md w-full">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Đăng ký</h2>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="Tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Đăng ký
              </button>
            </form>
            <div className="text-center mt-6 w-full">
              <p>Bạn đã có tài khoản? <a href="/login" className="text-red-500 hover:underline">Đăng nhập</a></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
