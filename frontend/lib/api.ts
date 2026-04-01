import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

// ── Books ──────────────────────────────────────────────
export interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  originalPrice?: number;
  genre: string;
  coverColor: string;
  coverAccent: string;
  badge?: string;
  stock: number;
  isNew: boolean;
  isFeatured: boolean;
}

export interface BooksResponse {
  books: Book[];
  total: number;
  page: number;
  pages: number;
}

export const getBooks = (params?: Record<string, string | boolean | number>) =>
  api.get<BooksResponse>('/books', { params }).then((r) => r.data);

export const getBook = (id: string) => api.get<Book>(`/books/${id}`).then((r) => r.data);

export const getGenres = () => api.get<string[]>('/books/genres').then((r) => r.data);

// ── Orders ─────────────────────────────────────────────
export interface OrderPayload {
  customer: { firstName: string; lastName: string; email: string };
  shippingAddress: { street: string; city: string; postalCode: string };
  items: { bookId: string; qty: number }[];
  paymentMethod: 'card' | 'mpesa' | 'sandbox';
}

export interface Order {
  _id: string;
  orderNumber: string;
  total: number;
  paymentStatus: string;
  status: string;
  sandboxMode: boolean;
}

export const placeOrder = (payload: OrderPayload) =>
  api.post<Order>('/orders', payload).then((r) => r.data);

export const getOrder = (orderNumber: string) =>
  api.get<Order>(`/orders/${orderNumber}`).then((r) => r.data);

// ── Payment ────────────────────────────────────────────
export const processPayment = (payload: {
  method: string;
  amount: number;
  cardNumber?: string;
  mpesaPhone?: string;
}) => api.post('/payment/process', payload).then((r) => r.data);

// ── Auth ───────────────────────────────────────────────
export const register = (data: { name: string; email: string; password: string }) =>
  api.post('/auth/register', data).then((r) => r.data);

export const login = (data: { email: string; password: string }) =>
  api.post('/auth/login', data).then((r) => r.data);

export const logout = () => api.post('/auth/logout').then((r) => r.data);

export default api;
