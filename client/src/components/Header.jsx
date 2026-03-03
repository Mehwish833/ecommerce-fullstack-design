import logo from "../assets/images/logo.png"
import { FaUser, FaShoppingCart, FaBoxOpen } from "react-icons/fa"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

function Header() {

  const navigate = useNavigate()
  const { cartCount } = useCart()
  const { user, logout } = useAuth()

  const [searchText, setSearchText] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  // ================= HANDLE SEARCH =================
  const handleSearch = () => {

    const params = new URLSearchParams()

    if (searchText.trim()) {
      params.append("search", searchText.trim())
    }

    if (selectedCategory && selectedCategory !== "All") {
      params.append("category", selectedCategory)
    }

    if ([...params].length === 0) return

    navigate(`/products?${params.toString()}`)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          {/* LOGO */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="MS Modest Logo"
              className="w-13 h-14 object-contain"
            />
            <span className="font-playfair text-xl lg:text-2xl font-bold text-gray-800">
              MS Modest
            </span>
          </div>

          {/* SEARCH */}
          <div className="flex w-full lg:w-1/2 border rounded-md overflow-hidden h-10 lg:h-11">

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="hidden sm:block px-3 bg-gray-100 text-sm border-r outline-none font-poppins"
            >
              <option value="">All</option>
              <option value="Luxury">Luxury</option>
              <option value="Casual">Casual</option>
              <option value="Bridal">Bridal</option>
              <option value="Modern">Modern</option>
              <option value="Embroidered">Embroidered</option>
            </select>

            <input
              type="text"
              placeholder="Search abayas..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full px-3 text-sm outline-none font-poppins"
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 font-inter text-sm hover:bg-blue-700 transition"
            >
              Search
            </button>

          </div>

          {/* ================= RIGHT SIDE ICONS ================= */}
          <div className="flex items-center justify-center lg:justify-end gap-6 text-gray-600">

            {/* ========== PROFILE / LOGIN ========== */}
            {user ? (
              <div className="flex flex-col items-center">
                <span className="text-xs font-medium">
                  Hi, {user.name}
                </span>

                <button
                  onClick={() => {
                    logout()
                    navigate("/")
                  }}
                  className="text-xs text-red-500 hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div
                className="flex flex-col items-center cursor-pointer hover:text-black"
                onClick={() => navigate("/login")}
              >
                <FaUser className="text-lg" />
                <span className="hidden lg:block text-sm font-poppins">
                  Login
                </span>
              </div>
            )}

            {/* ========== ORDERS (Only if logged in) ========== */}
            {user && (
              <div
                className="flex flex-col items-center cursor-pointer hover:text-black"
                onClick={() => navigate("/my-orders")}
              >
                <FaBoxOpen className="text-lg" />
                <span className="hidden lg:block text-sm font-poppins">
                  Orders
                </span>
              </div>
            )}

            {/* ========== ADMIN PANEL (Only if admin) ========== */}
            {user && user.isAdmin && (
              <div
                className="flex flex-col items-center cursor-pointer hover:text-black"
                onClick={() => navigate("/admin")}
              >
                <span className="text-sm font-semibold">
                  Admin
                </span>
              </div>
            )}

            {/* ========== CART ========== */}
            <div
              className="relative flex flex-col items-center cursor-pointer hover:text-black"
              onClick={() => navigate("/cart")}
            >
              <FaShoppingCart className="text-lg" />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}

              <span className="hidden lg:block text-sm font-poppins">
                Cart
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Header