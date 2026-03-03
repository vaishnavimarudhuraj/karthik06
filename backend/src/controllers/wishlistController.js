import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';

// Get Wishlist
export const getWishlist = asyncHandler(async (req, res, next) => {
  let wishlist = await Wishlist.findOne({ userId: req.user.userId })
    .populate('items.productId');

  if (!wishlist) {
    wishlist = await Wishlist.create({ userId: req.user.userId });
  }

  res.status(200).json({
    success: true,
    wishlist,
  });
});

// Add to Wishlist
export const addToWishlist = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;

  if (!productId) {
    throw new AppError('Product ID is required', 400);
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  let wishlist = await Wishlist.findOne({ userId: req.user.userId });

  if (!wishlist) {
    wishlist = await Wishlist.create({ userId: req.user.userId });
  }

  // Check if already in wishlist
  const alreadyAdded = wishlist.items.some(item => item.productId.toString() === productId.toString());

  if (alreadyAdded) {
    throw new AppError('Product already in wishlist', 400);
  }

  wishlist.items.push({ productId });
  await wishlist.save();
  await wishlist.populate('items.productId');

  res.status(200).json({
    success: true,
    message: 'Product added to wishlist',
    wishlist,
  });
});

// Remove from Wishlist
export const removeFromWishlist = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;

  if (!productId) {
    throw new AppError('Product ID is required', 400);
  }

  const wishlist = await Wishlist.findOne({ userId: req.user.userId });

  if (!wishlist) {
    throw new AppError('Wishlist not found', 404);
  }

  wishlist.items = wishlist.items.filter(item => item.productId.toString() !== productId.toString());

  await wishlist.save();
  await wishlist.populate('items.productId');

  res.status(200).json({
    success: true,
    message: 'Product removed from wishlist',
    wishlist,
  });
});

// Clear Wishlist
export const clearWishlist = asyncHandler(async (req, res, next) => {
  const wishlist = await Wishlist.findOne({ userId: req.user.userId });

  if (!wishlist) {
    throw new AppError('Wishlist not found', 404);
  }

  wishlist.items = [];
  await wishlist.save();

  res.status(200).json({
    success: true,
    message: 'Wishlist cleared successfully',
    wishlist,
  });
});

// Check if Product in Wishlist
export const isInWishlist = asyncHandler(async (req, res, next) => {
  const { productId } = req.query;

  const wishlist = await Wishlist.findOne({ userId: req.user.userId });

  const isInWishlist = wishlist?.items.some(item => item.productId.toString() === productId.toString()) || false;

  res.status(200).json({
    success: true,
    isInWishlist,
  });
});
