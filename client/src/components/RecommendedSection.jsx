import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const API = import.meta.env.VITE_API_URL

function RecommendedSection() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data } = await axios.get(
          `${API}/api/products/featured`
        )
        setProducts(data)
      } catch (err) {
        console.error("Error fetching featured products:", err)
        setError("Failed to load recommended products")
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-12">
        Loading recommended items...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        {error}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        No recommended products available.
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-16">

      <h2 className="font-playfair text-2xl lg:text-3xl font-semibold mb-8">
        Recommended Items
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">

        {products.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="bg-white border rounded-md p-4 hover:shadow-lg transition cursor-pointer block"
          >
            <img
              src={`${API}${product.image}`}
              alt={product.name}
              className="h-40 w-full object-contain"
            />

            <h3 className="mt-4 font-semibold text-gray-800">
              ${product.price}
            </h3>

            <p className="text-sm text-gray-500 mt-1 font-poppins">
              {product.name}
            </p>
          </Link>
        ))}

      </div>

    </div>
  )
}

export default RecommendedSection