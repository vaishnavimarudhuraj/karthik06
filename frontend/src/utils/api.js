import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
  logout: () => api.post('/auth/logout'),
};

// Products API
export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getBySlug: (slug) => api.get(`/products/search/${slug}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  addReview: (id, data) => api.post(`/products/${id}/review`, data),
  getFeatured: () => api.get('/products/featured'),
};

// Cart API
export const cartAPI = {
  get: () => api.get('/cart'),
  add: (data) => api.post('/cart/add', data),
  update: (data) => api.put('/cart/update', data),
  remove: (data) => api.post('/cart/remove', data),
  clear: () => api.post('/cart/clear'),
};

// Wishlist API
export const wishlistAPI = {
  get: () => api.get('/wishlist'),
  add: (data) => api.post('/wishlist/add', data),
  remove: (data) => api.post('/wishlist/remove', data),
  clear: () => api.post('/wishlist/clear'),
  check: (productId) => api.get('/wishlist/check', { params: { productId } }),
};

// Orders API
export const orderAPI = {
  create: (data) => api.post('/orders/create', data),
  processPayment: (data) => api.post('/orders/payment', data),
  getAll: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  track: (orderId) => api.get(`/orders/track/${orderId}`),
  cancel: (id, data) => api.post(`/orders/${id}/cancel`, data),
};

// Farmers API
export const farmerAPI = {
  apply: (data) => api.post('/farmers/apply', data),
  getProfile: (id) => api.get(`/farmers/${id}`),
  update: (data) => api.put('/farmers', data),
  getAll: (params) => api.get('/farmers/list/all', { params }),
  follow: (id) => api.post(`/farmers/${id}/follow`),
  unfollow: (id) => api.post(`/farmers/${id}/unfollow`),
  getStats: () => api.get('/farmers/stats/my'),
};

export default api;
