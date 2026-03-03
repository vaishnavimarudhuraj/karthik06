import Product from '../models/Product.js';
import Farmer from '../models/Farmer.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';

// Create Product (Farmer only)
export const createProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    price,
    originalPrice,
    category,
    tags,
    images,
    thumbnail,
    stock,
    unit,
    quantity,
    organic,
    certifications,
    nutritionInfo,
    usage,
    sideEffects,
    storageInstructions,
  } = req.body;

  // Validate required fields
  if (!name || !description || !price || !category || !stock || !quantity) {
    throw new AppError('Please provide all required fields', 400);
  }

  // Check if farmer exists
  const farmer = await Farmer.findOne({ userId: req.user.userId });
  if (!farmer) {
    throw new AppError('Please register as a farmer first', 400);
  }

  const product = await Product.create({
    name,
    description,
    price,
    originalPrice: originalPrice || price,
    discount: originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0,
    category,
    tags,
    farmerId: farmer._id,
    images,
    thumbnail,
    stock,
    unit: unit || 'gram',
    quantity,
    organic: organic || false,
    certifications,
    nutritionInfo,
    usage,
    sideEffects,
    storageInstructions,
  });

  farmer.products.push(product._id);
  await farmer.save();

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    product,
  });
});

// Get All Products (with search, filter, pagination)
export const getAllProducts = asyncHandler(async (req, res, next) => {
  const { search, category, minPrice, maxPrice, organic, page = 1, limit = 12, sort = '-createdAt' } = req.query;

  let filter = { isActive: true };

  if (search) {
    filter.$text = { $search: search };
  }

  if (category && category !== 'all') {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  if (organic === 'true') {
    filter.organic = true;
  }

  const skip = (page - 1) * limit;

  const products = await Product.find(filter)
    .populate('farmerId', 'farmName rating')
    .skip(skip)
    .limit(parseInt(limit))
    .sort(sort)
    .exec();

  const totalProducts = await Product.countDocuments(filter);

  res.status(200).json({
    success: true,
    products,
    pagination: {
      total: totalProducts,
      pages: Math.ceil(totalProducts / limit),
      currentPage: parseInt(page),
    },
  });
});

// Get Single Product
export const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.productId)
    .populate('farmerId', 'farmName rating followers')
    .populate('reviews.userId', 'firstName lastName profileImage');

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Get Product by Slug
export const getProductBySlug = asyncHandler(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate('farmerId', 'farmName rating followers')
    .populate('reviews.userId', 'firstName lastName profileImage');

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product (Farmer only)
export const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Check if farmer owns the product
  const farmer = await Farmer.findOne({ userId: req.user.userId });
  if (product.farmerId.toString() !== farmer._id.toString()) {
    throw new AppError('Not authorized to update this product', 403);
  }

  Object.assign(product, req.body);
  await product.save();

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    product,
  });
});

// Delete Product (Farmer only)
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Check if farmer owns the product
  const farmer = await Farmer.findOne({ userId: req.user.userId });
  if (product.farmerId.toString() !== farmer._id.toString()) {
    throw new AppError('Not authorized to delete this product', 403);
  }

  await Product.findByIdAndDelete(req.params.productId);
  farmer.products.pull(req.params.productId);
  await farmer.save();

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

// Add Review to Product
export const addReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    throw new AppError('Please provide a rating between 1 and 5', 400);
  }

  const product = await Product.findById(req.params.productId);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Check if user already reviewed
  const alreadyReviewed = product.reviews.some(r => r.userId.toString() === req.user.userId.toString());
  if (alreadyReviewed) {
    throw new AppError('You have already reviewed this product', 400);
  }

  product.reviews.push({
    userId: req.user.userId,
    rating,
    comment,
  });

  // Calculate average rating
  const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
  product.rating = (totalRating / product.reviews.length).toFixed(1);
  product.numberOfReviews = product.reviews.length;

  await product.save();

  res.status(201).json({
    success: true,
    message: 'Review added successfully',
    product,
  });
});

// Get Featured Products
export const getFeaturedProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({ isFeatured: true, isActive: true })
    .populate('farmerId', 'farmName')
    .limit(8);

  res.status(200).json({
    success: true,
    products,
  });
});

// Update Stock
export const updateStock = asyncHandler(async (req, res, next) => {
  const { quantity } = req.body;

  const product = await Product.findById(req.params.productId);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  product.stock -= quantity;
  product.sold += quantity;

  await product.save();

  res.status(200).json({
    success: true,
    message: 'Stock updated successfully',
    product,
  });
});
