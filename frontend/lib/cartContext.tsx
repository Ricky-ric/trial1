'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface CartItem {
  bookId: string;
  title: string;
  author: string;
  price: number;
  coverColor: string;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (bookId: string) => void;
  updateQty: (bookId: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shippingCost: number;
  total: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('merlin-cart');
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  // Persist cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem('merlin-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'qty'>) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.bookId === newItem.bookId);
      if (exists) return prev.map((i) => i.bookId === newItem.bookId ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...newItem, qty: 1 }];
    });
  };

  const removeItem = (bookId: string) => setItems((prev) => prev.filter((i) => i.bookId !== bookId));

  const updateQty = (bookId: string, qty: number) => {
    if (qty <= 0) return removeItem(bookId);
    setItems((prev) => prev.map((i) => i.bookId === bookId ? { ...i, qty } : i));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingCost = subtotal >= 45 ? 0 : subtotal === 0 ? 0 : 4.99;
  const total = subtotal + shippingCost;

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, subtotal, shippingCost, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
