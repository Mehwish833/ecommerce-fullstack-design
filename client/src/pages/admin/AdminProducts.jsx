import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

const API = import.meta.env.VITE_API_URL

function AdminProducts() {

  const { user } = useAuth()
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/products`
      )

      setProducts(data)
      setLoading(false)

    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return

    try {
      await axios.delete(
        `${API}/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )

      fetchProducts()

    } catch (error) {
      console.error(error)
    }
  }

  if (loading) return <p className="text-center py-20">Loading...</p>

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">
          Manage Products
        </h1>

        <button
          onClick={() => navigate("/admin/products/new")}
          className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition"
        >
          + Add Product
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map(product => (
              <tr key={product._id} className="border-t">

                <td className="p-4">{product.name}</td>
                <td className="p-4">${product.price}</td>
                <td className="p-4">{product.stock}</td>

                <td className="p-4 space-x-4">

                  <button
                    onClick={() => navigate(`/admin/products/${product._id}/edit`)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default AdminProducts