import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

const API = import.meta.env.VITE_API_URL

function Checkout() {

  const navigate = useNavigate()
  const { cartItems, cartSubtotal, shipping, clearCart } = useCart()
  const { user } = useAuth()

  const [loading, setLoading] = useState(false)

  if (!user) {
    navigate("/login")
  }

  const placeOrderHandler = async () => {

    try {
      setLoading(true)

      const tax = cartSubtotal * 0.05
      const total = cartSubtotal + shipping + tax

      await axios.post(
        `${API}/api/orders`,
        {
          orderItems: cartItems.map(item => ({
            product: item._id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity
          })),
          shippingAddress: {
            fullName: user.name,
            address: "Default Address",
            city: "City",
            postalCode: "00000",
            country: "Country"
          },
          paymentMethod: "COD",
          itemsPrice: cartSubtotal,
          taxPrice: tax,
          shippingPrice: shipping,
          totalPrice: total
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )

      clearCart()
      navigate("/my-orders")

    } catch (error) {
      alert("Order failed")
    }

    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      <h1 className="text-3xl font-playfair font-semibold mb-8">
        Confirm Order
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-sm">

        <h3 className="font-semibold mb-4">
          Order Summary
        </h3>

        {cartItems.map(item => (
          <div key={item._id} className="flex justify-between mb-2 text-sm">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <hr className="my-4" />

        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>
            ${(cartSubtotal + shipping + (cartSubtotal * 0.05)).toFixed(2)}
          </span>
        </div>

        <button
          onClick={placeOrderHandler}
          disabled={loading}
          className="w-full mt-6 bg-black text-white py-3 rounded-md hover:bg-gray-800"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

      </div>

    </div>
  )
}

export default Checkout