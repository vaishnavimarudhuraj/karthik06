# Herbal E-Commerce Backend

Modern, production-ready backend for the Herbal E-Commerce platform with farmer community system.

## Features

- **User Authentication**: Secure JWT-based login/signup
- **Farmer Community**: Farmers can register, create profiles, and manage products
- **Product Management**: Create, update, delete products with reviews and ratings
- **Shopping Cart**: Add/remove items with stock management
- **Wishlist**: Save favorite products
- **Orders**: Complete order management with status tracking
- **Stripe Integration**: Secure payment processing
- **Admin Dashboard**: Manage users, farmers, products, and orders
- **Role-Based Access Control**: Customer, Farmer, Admin roles

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Payments**: Stripe
- **File Upload**: Multer

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
   - MongoDB URI
   - JWT Secret
   - Stripe API Keys
   - Email configuration (optional)

4. Ensure MongoDB is running locally or update `MONGODB_URI` in `.env`

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires auth)
- `PUT /api/auth/profile` - Update profile (requires auth)
- `PUT /api/auth/change-password` - Change password (requires auth)
- `POST /api/auth/logout` - Logout (requires auth)

### Farmers
- `POST /api/farmers/apply` - Apply to become a farmer
- `GET /api/farmers/:farmerId` - Get farmer profile
- `PUT /api/farmers` - Update farmer profile (farmer only)
- `GET /api/farmers/list/all` - Get all approved farmers
- `POST /api/farmers/:farmerId/follow` - Follow farmer (requires auth)
- `POST /api/farmers/:farmerId/unfollow` - Unfollow farmer (requires auth)
- `GET /api/farmers/stats/my` - Get farmer statistics (farmer only)

### Products
- `POST /api/products` - Create product (farmer only)
- `GET /api/products` - Get all products with search/filter
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:productId` - Get single product
- `GET /api/products/search/:slug` - Get product by slug
- `PUT /api/products/:productId` - Update product (farmer only)
- `DELETE /api/products/:productId` - Delete product (farmer only)
- `POST /api/products/:productId/review` - Add review (requires auth)
- `PATCH /api/products/:productId/stock` - Update stock

### Cart
- `GET /api/cart` - Get user's cart (requires auth)
- `POST /api/cart/add` - Add item to cart (requires auth)
- `PUT /api/cart/update` - Update cart item (requires auth)
- `POST /api/cart/remove` - Remove from cart (requires auth)
- `POST /api/cart/clear` - Clear cart (requires auth)

### Wishlist
- `GET /api/wishlist` - Get wishlist (requires auth)
- `POST /api/wishlist/add` - Add to wishlist (requires auth)
- `POST /api/wishlist/remove` - Remove from wishlist (requires auth)
- `POST /api/wishlist/clear` - Clear wishlist (requires auth)
- `GET /api/wishlist/check` - Check if product in wishlist (requires auth)

### Orders
- `POST /api/orders/create` - Create order from cart (requires auth)
- `POST /api/orders/payment` - Process payment (requires auth)
- `GET /api/orders` - Get user's orders (requires auth)
- `GET /api/orders/:orderId` - Get single order (requires auth)
- `GET /api/orders/track/:orderId` - Track order
- `POST /api/orders/:orderId/cancel` - Cancel order (requires auth)

## Environment Variables

```
MONGODB_URI=mongodb://localhost:27017/herbal-ecommerce
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
FRONTEND_URL=http://localhost:5173
```

## Database Models

- **User**: Customer, Farmer, Admin users
- **Farmer**: Farmer profiles and community data
- **Product**: Product listings with reviews
- **Cart**: User shopping cart
- **Order**: Order management and tracking
- **Wishlist**: User wishlist

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Role-based access control
- CORS protection
- Input validation
- Error handling middleware
- Secure payment processing

## Performance Optimizations

- Database indexing
- Query optimization
- Pagination support
- Text search capabilities
- Async/await error handling

## Contributing

Please follow the existing code structure and style.

## License

MIT
