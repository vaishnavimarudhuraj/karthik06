import express from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  isInWishlist,
} from '../controllers/wishlistController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, getWishlist);
router.get('/check', authMiddleware, isInWishlist);
router.post('/add', authMiddleware, addToWishlist);
router.post('/remove', authMiddleware, removeFromWishlist);
router.post('/clear', authMiddleware, clearWishlist);

export default router;
