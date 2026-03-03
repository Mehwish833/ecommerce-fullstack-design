import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const API = import.meta.env.VITE_API_URL

function DealsSection() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00"
  })

  // ================= FETCH OFFERS =================
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get(`${API}/api/products/offers`)
        setProducts(res.data)
      } catch (err) {
        console.error("Error fetching offers:", err)
        setError("Failed to load offers")
      } finally {
        setLoading(false)
      }
    }

    fetchOffers()
  }, [])

  // ================= DAILY RESET TIMER =================
  useEffect(() => {

    const updateTimer = () => {
      const now = new Date()

      // Set to midnight today (11:59:59 PM)
      const midnight = new Date()
      midnight.setHours(23, 59, 59, 999)

      const difference = midnight - now

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60))
        const minutes = Math.floor((difference / (1000 * 60)) % 60)
        const seconds = Math.floor((difference / 1000) % 60)

        setTimeLeft({
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0")
        })
      } else {
        // When midnight hits → reset automatically
        setTimeLeft({
          hours: "00",
          minutes: "00",
          seconds: "00"
        })
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)

  }, [])

  // 🔹 Loading State
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-10">
        <p className="text-center text-gray-500">Loading deals...</p>
      </div>
    )
  }

  // 🔹 Error State
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-10">
        <p className="text-center text-red-500">{error}</p>
      </div>
    )
  }

  // 🔹 If No Offers Found
  if (products.length === 0) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-10">
      <div className="bg-white border rounded-md">

        <div className="grid grid-cols-1 lg:grid-cols-6">

          {/* LEFT TIMER SECTION */}
          <div className="p-6 border-b lg:border-b-0 lg:border-r">
            <h2 className="font-playfair text-xl font-semibold">
              Deals & Offers
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Daily Sale Ends In
            </p>

            <div className="flex gap-2 mt-4">
              {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((time, index) => (
                <div
                  key={index}
                  className="bg-gray-700 text-white text-xs font-semibold px-3 py-2 rounded text-center"
                >
                  {time}
                </div>
              ))}
            </div>
          </div>

          {/* PRODUCT CARDS */}
          <div className="lg:col-span-5 flex overflow-x-auto lg:overflow-hidden">

            {products.map((product) => {

              const discount = product.oldPrice
                ? Math.round(
                    ((product.oldPrice - product.price) /
                      product.oldPrice) * 100
                  )
                : null

              return (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="min-w-[180px] lg:min-w-0 flex-1 border-r last:border-r-0 p-4 text-center hover:bg-gray-50 transition"
                >

                  <img
                    src={`${API}${product.image}`}
                    alt={product.name}
                    className="h-28 mx-auto object-contain"
                  />

                  <h3 className="mt-3 text-sm font-poppins">
                    {product.name}
                  </h3>

                  {discount && (
                    <span className="mt-2 inline-block bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
                      -{discount}%
                    </span>
                  )}

                </Link>
              )
            })}

          </div>

        </div>

      </div>
    </div>
  )
}

export default DealsSection