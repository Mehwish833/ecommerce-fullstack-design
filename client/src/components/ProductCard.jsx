import { Link } from "react-router-dom"
import { FaStar, FaHeart } from "react-icons/fa"

const API = import.meta.env.VITE_API_URL

function ProductCard({
  _id,
  image,
  name,
  price,
  oldPrice,
  rating = 0,
  reviews = 0,
  stock = 0
}) {

  const discount = oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : null

  return (
    <Link to={`/products/${_id}`} className="block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 p-4 cursor-pointer relative group">

        {/* Discount Badge */}
        {discount && stock > 0 && (
          <div className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded-md z-10">
            -{discount}%
          </div>
        )}

        {/* Out of Stock Overlay */}
        {stock === 0 && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-sm font-semibold z-20 rounded-xl">
            Out of Stock
          </div>
        )}

        {/* Wishlist Icon */}
        <div
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition cursor-pointer z-10"
        >
          <FaHeart />
        </div>

        {/* Product Image */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={`${API}${image}`}
            alt={name}
            className={`w-full h-full object-cover transition duration-500 ${
              stock === 0
                ? "grayscale"
                : "group-hover:scale-110"
            }`}
          />
        </div>

        {/* Product Info */}
        <div className="mt-4">

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-black font-semibold text-base">
              ${price}
            </span>

            {oldPrice && (
              <span className="text-gray-400 line-through text-sm">
                ${oldPrice}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2 text-xs">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.round(rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}

            <span className="text-gray-500 ml-1">
              ({reviews})
            </span>
          </div>

          {/* Product Name */}
          <p className="text-sm text-gray-600 mt-2 leading-snug line-clamp-2">
            {name}
          </p>

        </div>

      </div>
    </Link>
  )
}

export default ProductCard