import { FaBars, FaChevronDown } from "react-icons/fa"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const goToCategory = (category) => {
    navigate(`/products?category=${category}`)
  }

  return (
    <div className="bg-gray-100 border-b">

      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-11 flex items-center justify-between text-sm font-poppins text-gray-700">

        {/* Mobile Menu Button */}
        <div
          className="lg:hidden flex items-center gap-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
          <span>Menu</span>
        </div>

        {/* Desktop Left Side */}
        <div className="hidden lg:flex items-center gap-6">

          <div
            className="flex items-center gap-2 cursor-pointer hover:text-black"
            onClick={() => navigate("/products")}
          >
            <FaBars className="text-xs" />
            <span>All category</span>
          </div>

          <span
            className="cursor-pointer hover:text-black"
            onClick={() => navigate("/products?sort=newest")}
          >
            Hot offers
          </span>

          <span
            className="cursor-pointer hover:text-black"
            onClick={() => goToCategory("Luxury")}
          >
            Luxury
          </span>

          <span
            className="cursor-pointer hover:text-black"
            onClick={() => goToCategory("Casual")}
          >
            Casual
          </span>

          <span
            className="cursor-pointer hover:text-black"
            onClick={() => goToCategory("Bridal")}
          >
            Bridal
          </span>

          <div className="flex items-center gap-1 cursor-pointer hover:text-black">
            <span>Help</span>
            <FaChevronDown className="text-xs" />
          </div>

        </div>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-6">

          <div className="flex items-center gap-1 cursor-pointer hover:text-black">
            <span>English, USD</span>
            <FaChevronDown className="text-xs" />
          </div>

          <div className="flex items-center gap-1 cursor-pointer hover:text-black">
            <span>Ship to</span>
            <span>🇩🇪</span>
            <FaChevronDown className="text-xs" />
          </div>

        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t px-4 py-3 space-y-3 text-sm font-poppins">

          <div
            className="cursor-pointer"
            onClick={() => navigate("/products")}
          >
            All category
          </div>

          <div
            className="cursor-pointer"
            onClick={() => navigate("/products?sort=newest")}
          >
            Hot offers
          </div>

          <div
            className="cursor-pointer"
            onClick={() => goToCategory("Luxury")}
          >
            Luxury
          </div>

          <div
            className="cursor-pointer"
            onClick={() => goToCategory("Casual")}
          >
            Casual
          </div>

          <div
            className="cursor-pointer"
            onClick={() => goToCategory("Bridal")}
          >
            Bridal
          </div>

          <div>Help</div>

        </div>
      )}

    </div>
  )
}

export default Navbar