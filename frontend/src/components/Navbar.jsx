import { Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiX, FiSearch, FiShoppingCart, FiHeart, FiUser, FiMoon, FiSun, FiLogOut } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../context/authStore'
import { useThemeStore } from '../context/themeStore'
import { useCartStore } from '../context/cartStore'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { user, logout } = useAuthStore()
  const { isDarkMode, toggleTheme } = useThemeStore()
  const { cart } = useCartStore()
  const navigate = useNavigate()

  const cartItemCount = cart?.items?.length || 0

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`)
      setSearchTerm('')
      setSearchOpen(false)
    }
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:shadow-lg transition-shadow">
              H
            </div>
            <span className="font-bold text-xl hidden sm:inline-block text-gray-900 dark:text-white">Herbal</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 mx-8">
            <form onSubmit={handleSearch} className="w-full max-w-md relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary">
                <FiSearch size={20} />
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Products</Link>
            <Link to="/farmers" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">Farmers</Link>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors group">
              <FiShoppingCart size={24} />
              {cartItemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </Link>

            {/* Wishlist */}
            <Link to="/profile" className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              <FiHeart size={24} />
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                  <FiUser size={24} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg hidden group-hover:block py-2">
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                    <FiLogOut size={18} /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-emerald-600 transition-colors">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col gap-2 mt-4">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Products</Link>
              <Link to="/farmers" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Farmers</Link>
              <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Cart ({cartItemCount})</Link>
              {user && (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Dashboard</Link>
                  <button onClick={handleLogout} className="text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Logout</button>
                </>
              )}
              {!user && (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 bg-primary text-white rounded hover:bg-emerald-600">Login</Link>
              )}
              <button onClick={toggleTheme} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-2">
                {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
