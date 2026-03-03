import Farmer from '../models/Farmer.js';
import User from '../models/User.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';

// Apply to become a Farmer
export const applyAsFarmer = asyncHandler(async (req, res, next) => {
  const { farmName, farmDescription, state, city, certification } = req.body;

  if (!farmName || !state || !city) {
    throw new AppError('Please provide farm name, state, and city', 400);
  }

  // Check if already a farmer
  const existingFarmer = await Farmer.findOne({ userId: req.user.userId });
  if (existingFarmer) {
    throw new AppError('You are already registered as a farmer', 400);
  }

  const farmer = await Farmer.create({
    userId: req.user.userId,
    farmName,
    farmDescription,
    farmLocation: { state, city },
    certification: certification || [],
    status: 'pending',
  });

  res.status(201).json({
    success: true,
    message: 'Farmer application submitted. Please wait for approval.',
    farmer,
  });
});

// Get Farmer Profile
export const getFarmerProfile = asyncHandler(async (req, res, next) => {
  const farmer = await Farmer.findById(req.params.farmerId)
    .populate('userId', 'firstName lastName email phone profileImage')
    .populate('products');

  if (!farmer) {
    throw new AppError('Farmer not found', 404);
  }

  res.status(200).json({
    success: true,
    farmer,
  });
});

// Update Farmer Profile (Only Farmer)
export const updateFarmerProfile = asyncHandler(async (req, res, next) => {
  const { farmName, farmDescription, farmSize, farmSizeUnit, bankDetails, certification } = req.body;

  const farmer = await Farmer.findOne({ userId: req.user.userId });

  if (!farmer) {
    throw new AppError('Farmer profile not found', 404);
  }

  if (farmName) farmer.farmName = farmName;
  if (farmDescription) farmer.farmDescription = farmDescription;
  if (farmSize) farmer.farmSize = farmSize;
  if (farmSizeUnit) farmer.farmSizeUnit = farmSizeUnit;
  if (bankDetails) farmer.bankDetails = bankDetails;
  if (certification) farmer.certification = certification;

  await farmer.save();

  res.status(200).json({
    success: true,
    message: 'Farmer profile updated successfully',
    farmer,
  });
});

// Get All Farmers (with pagination and filters)
export const getAllFarmers = asyncHandler(async (req, res, next) => {
  const { city, state, rating, page = 1, limit = 12 } = req.query;

  let filter = { status: 'approved', isVerified: true };

  if (city) filter['farmLocation.city'] = city;
  if (state) filter['farmLocation.state'] = state;

  const skip = (page - 1) * limit;

  const farmers = await Farmer.find(filter)
    .populate('userId', 'firstName lastName profileImage')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ rating: -1 })
    .exec();

  const totalFarmers = await Farmer.countDocuments(filter);

  res.status(200).json({
    success: true,
    farmers,
    pagination: {
      total: totalFarmers,
      pages: Math.ceil(totalFarmers / limit),
      currentPage: parseInt(page),
    },
  });
});

// Follow Farmer
export const followFarmer = asyncHandler(async (req, res, next) => {
  const farmer = await Farmer.findById(req.params.farmerId);

  if (!farmer) {
    throw new AppError('Farmer not found', 404);
  }

  if (farmer.followers.includes(req.user.userId)) {
    throw new AppError('You are already following this farmer', 400);
  }

  farmer.followers.push(req.user.userId);
  await farmer.save();

  res.status(200).json({
    success: true,
    message: 'Following farmer successfully',
  });
});

// Unfollow Farmer
export const unfollowFarmer = asyncHandler(async (req, res, next) => {
  const farmer = await Farmer.findById(req.params.farmerId);

  if (!farmer) {
    throw new AppError('Farmer not found', 404);
  }

  farmer.followers = farmer.followers.filter(f => f.toString() !== req.user.userId.toString());
  await farmer.save();

  res.status(200).json({
    success: true,
    message: 'Unfollowed farmer successfully',
  });
});

// Get Farmer Statistics
export const getFarmerStats = asyncHandler(async (req, res, next) => {
  const farmer = await Farmer.findOne({ userId: req.user.userId });

  if (!farmer) {
    throw new AppError('Farmer profile not found', 404);
  }

  res.status(200).json({
    success: true,
    stats: {
      totalProducts: farmer.products.length,
      followers: farmer.followers.length,
      rating: farmer.rating,
      totalSales: farmer.totalSales,
      totalRevenue: farmer.totalRevenue,
      walletBalance: farmer.walletBalance,
    },
  });
});
