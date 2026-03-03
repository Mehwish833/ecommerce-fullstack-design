import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/AuthContext"

const API = import.meta.env.VITE_API_URL

function Register() {

  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const { data } = await axios.post(
        `${API}/api/auth/register`,
        {
          name: form.name,
          email: form.email,
          password: form.password
        }
      )

      login(data)
      navigate("/")

    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      )
    }

    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">

      <h1 className="text-3xl font-playfair font-semibold mb-8 text-center">
        Create Account
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-sm space-y-5"
      >

        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm mb-1">Full Name</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            required
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

      </form>

    </div>
  )
}

export default Register