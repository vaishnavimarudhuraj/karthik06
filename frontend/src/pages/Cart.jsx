import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiLoader } from 'react-icons/fi'
import { useCartStore } from '../context/cartStore'
import { useToast } from '../hooks/useNotification'
import { formatPrice } from '../utils/helpers'

export default function Cart() {
  const { cart, getCart, updateCartItem, removeFromCart, loading } = useCartStore()
  const [ updating, setUpdating ] = useState(false)
  const { success, error: showError } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    getCart()
  }, [])

  const handleQuantityChange = async (productId, newQuantity) => {
    setUpdating(true)
    try {
      await updateCartItem(productId, newQuantity)
      success('Cart updated')
    } catch {
      showError('Failed to update cart')
    } finally {
      setUpdating(false)
    }
  }

  const handleRemove = async (productId) => {
    setUpdating(true)
    try {
      await removeFromCart(productId)
      success('Item removed from cart')
    } catch {
      showError('Failed to remove item')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button className="flex items-center gap-2 text-primary mb-6 hover:text-emerald-600">
          <FiArrowLeft /> Back to Shopping
        </button>

        <h1 className="text-4xl font-bold mb-12">Shopping Cart</h1>

        {!cart || cart.items.length === 0 ? (
          <div className="card text-center py-20">
            <p className="text-2xl font-bold mb-4">Your cart is empty</p>
            <Link to="/products" className="btn btn-primary inline-block">Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <motion.div 
                  key={item.productId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="card flex gap-4"
                >
                  <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.productId?.name || 'Product'}</h3>
                    <p className="text-primary font-bold text-lg">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-2 mt-4">
                      <button onClick={() => handleQuantityChange(item.productId, item.quantity - 1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        <FiMinus size={18} />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.productId, item.quantity + 1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        <FiPlus size={18} />
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRemove(item.productId)}
                    disabled={updating}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded self-start"
                  >
                    {updating ? <FiLoader className="animate-spin" /> : <FiTrash2 />}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="card h-fit">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 border-b border-gray-200 dark:border-gray-700 pb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(cart.totalPrice || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatPrice(cart.totalPrice > 500 ? 0 : 50)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18%)</span>
                  <span>{formatPrice((cart.totalPrice || 0) * 0.18)}</span>
                </div>
              </div>
              <div className="flex justify-between text-lg font-bold mt-6 mb-6">
                <span>Total</span>
                <span className="text-primary">{formatPrice((cart.totalPrice || 0) * 1.18 + (cart.totalPrice > 500 ? 0 : 50))}</span>
              </div>
              <button onClick={() => navigate('/checkout')} className="btn btn-primary w-full">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
