import React, { useState, useEffect } from 'react';
import axiosInstance from '../../store/axiosConfig';
import { storage } from '../../config/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

interface AddProductFormProps {
  onCancel: () => void;
  product?: Product; // Thêm product vào prop
}

interface Product {
  id: number;
  name: string;
  status: string;
  category: string;
  price: number;
  date: string;
  image?: string;
  description?: string;
  sku: string; // Thêm thuộc tính sku
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onCancel, product }) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [status, setStatus] = useState('Available');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setPrice(product.price.toString());
      setSku(product.sku);
      setStatus(product.status);
      setDescription(product.description || '');
      setCategory(product.category);
    }
  }, [product]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = product?.image || '';

    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        }, 
        (error) => {
          console.error(error);
        }, 
        async () => {
          imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          saveProduct(imageUrl);
        }
      );
    } else {
      saveProduct(imageUrl);
    }
  };

  const saveProduct = async (imageUrl: string) => {
    const newProduct = {
      name: productName,
      price: parseFloat(price),
      sku,
      status,
      description,
      image: imageUrl,
      date: product?.date || new Date().toISOString().split('T')[0],
      category,
    };

    try {
      if (product) {
        await axiosInstance.put(`/products/${product.id}`, newProduct);
      } else {
        await axiosInstance.post('/products', newProduct);
      }
      onCancel(); // Đóng form sau khi thêm hoặc chỉnh sửa sản phẩm thành công
    } catch (error) {
      console.error('There was an error saving the product!', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <button className="text-blue-500 mb-4" onClick={onCancel}>
          &larr; Back
        </button>
        <h1 className="text-2xl font-bold mb-6">{product ? 'Edit Product' : 'Add Product'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
              Product Name
            </label>
            <input
              id="productName"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Product Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Price"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sku">
              SKU
            </label>
            <input
              id="sku"
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="SKU"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
              <option value="Preorder">Preorder</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Laptops">Laptops</option>
              <option value="Phones">Phones</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Image
            </label>
            <input
              id="image"
              type="file"
              onChange={handleImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Description"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {product ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
