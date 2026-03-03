import { useState } from "react"
import axios from "axios"

const API = import.meta.env.VITE_API_URL

function NewsletterSection() {

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubscribe = async () => {

    if (!email.trim()) {
      setError("Please enter your email")
      return
    }

    try {
      setLoading(true)
      setError("")
      setMessage("")

      const res = await axios.post(
        `${API}/api/newsletter`,
        { email }
      )

      setMessage(res.data.message)
      setEmail("")

    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-100 mt-20 py-14">

      <div className="max-w-3xl mx-auto px-4 text-center">

        <h2 className="font-playfair text-2xl lg:text-3xl font-semibold">
          Subscribe to our newsletter
        </h2>

        <p className="text-gray-600 text-sm lg:text-base mt-3 font-poppins">
          Get updates about new abaya collections, offers, and exclusive designs.
        </p>

        {/* Input & Button */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-2/3 border rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-sm font-inter transition disabled:opacity-60"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>

        </div>

        {/* Messages */}
        {message && (
          <p className="text-green-600 mt-4 text-sm">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-600 mt-4 text-sm">
            {error}
          </p>
        )}

      </div>

    </div>
  )
}

export default NewsletterSection