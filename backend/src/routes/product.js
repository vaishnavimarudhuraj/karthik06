import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  addReview,
  getFeaturedProducts,
  updateStock,
} from '../controllers/productController.js';
import { authMiddleware, farmerAuthMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', farmerAuthMiddleware, createProduct);
router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/search/:slug', getProductBySlug);
router.get('/:productId', getProductById);
router.put('/:productId', farmerAuthMiddleware, updateProduct);
router.delete('/:productId', farmerAuthMiddleware, deleteProduct);
router.post('/:productId/review', authMiddleware, addReview);
router.patch('/:productId/stock', updateStock);

export default router;
