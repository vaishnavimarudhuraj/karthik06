import express from 'express';
import {
  createOrder,
  processPayment,
  getUserOrders,
  getOrderById,
  trackOrder,
  cancelOrder,
} from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', authMiddleware, createOrder);
router.post('/payment', authMiddleware, processPayment);
router.get('/', authMiddleware, getUserOrders);
router.get('/:orderId', authMiddleware, getOrderById);
router.get('/track/:orderId', trackOrder);
router.post('/:orderId/cancel', authMiddleware, cancelOrder);

export default router;
