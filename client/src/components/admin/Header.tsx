// src/components/admin/Header.tsx
import React from 'react';
import { FaSearch, FaBell } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between w-full">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold">Products</h1>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-100 rounded-full px-4 py-2 pl-10"
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
        </div>
        <FaBell className="ml-4 text-gray-400" />
        <div className="ml-4 flex items-center">
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.Uqq2J01zFaRMrqfWZcUJWwHaHa&pid=Api&P=0&h=180"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="ml-2">Shopee</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
