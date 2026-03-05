# Herbal E-Commerce Frontend

Modern React + Vite frontend for the Herbal E-Commerce platform with seamless shopping experience.

## Features

- **Responsive Design**: Beautiful UI that works on all devices
- **Product Search & Filters**: Advanced search and filtering capabilities  
- **Shopping Cart & Wishlist**: Full-featured cart and wishlist management
- **User Authentication**: Secure login and registration
- **Dark/Light Mode**: Theme toggle for user preference
- **Smooth Animations**: Framer Motion animations for micro-interactions
- **Order Management**: Track orders in real-time
- **Farmer Community**: Connect with farmers and view their profiles
- **Payment Integration**: Stripe integration for secure payments
- **Performance Optimized**: Fast page loads and smooth navigation

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animation**: Framer Motion
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Notifications**: React Toastify
- **Icons**: React Icons

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update environment variables:
   - `VITE_API_URL`: Backend API URL
   - `VITE_STRIPE_PUBLIC_KEY`: Stripe public key
   - `VITE_APP_NAME`: Application name

## Running the App

### Development Mode
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable components (Navbar, Footer, etc.)
├── pages/           # Page components (Home, Products, Cart, etc.)
├── context/         # Zustand stores (authStore, cartStore, etc.)
├── hooks/           # Custom React hooks
├── utils/           # Helper functions and API services
├── styles/          # Global CSS and Tailwind
├── App.jsx          # Main App component
└── main.jsx         # Entry point
```

## Key Components

- **Navbar**: Top navigation with search, cart, and user menu
- **Footer**: Footer with links and social media
- **ProductCard**: Display product with price and rating
- **CartManager**: Handle cart operations
- **AuthForms**: Login and registration forms

## Store Structures

### Auth Store
- User authentication and management
- Login/Register/Logout
- Profile updates

### Cart Store
- Shopping cart operations
- Add/Remove/Update items
- Cart calculations

### Theme Store
- Dark/Light mode management
- Theme persistence

## Environment Variables

```
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_APP_NAME=Herbal Store
```

## Features Implementation Status

- ✅ Responsive Navigation
- ✅ Product Search & Listing
- ✅ User Authentication
- ✅ Shopping Cart
- ⏳ Product Details & Reviews
- ⏳ Checkout & Payment
- ⏳ Order Tracking
- ⏳ User Profile
- ⏳ Farmer Community
- ⏳ Admin Dashboard
- ✅ Dark Mode Support

## Performance Optimization

- Code splitting with lazy loading
- Image optimization
- Caching strategies
- Optimized bundle size
- Fast API calls with Axios

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast compliance
- Mobile-friendly

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Follow the existing code structure and style guidelines.

## License

MIT
