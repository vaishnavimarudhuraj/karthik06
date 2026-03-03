import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import Farmer from '../models/Farmer.js';
import stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

// Create Order from Cart
export const createOrder = asyncHandler(async (req, res, next) => {
  const { shippingAddress, paymentMethod, couponCode } = req.body;

  if (!shippingAddress) {
    throw new AppError('Shipping address is required', 400);
  }

  // Get cart
  const cart = await Cart.findOne({ userId: req.user.userId });

  if (!cart || cart.items.length === 0) {
    throw new AppError('Cart is empty', 400);
  }

  // Create order items
  const items = [];
  let subtotal = 0;

  for (const cartItem of cart.items) {
    const product = await Product.findById(cartItem.productId);

    if (!product || product.stock < cartItem.quantity) {
      throw new AppError(`Insufficient stock for ${product?.name || 'product'}`, 400);
    }

    items.push({
      productId: cartItem.productId,
      farmerId: cartItem.farmerId,
      quantity: cartItem.quantity,
      price: cartItem.price,
      status: 'pending',
    });

    subtotal += cartItem.price * cartItem.quantity;
  }

  // Calculate totals
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const shippingCost = subtotal > 500 ? 0 : 50;
  const discount = 0; // Apply coupon logic here if needed
  const totalAmount = subtotal + tax + shippingCost - discount;

  // Create order
  const order = await Order.create({
    orderId: `ORD-${Date.now()}-${uuidv4().slice(0, 8).toUpperCase()}`,
    userId: req.user.userId,
    items,
    shippingAddress,
    paymentMethod: paymentMethod || 'card',
    subtotal,
    tax,
    shippingCost,
    discount,
    totalAmount,
    couponCode,
    orderStatus: 'pending',
  });

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    order,
  });
});

// Process Payment (Stripe)
export const processPayment = asyncHandler(async (req, res, next) => {
  const { orderId, token } = req.body;

  if (!orderId || !token) {
    throw new AppError('Order ID and payment token are required', 400);
  }

  const order = await Order.findById(orderId);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  try {
    // Create Stripe charge
    const charge = await stripeInstance.charges.create({
      amount: Math.round(order.totalAmount * 100), // Convert to cents
      currency: 'INR',
      source: token,
      description: `Order ${order.orderId}`,
      metadata: {
        orderId: order._id.toString(),
      },
    });

    // Update order
    order.paymentStatus = 'completed';
    order.orderStatus = 'confirmed';
    order.transactionId = charge.id;

    // Update product stock and farmer stats
    for (const item of order.items) {
      const product = await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity, sold: item.quantity } }
      );

      const farmer = await Farmer.findByIdAndUpdate(
        item.farmerId,
        {
          $inc: {
            totalSales: item.quantity,
            totalRevenue: item.price * item.quantity,
            walletBalance: item.price * item.quantity * 0.8, // 80% to farmer, 20% platform fee
          },
        }
      );
    }

    await order.save();

    // Clear cart
    await Cart.deleteOne({ userId: req.user.userId });

    res.status(200).json({
      success: true,
      message: 'Payment processed successfully',
      order,
    });
  } catch (error) {
    order.paymentStatus = 'failed';
    await order.save();

    throw new AppError(error.message || 'Payment processing failed', 500);
  }
});

// Get User Orders
export const getUserOrders = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10, status } = req.query;

  let filter = { userId: req.user.userId };

  if (status) {
    filter.orderStatus = status;
  }

  const skip = (page - 1) * limit;

  const orders = await Order.find(filter)
    .populate('items.productId', 'name thumbnail')
    .populate('items.farmerId', 'farmName')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await Order.countDocuments(filter);

  res.status(200).json({
    success: true,
    orders,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    },
  });
});

// Get Single Order
export const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId)
    .populate('items.productId')
    .populate('items.farmerId', 'farmName');

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  // Check authorization
  if (order.userId.toString() !== req.user.userId.toString()) {
    throw new AppError('Not authorized to view this order', 403);
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Track Order
export const trackOrder = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;

  const order = await Order.findOne({ orderId })
    .populate('items.productId', 'name thumbnail')
    .populate('items.farmerId', 'farmName');

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Cancel Order
export const cancelOrder = asyncHandler(async (req, res, next) => {
  const { cancellationReason } = req.body;

  const order = await Order.findById(req.params.orderId);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  // Check authorization
  if (order.userId.toString() !== req.user.userId.toString()) {
    throw new AppError('Not authorized to cancel this order', 403);
  }

  if (order.orderStatus === 'shipped' || order.orderStatus === 'delivered') {
    throw new AppError('Cannot cancel shipped or delivered orders', 400);
  }

  order.orderStatus = 'cancelled';
  order.cancellationReason = cancellationReason;

  // Refund logic
  if (order.paymentStatus === 'completed') {
    // Process refund via Stripe
    order.paymentStatus = 'refunded';
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: 'Order cancelled successfully',
    order,
  });
});
