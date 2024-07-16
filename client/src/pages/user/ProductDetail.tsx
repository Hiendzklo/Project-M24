import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  sku: string;
  status: string;
  description?: string;
  image?: string;
  date: string;
  category: number;
  sold: number;
  discount: number;
  smallImage?: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (amount: number) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + amount));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-white shadow rounded-lg">
      <div className="flex">
        <div className="w-1/2">
          <img
            src={product.image || 'https://via.placeholder.com/150'}
            alt={product.name}
            className="w-full h-96 object-cover mb-2 rounded"
          />
        </div>
        <div className="w-1/2 pl-4">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <div className="mb-2">
            <span className="text-xl text-red-500 font-bold">₫{product.price.toLocaleString()}</span>
            {product.discount > 0 && (
              <span className="ml-2 text-gray-500 line-through">₫{(product.price / (1 - product.discount / 100)).toLocaleString()}</span>
            )}
            <span className="ml-2 text-red-500 font-bold">{product.discount}% GIẢM</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-500">SKU: {product.sku}</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-500">Đã bán: {product.sold}</span>
          </div>
          <div className="mb-2">
            <p className="text-gray-700">{product.description}</p>
          </div>
          <div className="mb-2 flex items-center">
            <span className="mr-4">Số Lượng</span>
            <button onClick={() => handleQuantityChange(-1)} className="px-2 py-1 bg-gray-300">-</button>
            <span className="px-4">{quantity}</span>
            <button onClick={() => handleQuantityChange(1)} className="px-2 py-1 bg-gray-300">+</button>
          </div>
          <div className="flex space-x-4 mt-4">
            <button className="bg-orange-500 text-white px-4 py-2 rounded">Thêm Vào Giỏ Hàng</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded">Mua Ngay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
