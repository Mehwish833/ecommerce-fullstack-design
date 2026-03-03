import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"

const API = import.meta.env.VITE_API_URL

function MyOrders() {

  const { user } = useAuth()
  const [orders, setOrders] = useState([])

  useEffect(() => {

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `${API}/api/orders/myorders`,
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

    if (user?.token) fetchOrders()

  }, [user])

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      <h1 className="text-3xl font-playfair font-semibold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="bg-white p-6 rounded-lg mb-6 shadow-sm">

            <div className="flex justify-between mb-4">
              <span className="font-semibold">
                Order ID: {order._id}
              </span>
              <span>
                ${order.totalPrice.toFixed(2)}
              </span>
            </div>

            {order.orderItems.map(item => (
              <div key={item._id} className="text-sm mb-2">
                {item.name} x {item.quantity}
              </div>
            ))}

          </div>
        ))
      )}

    </div>
  )
}

export default MyOrders