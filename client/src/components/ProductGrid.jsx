import { useState, useEffect } from "react"
import { FaThLarge, FaList } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import ProductCard from "./ProductCard"
import axios from "axios"

function ProductGrid() {

  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const category = queryParams.get("category") || ""
  const search = queryParams.get("search") || ""

  // ================= STATES =================
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [view, setView] = useState("grid")
  const [sortOption, setSortOption] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const productsPerPage = 8

  // ================= FETCH PRODUCTS =================
  useEffect(() => {

    const fetchProducts = async () => {
      setLoading(true)

      try {
        const params = new URLSearchParams()

        if (category) params.append("category", category)
        if (search) params.append("search", search)
        if (sortOption) params.append("sort", sortOption)

        const response = await axios.get(
          `http://localhost:5000/api/products?${params.toString()}`
        )

        setProducts(response.data)
        setError(null)

      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
    setCurrentPage(1)

  }, [category, search, sortOption])

  // ================= PAGINATION =================
  const totalPages = Math.ceil(products.length / productsPerPage)

  const displayedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  // ================= LOADING =================
  if (loading) {
    return (
      <p className="text-center py-20 text-gray-500">
        Loading products...
      </p>
    )
  }

  if (error) {
    return (
      <p className="text-center py-20 text-red-500">
        {error}
      </p>
    )
  }

  return (
    <div>

      {/* ================= TOP BAR ================= */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-6">

        <div>
          <h2 className="font-playfair text-2xl font-semibold capitalize">
            {category || "All Products"}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {products.length} Products found
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded-md text-sm px-4 py-2"
          >
            <option value="">Sort by Default</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>

          <div className="flex border rounded-md overflow-hidden">
            <button
              onClick={() => setView("grid")}
              className={`px-3 py-2 ${
                view === "grid" ? "bg-black text-white" : ""
              }`}
            >
              <FaThLarge size={14} />
            </button>

            <button
              onClick={() => setView("list")}
              className={`px-3 py-2 ${
                view === "list" ? "bg-black text-white" : ""
              }`}
            >
              <FaList size={14} />
            </button>
          </div>

        </div>
      </div>

      {/* ================= PRODUCTS ================= */}
      {displayedProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No products found.
        </div>
      ) : view === "grid" ? (

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>

      ) : (

        <div className="space-y-6">
          {displayedProducts.map((product) => (
            <Link key={product._id} to={`/products/${product._id}`}>
              <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition">

                <div className="w-full md:w-1/3 aspect-square bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {product.name}
                  </h3>

                  <div className="mt-3 text-lg font-semibold">
                    ${product.price}
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

      )}

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 text-sm rounded-md ${
                currentPage === index + 1
                  ? "bg-black text-white"
                  : "bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

    </div>
  )
}

export default ProductGrid