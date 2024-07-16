// CartProvider.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ username: string; children: ReactNode }> = ({ username, children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${username}/cart`);
        const cartData = response.data.cart.map((item: { productId: number, quantity: number }) => {
          const product = response.data.products.find((p: any) => p.id === item.productId);
          return {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: item.quantity,
            image: product.image
          };
        });
        setCartItems(cartData);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCart();
  }, [username]);

  const addToCart = async (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        return [...prevItems, item];
      }
    });

    try {
      await axios.patch(`http://localhost:8080/users/${username}/cart`, {
        cart: [...cartItems, { productId: item.id, quantity: item.quantity }]
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

    try {
      await axios.delete(`http://localhost:8080/users/${username}/cart/${id}`);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    setCartItems([]);

    try {
      await axios.delete(`http://localhost:8080/users/${username}/cart`);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
