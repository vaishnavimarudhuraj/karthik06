import mongoose from 'mongoose';

const farmerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    farmName: {
      type: String,
      required: [true, 'Please provide a farm name'],
      trim: true,
      maxlength: [100, 'Farm name cannot be more than 100 characters'],
    },
    farmDescription: {
      type: String,
      maxlength: [500, 'Farm description cannot be more than 500 characters'],
    },
    farmLocation: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
      latitude: Number,
      longitude: Number,
    },
    farmSize: {
      type: Number,
      default: 0,
    },
    farmSizeUnit: {
      type: String,
      enum: ['sqft', 'sqm', 'acres', 'hectares'],
      default: 'acres',
    },
    certification: [
      {
        name: String,
        issuer: String,
        issueDate: Date,
        expiryDate: Date,
        certificateImage: String,
      },
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numberOfRatings: {
      type: Number,
      default: 0,
    },
    walletBalance: {
      type: Number,
      default: 0,
    },
    bankDetails: {
      accountHolder: String,
      accountNumber: String,
      bankName: String,
      ifscCode: String,
      isVerified: Boolean,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationDate: Date,
    totalSales: {
      type: Number,
      default: 0,
    },
    totalRevenue: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'suspended'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// Index for faster queries
farmerSchema.index({ userId: 1 });
farmerSchema.index({ 'farmLocation.city': 1 });
farmerSchema.index({ rating: -1 });
farmerSchema.index({ createdAt: -1 });

export default mongoose.model('Farmer', farmerSchema);
