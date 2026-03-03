import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi'
import { productAPI } from '../utils/api'
import { formatPrice } from '../utils/helpers'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterOpen, setFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 })
  const [selectedCategory, setSelectedCategory] = useState('all')
  const navigate = useNavigate()

  const categories = ['all', 'herbs', 'spices', 'supplements', 'teas', 'oils', 'powders', 'extracts', 'creams']

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const params = {
          search: searchParams.get('search') || '',
          category: selectedCategory !== 'all' ? selectedCategory : '',
          minPrice: priceRange.min,
          maxPrice: priceRange.max,
          page: 1,
          limit: 12,
        }
        const response = await productAPI.getAll(params)
        setProducts(response.data.products || [])
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [selectedCategory, priceRange, searchParams])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12">Explore Products</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <button 
              className="lg:hidden mb-4 flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg w-full"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <FiFilter /> Filters
            </button>

            <motion.div 
              className={`${filterOpen ? 'block' : 'hidden'} lg:block space-y-6`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Category Filter */}
              <div className="card">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  Category <FiChevronDown />
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={selectedCategory === cat}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="card">
                <h3 className="font-bold text-lg mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Min: {formatPrice(priceRange.min)}</label>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Max: {formatPrice(priceRange.max)}</label>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length > 0 ? (
                  products.map((product) => (
                    <motion.div
                      key={product._id}
                      whileHover={{ scale: 1.05 }}
                      className="card cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => navigate(`/products/${product.slug}`)}
                    >
                      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        {product.thumbnail ? (
                          <img 
                            src={product.thumbnail} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-gray-400">No Image</div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-bold text-lg line-clamp-2">{product.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-primary font-bold text-lg">{formatPrice(product.price)}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm font-semibold">{product.rating || 0}/5</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 col-span-3 py-12">No products found</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
