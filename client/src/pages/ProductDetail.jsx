import { useParams } from "react-router-dom"
import { FaStar, FaHeart, FaMinus, FaPlus } from "react-icons/fa"
import { useState, useEffect } from "react"
import axios from "axios"
import { useCart } from "../context/CartContext"

const API = import.meta.env.VITE_API_URL

function ProductDetail() {

  const { id } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")

  useEffect(() => {

    window.scrollTo(0, 0)

    const fetchProduct = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(
          `${API}/api/products/${id}`
        )
        setProduct(data)
        setError(null)
        setQuantity(1)
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()

  }, [id])

  if (loading) {
    return <div className="text-center py-20">Loading...</div>
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        {error}
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold">Product not found</h2>
      </div>
    )
  }

  const discount = product.oldPrice
    ? Math.round(
        ((product.oldPrice - product.price) /
          product.oldPrice) * 100
      )
    : null

  const handleAddToCart = () => {
    if (product.stock === 0) return

    addToCart({
      ...product,
      quantity
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

        <div>
          <div className="relative bg-gray-100 rounded-xl overflow-hidden">

            {discount && (
              <div className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-md">
                -{discount}%
              </div>
            )}

            {/* ✅ FIXED IMAGE URL */}
            <img
              src={`${API}${product.image}`}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>

        <div>

          <p className={`text-sm mb-2 ${
            product.stock > 0
              ? "text-green-600"
              : "text-red-500"
          }`}>
            {product.stock > 0
              ? "In Stock"
              : "Out of Stock"}
          </p>

          <h1 className="text-3xl font-playfair font-semibold">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mt-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < 4 ? "" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-gray-500 text-sm">
              (0 reviews)
            </span>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <span className="text-3xl font-semibold text-black">
              ${product.price}
            </span>

            {product.oldPrice && (
              <span className="text-gray-400 line-through text-lg">
                ${product.oldPrice}
              </span>
            )}
          </div>

          <p className="mt-6 text-gray-600 leading-relaxed font-poppins">
            {product.description || "No description available."}
          </p>

          {product.stock > 0 && (
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() =>
                    quantity > 1 &&
                    setQuantity(quantity - 1)
                  }
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  <FaMinus size={12} />
                </button>

                <span className="px-4">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    quantity < product.stock &&
                    setQuantity(quantity + 1)
                  }
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`px-10 py-3 rounded-md text-white transition ${
                product.stock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {product.stock > 0
                ? "Add to Cart"
                : "Out of Stock"}
            </button>

            <button className="border px-6 py-3 rounded-md hover:bg-gray-100">
              <FaHeart />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductDetail