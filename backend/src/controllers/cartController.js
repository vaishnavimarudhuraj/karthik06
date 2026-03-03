import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';

// Get Cart
export const getCart = asyncHandler(async (req, res, next) => {
  let cart = await Cart.findOne({ userId: req.user.userId })
    .populate('items.productId')
    .populate('items.farmerId', 'farmName');

  if (!cart) {
    cart = await Cart.create({ userId: req.user.userId });
  }

  res.status(200).json({
    success: true,
    cart,
  });
});

// Add to Cart
export const addToCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity < 1) {
    throw new AppError('Please provide valid product ID and quantity', 400);
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  if (product.stock < quantity) {
    throw new AppError('Insufficient stock available', 400);
  }

  let cart = await Cart.findOne({ userId: req.user.userId });

  if (!cart) {
    cart = await Cart.create({ userId: req.user.userId });
  }

  // Check if product already in cart
  const existingItem = cart.items.find(item => item.productId.toString() === productId.toString());

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      productId,
      quantity,
      price: product.price,
      farmerId: product.farmerId,
    });
  }

  await cart.save();
  await cart.populate([
    { path: 'items.productId' },
    { path: 'items.farmerId', select: 'farmName' }
  ]);

  res.status(200).json({
    success: true,
    message: 'Item added to cart',
    cart,
  });
});

// Update Cart Item
export const updateCartItem = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity < 0) {
    throw new AppError('Please provide valid product ID and quantity', 400);
  }

  const cart = await Cart.findOne({ userId: req.user.userId });

  if (!cart) {
    throw new AppError('Cart not found', 404);
  }

  if (quantity === 0) {
    // Remove item
    cart.items = cart.items.filter(item => item.productId.toString() !== productId.toString());
  } else {
    const item = cart.items.find(item => item.productId.toString() === productId.toString());

    if (!item) {
      throw new AppError('Product not in cart', 404);
    }

    // Check stock
    const product = await Product.findById(productId);
    if (product.stock < quantity) {
      throw new AppError('Insufficient stock available', 400);
    }

    item.quantity = quantity;
  }

  await cart.save();
  await cart.populate([
    { path: 'items.productId' },
    { path: 'items.farmerId', select: 'farmName' }
  ]);

  res.status(200).json({
    success: true,
    message: 'Cart updated successfully',
    cart,
  });
});

// Remove from Cart
export const removeFromCart = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;

  if (!productId) {
    throw new AppError('Product ID is required', 400);
  }

  const cart = await Cart.findOne({ userId: req.user.userId });

  if (!cart) {
    throw new AppError('Cart not found', 404);
  }

  cart.items = cart.items.filter(item => item.productId.toString() !== productId.toString());

  await cart.save();
  await cart.populate([
    { path: 'items.productId' },
    { path: 'items.farmerId', select: 'farmName' }
  ]);

  res.status(200).json({
    success: true,
    message: 'Item removed from cart',
    cart,
  });
});

// Clear Cart
export const clearCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ userId: req.user.userId });

  if (!cart) {
    throw new AppError('Cart not found', 404);
  }

  cart.items = [];
  await cart.save();

  res.status(200).json({
    success: true,
    message: 'Cart cleared successfully',
    cart,
  });
});
