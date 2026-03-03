import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
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
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

// Remove duplicate items
wishlistSchema.pre('save', function (next) {
  const seen = new Set();
  this.items = this.items.filter(item => {
    const id = item.productId.toString();
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
  next();
});

export default mongoose.model('Wishlist', wishlistSchema);
