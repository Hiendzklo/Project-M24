//App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/admin/Sidebar';
import Header from './components/admin/Header';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import OrderList from './components/admin/OrderList';
import CustomerList from './components/admin/CustomerList';
import Setting from './components/admin/Setting';


const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen">
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
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;