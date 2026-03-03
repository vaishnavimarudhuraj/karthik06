import express from 'express';
import {
  applyAsFarmer,
  getFarmerProfile,
  updateFarmerProfile,
  getAllFarmers,
  followFarmer,
  unfollowFarmer,
  getFarmerStats,
} from '../controllers/farmerController.js';
import { authMiddleware, farmerAuthMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/apply', authMiddleware, applyAsFarmer);
router.get('/:farmerId', getFarmerProfile);
router.put('/', farmerAuthMiddleware, updateFarmerProfile);
router.get('/list/all', getAllFarmers);
router.post('/:farmerId/follow', authMiddleware, followFarmer);
router.post('/:farmerId/unfollow', authMiddleware, unfollowFarmer);
router.get('/stats/my', farmerAuthMiddleware, getFarmerStats);

export default router;
