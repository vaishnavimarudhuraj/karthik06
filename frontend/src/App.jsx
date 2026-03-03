import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { useAuthStore } from './context/authStore'
import { useThemeStore } from './context/themeStore'
import 'react-toastify/dist/ReactToastify.css'

// Pages
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderTracking from './pages/OrderTracking'
import Farmers from './pages/Farmers'
import FarmerProfile from './pages/FarmerProfile'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'

// Layout Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const { getCurrentUser, token } = useAuthStore()
  const { isDarkMode } = useThemeStore()

  useEffect(() => {
    if (token) {
      getCurrentUser()
    }
  }, [token, getCurrentUser])

  return (
    <Router>
      <div className={isDarkMode ? 'dark' : ''}>
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/farmers" element={<Farmers />} />
              <Route path="/farmers/:farmerId" element={<FarmerProfile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/order-tracking/:orderId" element={<OrderTracking />} />

              {/* Protected Routes */}
              {token && (
                <>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                </>
              )}

              {/* 404 */}
              <Route path="*" element={<div className="text-center py-20">Page not found</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  )
}

export default App
