import { create } from 'zustand';
import { cartAPI } from '../utils/api';

export const useCartStore = create((set) => ({
  cart: null,
  isLoading: false,
  error: null,

  getCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await cartAPI.get();
      set({ cart: response.data.cart, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch cart', isLoading: false });
    }
  },

  addToCart: async (productId, quantity) => {
    set({ error: null });
    try {
      const response = await cartAPI.add({ productId, quantity });
      set({ cart: response.data.cart });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to add to cart' });
      throw error;
    }
  },

  updateCartItem: async (productId, quantity) => {
    try {
      const response = await cartAPI.update({ productId, quantity });
      set({ cart: response.data.cart });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to update cart' });
      throw error;
    }
  },

  removeFromCart: async (productId) => {
    try {
      const response = await cartAPI.remove({ productId });
      set({ cart: response.data.cart });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to remove from cart' });
      throw error;
    }
  },

  clearCart: async () => {
    try {
      const response = await cartAPI.clear();
      set({ cart: response.data.cart });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to clear cart' });
      throw error;
    }
  },

  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
