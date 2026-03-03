import { useState } from "react"
import { FaChevronDown } from "react-icons/fa"
import { useNavigate, useLocation } from "react-router-dom"

function ProductSidebar() {

  const navigate = useNavigate()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)

  const currentCategory = queryParams.get("category") || ""
  const currentMinPrice = queryParams.get("minPrice") || 50
  const currentMaxPrice = queryParams.get("maxPrice") || 500

  const [openSection, setOpenSection] = useState("category")
  const [price, setPrice] = useState(currentMaxPrice)

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section)
  }

  // ================= HANDLE CATEGORY FILTER =================
  const handleCategoryChange = (category) => {

    const params = new URLSearchParams(location.search)

    if (params.get("category") === category) {
      params.delete("category")
    } else {
      params.set("category", category)
    }

    navigate(`?${params.toString()}`)
  }

  // ================= HANDLE PRICE FILTER =================
  const handlePriceChange = (value) => {
    setPrice(value)

    const params = new URLSearchParams(location.search)
    params.set("minPrice", 50)
    params.set("maxPrice", value)

    navigate(`?${params.toString()}`)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-8 text-sm font-poppins">

      {/* ================= CATEGORY ================= */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("category")}
        >
          <h3 className="font-semibold text-gray-800">
            Category
          </h3>
          <FaChevronDown
            className={`transition ${
              openSection === "category" ? "rotate-180" : ""
            }`}
          />
        </div>

        {openSection === "category" && (
          <ul className="mt-4 space-y-3 text-gray-600">
            {[
              "Luxury",
              "Casual",
              "Open",
              "Bridal",
              "Modern",
              "Embroidered"
            ].map((cat) => (
              <li key={cat}>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentCategory === cat}
                    onChange={() =>
                      handleCategoryChange(cat)
                    }
                    className="mr-2"
                  />
                  {cat} Abayas
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ================= PRICE ================= */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("price")}
        >
          <h3 className="font-semibold text-gray-800">
            Price
          </h3>
          <FaChevronDown
            className={`transition ${
              openSection === "price" ? "rotate-180" : ""
            }`}
          />
        </div>

        {openSection === "price" && (
          <div className="mt-4">
            <input
              type="range"
              min="50"
              max="500"
              value={price}
              onChange={(e) =>
                handlePriceChange(e.target.value)
              }
              className="w-full"
            />

            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>$50</span>
              <span>${price}</span>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default ProductSidebar