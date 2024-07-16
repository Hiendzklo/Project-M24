// src/pages/admin/Sidebar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaBox, FaClipboardList, FaUsers, FaCog, FaQuestionCircle, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

interface SidebarProps {
  handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleLogout }) => {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout();
    navigate('/login');  // Chuyển hướng đến trang đăng nhập sau khi đăng xuất
  };

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col h-screen">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <h2 className="text-xl font-bold">Shopee</h2>
      </div>
      <nav className="flex-1 px-4 py-2 overflow-y-auto">
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
            <Link to="/customers" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <FaUsers className="mr-2" /> Customers
            </Link>
          </li>
          <li className="mt-2">
            <Link to="/setting" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
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
            <button
              onClick={onLogoutClick}
              className="flex items-center py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
            >
              <FaSignOutAlt className="mr-2" /> Log out
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
