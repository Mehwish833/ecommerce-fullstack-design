import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/AuthContext"

const API = import.meta.env.VITE_API_URL

function Login() {

  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { data } = await axios.post(
        `${API}/api/auth/login`,
        { email, password }
      )

      login(data)
      navigate("/")

    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      )
    }

    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">

      <h1 className="text-3xl font-playfair font-semibold mb-8 text-center">
        Login
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
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-3 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-4 py-3 rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  )
}

export default Login