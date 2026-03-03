import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"

const API = import.meta.env.VITE_API_URL

function AdminOrders() {

  const { user } = useAuth()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (user?.token) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/orders`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )
      setOrders(data)
    } catch (error) {
      console.error(error)
    }
  }

  const markAsDelivered = async (id) => {
    try {
      await axios.put(
        `${API}/api/orders/${id}/deliver`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )

      fetchOrders()

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">

      <h1 className="text-3xl font-semibold mb-8">
        Manage Orders
      </h1>

      {orders.length === 0 && (
        <p>No orders found.</p>
      )}

      {orders.map(order => (
        <div
          key={order._id}
          className="bg-white shadow-md rounded-lg p-6 mb-6 border"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-semibold">{order._id}</p>
            </div>

            <span
              className={`px-3 py-1 text-xs rounded-full ${
                order.isDelivered
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {order.isDelivered ? "Delivered" : "Pending"}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Customer:</strong> {order.user?.name}</p>
              <p><strong>Email:</strong> {order.user?.email}</p>
            </div>

            <div>
              <p><strong>Total:</strong> ${order.totalPrice}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {!order.isDelivered && (
            <button
              onClick={() => markAsDelivered(order._id)}
              className="mt-5 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
            >
              Mark as Delivered
            </button>
          )}

        </div>
      ))}

    </div>
  )
}

export default AdminOrders