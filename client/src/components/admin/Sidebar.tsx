// src/components/admin/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBox, FaClipboardList, FaUsers, FaCog, FaQuestionCircle, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <h2 className="text-xl font-bold">Shopee</h2>
      </div>
      <nav className="flex-1 px-4 py-2">
        <ul>
          <li className="mt-2">
            <Link to="/" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <FaHome className="mr-2" /> Dashboard
            </Link>
          </li>
          <li className="mt-2">
            <Link to="/products" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <FaBox className="mr-2" /> Products
            </Link>
          </li>
          <li className="mt-2">
            <Link to="/orders" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <FaClipboardList className="mr-2" /> Orders
            </Link>
          </li>
          <li className="mt-2">
            <Link to="/customers" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <FaUsers className="mr-2" /> Customers
            </Link>
          </li>
          <li className="mt-2">
            <Link to="setting" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <FaCog className="mr-2" /> Settings
            </Link>
          </li>
        </ul>
      </nav>
      <div className="px-4 py-2 border-t border-gray-700">
        <ul>
          <li className="mt-2">
            <Link to="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <FaQuestionCircle className="mr-2" /> Help
            </Link>
          </li>
          <li className="mt-2">
            <Link to="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <FaEnvelope className="mr-2" /> Contact us
            </Link>
          </li>
          <li className="mt-2">
            <Link to="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <FaSignOutAlt className="mr-2" /> Log out
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
