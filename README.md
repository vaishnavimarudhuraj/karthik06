# Herbal E-Commerce Platform

A modern, production-ready e-commerce platform for herbal products with a farmer community system. Built with React, Node.js, MongoDB, and Stripe integration.

## 🌿 Features

### User Features
- 🛍️ **Product Shopping**: Browse, search, and filter herbal products
- 🛒 **Shopping Cart**: Full-featured cart management
- ❤️ **Wishlist**: Save favorite products
- 💳 **Multiple Payment Options**: Card, UPI, Net Banking, Wallet, COD
- 👤 **User Profiles**: Manage personal information and preferences
- 📦 **Order Tracking**: Real-time order status updates
- 🌓 **Dark/Light Mode**: User-preferred theme switching
- 🎯 **Personalized Experience**: Recommendations and favorites

### Farmer Community
- 👨‍🌾 **Farmer Registration**: Apply and register as a farmer
- 📊 **Farm Management**: Manage products and inventory
- 💰 **Earnings Dashboard**: Track sales and revenue
- ⭐ **Rating System**: Farmer reviews and ratings
- 👥 **Community Interaction**: Connect with other farmers and customers
- 📈 **Analytics**: Sales and performance metrics
- 🔐 **Secure Payments**: Instant payouts to bank accounts

### Admin Dashboard
- 📋 **User Management**: Manage customers and farmers
- 📦 **Product Management**: Monitor all products
- 📊 **Order Management**: Track and manage orders
- 💳 **Payment Tracking**: Monitor transactions
- ⚙️ **Settings**: Configure platform settings
- 📈 **Analytics**: Business insights and reports

## 🏗️ Project Structure

```
HERBAL/
├── backend/                    # Node.js Express Backend
│   ├── src/
│   │   ├── models/            # MongoDB models
│   │   ├── controllers/       # Route handlers
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Auth & error handling
│   │   ├── config/            # Database & config
│   │   ├── utils/             # Helper functions
│   │   └── server.js          # Main server file
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── frontend/                   # React Vite Frontend
    ├── src/
    │   ├── components/        # Reusable components
    │   ├── pages/            # Page components
    │   ├── context/          # Zustand stores
    │   ├── hooks/            # Custom hooks
    │   ├── utils/            # Helper functions
    │   ├── styles/           # CSS & Tailwind
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── .env.example
    └── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 5.0+
- npm or yarn

### Behind the Scenes Setup

1. **Backend Setup**:
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

2. **Frontend Setup**:
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

3. **Access the Application**:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api`

## 📚 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Payment Processing**: Stripe
- **File Uploads**: Multer
- **Validation**: express-validator

### Frontend
- **Library**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animation**: Framer Motion
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **UI Components**: React Icons
- **Notifications**: React Toastify

## 🔐 Authentication & Security

- JWT-based authentication
- Role-based access control (Customer, Farmer, Admin)
- Password hashing with bcryptjs
- Secure payment processing with Stripe
- CORS protection
- Input validation and sanitization
- Protected API endpoints

## 💳 Payment Integration

- **Stripe**: Primary payment gateway
- **Multiple Payment Methods**:
  - Credit/Debit Cards
  - UPI
  - Net Banking
  - Digital Wallets
  - Cash on Delivery (COD)

## 📱 Responsive Design

- Mobile-first design approach
- Optimized for all screen sizes
- Smooth animations and transitions
- Accessible UI with proper contrast
- Fast page load times

## 🌙 Dark Mode

- Automatic theme detection
- Toggle between light and dark modes
- Persistent theme preference
- Smooth theme transitions

## 📊 Database Schema

### Collections
- **Users**: Customer and farmer accounts
- **Farmers**: Farmer profiles and community data
- **Products**: Product listings with details
- **Cart**: User shopping carts
- **Orders**: Order history and tracking
- **Wishlist**: User favorites
- **Reviews**: Product reviews and ratings

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (farmer)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add to cart
- `PUT /api/cart/update` - Update cart item
- `POST /api/cart/remove` - Remove from cart

### Orders
- `POST /api/orders/create` - Create order
- `POST /api/orders/payment` - Process payment
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details

### Farmers
- `POST /api/farmers/apply` - Apply as farmer
- `GET /api/farmers/:id` - Get farmer profile
- `GET /api/farmers/list/all` - Get all farmers

## 🚀 Deployment

### Backend Deployment
- Deploy to Heroku, Railway, or AWS
- Set environment variables
- MongoDB should be on MongoDB Atlas
- Configure CORS for frontend URL

### Frontend Deployment
- Build: `npm run build`
- Deploy to Vercel, Netlify, or similar
- Set environment variables
- Configure API URL for production

## 📝 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/herbal-ecommerce
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_APP_NAME=Herbal Store
```

## 📈 Performance

- Optimized database queries with indexing
- Lazy loading for products
- Code splitting in frontend
- Caching strategies
- CDN for static assets
- Minified and optimized builds

## 🧪 Testing

- API endpoint testing with Postman
- Frontend unit tests with Vitest
- E2E testing with Cypress
- Manual testing procedures

## 📄 Documentation

- API documentation in `/backend/README.md`
- Frontend documentation in `/frontend/README.md`
- Component documentation with examples
- Setup guides and troubleshooting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by modern e-commerce platforms
- Built with best practices in mind
- Community feedback and contributions welcome

## 📞 Support

For issues and questions:
- Create an issue in GitHub
- Contact: support@herbalstore.com
- Documentation: Check README files in respective folders

---

**Made with ❤️ for sustainable agriculture and healthy living**
