// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../pages/admin/Sidebar';
import Header from '../pages/admin/Header';
import Dashboard from '../pages/admin/Dashboard';
import ProductList from '../pages/admin/ProductList';
import OrderList from '../pages/admin/OrderList';
import CustomerList from '../pages/admin/CustomerList';
import Setting from '../pages/admin/Setting';
import Login from '../pages/admin/Login';


const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <div className="flex flex-col min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-4 bg-gray-100">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/orders" element={<OrderList />} />
                <Route path="/customers" element={<CustomerList />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
