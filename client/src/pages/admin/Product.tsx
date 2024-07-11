import React from 'react';

interface ProductProps {
  id: number;
  name: string;
  status: string;
  category: string; // Cập nhật kiểu dữ liệu category
  price: number;
  date: string;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Product: React.FC<ProductProps> = ({ id, name, status, category, price, date, onView, onEdit, onDelete }) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="px-4 py-2 text-left">{id}</td>
      <td className="px-4 py-2 text-left">{name}</td>
      <td className="px-4 py-2 text-left">{status}</td>
      <td className="px-4 py-2 text-left">{category}</td> {/* Hiển thị tên danh mục */}
      <td className="px-4 py-2 text-left">${price.toFixed(2)}</td>
      <td className="px-4 py-2 text-left">{date}</td>
      <td className="px-4 py-2 text-left">
        <button className="bg-blue-500 text-white px-2 py-1 rounded mx-1" onClick={() => onView(id)}>View</button>
        <button className="bg-yellow-500 text-white px-2 py-1 rounded mx-1" onClick={() => onEdit(id)}>Edit</button>
        <button className="bg-red-500 text-white px-2 py-1 rounded mx-1" onClick={() => onDelete(id)}>Delete</button>
      </td>
    </tr>
  );
};

export default Product;
