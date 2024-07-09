// src/pages/admin/Product.tsx
import React from 'react';

interface ProductProps {
  id: number;
  name: string;
  status: string;
  category: string;
  price: number;
  date: string;
}

const Product: React.FC<ProductProps> = ({ id, name, status, category, price, date }) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="px-4 py-2 text-left">{id}</td>
      <td className="px-4 py-2 text-left">{name}</td>
      <td className="px-4 py-2 text-left">{status}</td>
      <td className="px-4 py-2 text-left">{category}</td>
      <td className="px-4 py-2 text-left">${price.toFixed(2)}</td>
      <td className="px-4 py-2 text-left">{date}</td>
      <td className="px-4 py-2 text-left">
        <button className="bg-blue-500 text-white px-2 py-1 rounded mx-1">View</button>
        <button className="bg-yellow-500 text-white px-2 py-1 rounded mx-1">Edit</button>
        <button className="bg-red-500 text-white px-2 py-1 rounded mx-1">Delete</button>
      </td>
    </tr>
  );
};

export default Product;
