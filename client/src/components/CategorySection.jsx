import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

function CategorySection() {

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products")

        const products = res.data

        // 🔹 Group products by category
        const grouped = {}

        products.forEach((product) => {
          if (!grouped[product.category]) {
            grouped[product.category] = []
          }
          grouped[product.category].push(product)
        })

        // 🔹 Convert into category cards
        const categoryArray = Object.keys(grouped).map((catName) => {

          const categoryProducts = grouped[catName]

          const lowestPrice = Math.min(
            ...categoryProducts.map((p) => p.price)
          )

          return {
            name: catName,
            image: categoryProducts[0].image,
            price: `From $${lowestPrice}`
          }
        })

        setCategories(categoryArray)

      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()

  }, [])

  if (loading) return null

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-12">

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

        {/* LEFT PROMO BANNER */}
        <div className="relative rounded-md overflow-hidden">

          <img
            src="http://localhost:5000/uploads/category-banner.jpg"
            alt="Abaya Banner"
            className="w-full h-[250px] lg:h-full object-cover"
          />

          <div className="absolute top-6 left-6">
            <h2 className="font-playfair text-xl lg:text-2xl font-semibold text-black">
              Discover Elegant
              <br />
              Abayas
            </h2>

            <Link
              to="/products"
              className="mt-4 inline-block bg-white px-4 py-2 text-sm font-inter rounded shadow"
            >
              Explore Now
            </Link>
          </div>

        </div>

        {/* CATEGORY GRID */}
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

          {categories.map((cat, index) => (
            <Link
              to={`/products?category=${cat.name}`}
              key={index}
              className="bg-white border rounded-md p-4 text-center hover:shadow-md transition"
            >

              <img
                src={`http://localhost:5000${cat.image}`}
                alt={cat.name}
                className="h-24 mx-auto object-contain"
              />

              <h3 className="mt-3 text-sm font-poppins">
                {cat.name}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                {cat.price}
              </p>

            </Link>
          ))}

        </div>

      </div>

    </div>
  )
}

export default CategorySection