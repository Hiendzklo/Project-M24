import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import Footer from '../auth/login/Footer';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="container mx-auto p-4 bg-white shadow rounded-lg flex-grow">
          Giỏ hàng của bạn đang trống.
        </div>
        <Footer />
      </div>
    );
  }

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      updateQuantity(id, quantity);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-4 bg-white shadow rounded-lg flex-grow">
        <h1 className="text-2xl font-bold mb-4">Giỏ Hàng</h1>
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th className="border p-2">Sản Phẩm</th>
              <th className="border p-2">Giá</th>
              <th className="border p-2">Số Lượng</th>
              <th className="border p-2">Tổng</th>
              <th className="border p-2">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td className="border p-2">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover inline-block mr-2" />
                  {item.name}
                </td>
                <td className="border p-2">₫{item.price.toLocaleString()}</td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    className="w-16 p-2 border rounded"
                    min="1"
                  />
                </td>
                <td className="border p-2">₫{(item.price * item.quantity).toLocaleString()}</td>
                <td className="border p-2">
                  <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white px-4 py-2 rounded">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center">
          <button onClick={clearCart} className="bg-gray-500 text-white px-4 py-2 rounded">Xóa Tất Cả</button>
          <Link to="/checkout" className="bg-green-500 text-white px-4 py-2 rounded">Thanh Toán</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
