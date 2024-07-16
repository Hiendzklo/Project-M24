import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../store/axiosConfig';
import { useCart } from '../user/CartContext';
import { toast } from 'react-toastify';
import HeaderUser from '../user/HeaderUser';
import Footer from '../auth/login/Footer';

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  category: number;
}

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const category = new URLSearchParams(location.search).get('category');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Thêm các state để lấy thông tin user từ localStorage
  const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));
  const [avatar, setAvatar] = useState<string | null>(localStorage.getItem('avatar'));

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let response;
        if (query) {
          response = await axiosInstance.get(`/products?name_like=${query}`);
        } else if (category) {
          response = await axiosInstance.get(`/products?category=${category}`);
        } else {
          response = await axiosInstance.get(`/products`);
        }
        setProducts(response.data);
      } catch (error) {
        setError('Error fetching products. Please try again later.');
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query, category]);

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1, image: product.image || 'https://via.placeholder.com/150' });
    toast.success('Đã thêm vào giỏ hàng');
  };

  const handleBuyNow = (product: Product) => {
    clearCart();
    addToCart({ ...product, quantity: 1, image: product.image || 'https://via.placeholder.com/150' });
    navigate('/checkout');
  };

  return (
    <>
      <HeaderUser username={username} avatar={avatar} />
      <div className="container mx-auto p-4 bg-white shadow rounded-lg mt-16">
        <h1 className="text-2xl font-bold mb-4">Kết Quả Tìm Kiếm</h1>
        {loading ? (
          <p>Đang tải...</p>
        ) : error ? (
          <p>{error}</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white shadow p-4 rounded flex flex-col">
                <img
                  src={product.image || 'https://via.placeholder.com/150'}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-2"
                />
                <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                <p className="text-red-500 font-bold mb-2">₫{product.price.toLocaleString()}</p>
                <div className="mt-auto flex justify-between">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Thêm vào giỏ hàng
                  </button>
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="bg-orange-500 text-white px-4 py-2 rounded"
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Không tìm thấy sản phẩm nào.</p>
        )}
      </div>
      <br/>
      <Footer />
    </>
  );
};

export default SearchResultsPage;
