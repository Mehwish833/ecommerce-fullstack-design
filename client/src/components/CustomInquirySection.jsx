import bgImage from "../assets/images/cta-bg.jpg"
import { useState } from "react"
import axios from "axios"

const API = import.meta.env.VITE_API_URL

function CustomInquirySection() {

  const [formData, setFormData] = useState({
    style: "",
    details: "",
    quantity: "",
    unit: "Pcs",
    email: ""
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async () => {

    if (!formData.style || !formData.details || !formData.quantity) {
      setError("Please fill all required fields")
      return
    }

    try {
      setLoading(true)
      setError("")
      setSuccess("")

      const { data } = await axios.post(
        `${API}/api/inquiries`,
        formData
      )

      setSuccess(data.message)

      // Clear form
      setFormData({
        style: "",
        details: "",
        quantity: "",
        unit: "Pcs",
        email: ""
      })

    } catch (err) {
      setError("Failed to submit inquiry")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-16">

      <div className="relative min-h-[400px]">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-teal-500/80"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* LEFT SIDE */}
          <div className="text-white">
            <h2 className="font-playfair text-2xl lg:text-4xl font-bold leading-snug">
              An easy way to request
              <br />
              custom abayas
            </h2>

            <p className="mt-4 text-sm lg:text-base text-white/90 font-poppins max-w-md">
              Tell us your preferred style, fabric, and design details.
              Our team will craft a personalized abaya just for you.
            </p>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="bg-white rounded-md shadow-xl p-6">

            <h3 className="text-lg font-semibold font-playfair mb-4">
              Request Custom Design
            </h3>

            {success && (
              <div className="bg-green-100 text-green-600 text-sm p-2 rounded mb-3">
                {success}
              </div>
            )}

            {error && (
              <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-3">
                {error}
              </div>
            )}

            <input
              type="text"
              name="style"
              value={formData.style}
              onChange={handleChange}
              placeholder="What style are you looking for?"
              className="w-full border rounded-md px-3 py-2 text-sm mb-4 outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Add more details (fabric, color, size, embroidery etc.)"
              className="w-full border rounded-md px-3 py-2 text-sm mb-4 outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
            ></textarea>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">

              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="w-full sm:w-1/2 border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              />

              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full sm:w-1/2 border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Pcs">Pcs</option>
                <option value="Set">Set</option>
                <option value="Bulk">Bulk</option>
              </select>

            </div>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email (optional)"
              className="w-full border rounded-md px-3 py-2 text-sm mb-4 outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full px-6 py-2 rounded-md text-sm font-inter transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? "Sending..." : "Send Inquiry"}
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default CustomInquirySection