import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../context/authStore'
import { motion } from 'framer-motion'

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { user, token } = useAuthStore()

  if (!token || !user) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-400">You don't have permission to access this page.</p>
          <a href="/" className="mt-6 inline-block btn btn-primary">Go Back Home</a>
        </motion.div>
      </div>
    )
  }

  return children
}
