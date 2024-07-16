import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../pages/admin/Sidebar';
import Header from '../pages/admin/Header';
import Dashboard from '../pages/admin/Dashboard';
import ProductList from '../pages/admin/ProductList';
import OrderList from '../pages/admin/OrderList';
import CustomerList from '../pages/admin/CustomerList';
import Setting from '../pages/admin/Setting';
import Login from '../pages/auth/login/Login';
import HeaderUser from '../pages/user/HeaderUser';
import UserDashboard from '../pages/user/UserDashboard'; // Placeholder for user dashboard
import PromoSection from '../pages/user/PromoSection';
import CategorySection from '../pages/user/CategorySection';
import FlashSaleSection from '../pages/user/FlashSaleSection';
import PromotionSection from '../pages/user/PromotionSection';
import TopProductsSection from '../pages/user/TopProductsSection';
import ProductUser from '../pages/user/ProductUser';
import Register from '../pages/auth/register/Register';
import Footer from '../pages/auth/login/Footer';
import MyAccount from '../pages/user/MyAccount'; // Import trang MyAccount
import ProductDetail from '../pages/user/ProductDetail';
import CartPage from '../pages/user/CartPage';
import Checkout from '../pages/user/Checkout'; // Import trang Checkout
import { CartProvider } from '../pages/user/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderHistory from '../pages/user/OrderHistory'; // Import trang OrderHistory

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [role, setRole] = useState<string | null>(() => {
    return localStorage.getItem('role');
  });
  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem('username');
  });
  const [avatar, setAvatar] = useState<string | null>(() => {
    return localStorage.getItem('avatar');
  });

  const handleLogin = (userRole: string, username: string) => {
    setIsLoggedIn(true);
    setRole(userRole);
    setUsername(username);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('role', userRole);
    localStorage.setItem('username', username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
    setUsername(null);
    setAvatar(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');
  };

  const handleAvatarChange = (newAvatar: string) => {
    setAvatar(newAvatar);
    localStorage.setItem('avatar', newAvatar);
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('role');
    const username = localStorage.getItem('username');
    const avatar = localStorage.getItem('avatar');
    setIsLoggedIn(loggedIn);
    setRole(userRole);
    setUsername(username);
    setAvatar(avatar);
  }, []);

  return (
    <CartProvider username={username || ''}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleLogin} />} />
          <Route
            path="*"
            element={
              role === 'Admin' ? (
                <AdminLayout handleLogout={handleLogout} />
              ) : (
                <UserLayout
                  handleLogout={handleLogout}
                  username={username}
                  avatar={avatar}
                  handleAvatarChange={handleAvatarChange}
                  setUsername={setUsername}
                />
              )
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </CartProvider>
  );
};

const AdminLayout: React.FC<{ handleLogout: () => void }> = ({ handleLogout }) => (
  <div className="flex">
    <Sidebar handleLogout={handleLogout} />
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
);

const UserLayout: React.FC<{
  handleLogout: () => void;
  username: string | null;
  avatar: string | null;
  handleAvatarChange: (newAvatar: string) => void;
  setUsername: (username: string | null) => void;
}> = ({ handleLogout, username, avatar, handleAvatarChange, setUsername }) => (
  <div>
    <HeaderUser username={username} avatar={avatar} />
    <main className="flex-1 p-4 bg-gray-100">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PromoSection />
              <CategorySection />
              <FlashSaleSection />
              <PromotionSection />
              <TopProductsSection />
              <ProductUser />
              <br />
              <Footer />
            </>
          }
        />
        <Route path="/my-account" element={<MyAccount handleAvatarChange={handleAvatarChange} setUsername={setUsername} />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} /> 
        <Route path="/order-history" element={<OrderHistory />} /> 
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  </div>
);

export default App;
