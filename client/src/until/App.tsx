import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../pages/admin/Sidebar';
import Header from '../pages/admin/Header';
import Dashboard from '../pages/admin/Dashboard';
import ProductList from '../pages/admin/ProductList';
import OrderList from '../pages/admin/OrderList';
import CustomerList from '../pages/admin/CustomerList';
import Setting from '../pages/admin/Setting';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register'; // Import Register component

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <Router>
      {isLoggedIn ? (
        <div className="flex">
          <Sidebar handleLogout={handleLogout} />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-4 bg-gray-100">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/orders" element={<OrderList />} />
                <Route path="/customers" element={<CustomerList />} /> {/* Thêm route cho CustomerList */}
                <Route path="/setting" element={<Setting />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />  
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
