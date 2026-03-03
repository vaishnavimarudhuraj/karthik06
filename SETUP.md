# Herbal E-Commerce Platform - Setup Guide

## Complete Setup Instructions

### Prerequisites Installation

1. **Install Node.js and npm**
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version && npm --version`

2. **Install MongoDB**
   - Option A: Local MongoDB - Download from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Option B: MongoDB Atlas (Cloud) - Free tier available at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a database and note the connection string

3. **Get Stripe API Keys**
   - Sign up at [stripe.com](https://stripe.com)
   - Get your Secret Key (starts with `sk_test_`)
   - Get your Public Key (starts with `pk_test_`)

### Backend Setup (Node.js + Express)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your values:
# MONGODB_URI=mongodb://localhost:27017/herbal-ecommerce
# JWT_SECRET=your-random-secret-string
# STRIPE_SECRET_KEY=sk_test_your_key
# etc.

# Start development server
npm run dev
# Server runs on http://localhost:5000
```

**Backend Features:**
- Express.js REST API
- MongoDB database
- JWT authentication
- Stripe payment integration
- Role-based access control
- Product management
- Cart & Order system
- Farmer community features

### Frontend Setup (React + Vite)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env:
# VITE_API_URL=http://localhost:5000/api
# VITE_STRIPE_PUBLIC_KEY=pk_test_your_key

# Start development server
npm run dev
# App runs on http://localhost:5173
```

**Frontend Features:**
- React 18 with Vite
- Tailwind CSS styling
- Framer Motion animations
- Dark/Light mode
- Responsive design
- Zustand state management
- Shopping cart & wishlist
- Product search & filters

### Initial Setup Steps

1. **Start MongoDB**
   ```bash
   # If local MongoDB:
   mongod
   
   # Or use MongoDB Atlas connection string
   ```

2. **Start Backend**
   ```bash
   cd backend
   npm run dev
   # Runs on http://localhost:5000
   ```

3. **Start Frontend** (in another terminal)
   ```bash
   cd frontend
   npm run dev
   # Runs on http://localhost:5173
   ```

4. **Access the Application**
   - Open browser to `http://localhost:5173`
   - Backend API available at `http://localhost:5000/api`

### First Steps in the Application

1. **Register Account**
   - Click "Sign up" button
   - Enter your details
   - Verify account

2. **Browse Products**
   - Go to Products page
   - Use search and filters
   - Click products to view details

3. **Add to Cart & Checkout**
   - Add items to cart
   - Proceed to checkout
   - Use Stripe test card: `4242 4242 4242 4242`
   - Use any future expiry date
   - Use any 3-digit CVC

4. **Track Orders**
   - View order status in Dashboard
   - Click order to track shipment

5. **Join Farmer Community** (Optional)
   - Apply to become a farmer
   - Wait for admin approval
   - Create and manage products
   - View earnings and ratings

### Test Credit Cards (Stripe)

Use these test cards for payment testing:

**Successful Payment**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., 12/25)
- CVC: Any 3 digits (e.g., 123)

**Declined Payment**
- Card: `4000 0000 0000 0002`
- Expiry: Any future date
- CVC: Any 3 digits

**Authentication Required**
- Card: `4000 0000 0000 3220`
- Expiry: Any future date
- CVC: Any 3 digits

### Project Structure Overview

```
HERBAL/
├── backend/
│   ├── src/
│   │   ├── models/          # Database models
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Auth, error handling
│   │   └── config/          # Database config
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/      # UI components
    │   ├── pages/          # Page components
    │   ├── context/        # Zustand stores
    │   ├── utils/          # Helper functions
    │   └── styles/         # CSS & Tailwind
    ├── package.json
    └── .env
```

### Key API Endpoints

**Authentication**
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

**Products**
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (farmers)

**Cart**
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item
- `PUT /api/cart/update` - Update quantity

**Orders**
- `POST /api/orders/create` - Create order
- `POST /api/orders/payment` - Process payment
- `GET /api/orders` - Get user orders

**Farmers**
- `POST /api/farmers/apply` - Apply as farmer
- `GET /api/farmers/:id` - Get farmer profile
- `GET /api/farmers/list/all` - List all farmers

### Troubleshooting

**Backend won't start**
- Check MongoDB connection
- Verify .env file exists with correct values
- Check port 5000 is available

**Frontend won't load**
- Verify backend is running
- Check .env file has correct API URL
- Clear browser cache

**Database connection error**
- Ensure MongoDB is running
- Verify MONGODB_URI in .env
- If using Atlas, whitelist your IP

**Payment not working**
- Verify Stripe keys in .env
- Use test card provided above
- Check browser console for errors

### Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload during development

2. **Database**: 
   - MongoDB Compass for local database visualization
   - MongoDB Atlas for cloud hosting

3. **API Testing**:
   - Use Postman or REST Client for API testing
   - API documentation in backend README

4. **Frontend Development**:
   - React DevTools browser extension
   - Vite's fast refresh capability

### Deployment (Future)

**Backend**
- Deploy to Heroku, Railway, or AWS
- Use MongoDB Atlas for database
- Configure environment variables

**Frontend**
- Build: `npm run build`
- Deploy to Vercel, Netlify, or similar
- Set Production API URL

### Next Steps

1. Explore the codebase
2. Customize with your branding
3. Add more features as needed
4. Deploy to production
5. Set up monitoring and analytics

### Support & Resources

- Backend README: `./backend/README.md`
- Frontend README: `./frontend/README.md`
- Main README: `./README.md`
- Project Documentation: All files include detailed comments

### Common Commands

```bash
# Backend
cd backend
npm install      # Install dependencies
npm run dev      # Start dev server
npm start        # Start production server

# Frontend
cd frontend
npm install      # Install dependencies
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

**Everything is ready to go! Happy coding! 🚀**
