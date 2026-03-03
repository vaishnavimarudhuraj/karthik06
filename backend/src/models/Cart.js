import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        farmerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Farmer',
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    totalItems: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Method to calculate total price and items
cartSchema.methods.calculateTotals = function () {
  this.totalPrice = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
};

// Middleware to calculate before save
cartSchema.pre('save', function (next) {
  this.calculateTotals();
  next();
});

export default mongoose.model('Cart', cartSchema);
