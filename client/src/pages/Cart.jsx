import { useCart } from "../context/CartContext"
import { Link, useNavigate } from "react-router-dom"
import { FaTrash } from "react-icons/fa"
import { useState } from "react"

function Cart() {

  const navigate = useNavigate()

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    shipping
  } = useCart()

  const [coupon, setCoupon] = useState("")
  const [discount, setDiscount] = useState(0)

  const applyCoupon = () => {
    if (coupon.toLowerCase() === "modest10") {
      setDiscount(cartSubtotal * 0.1)
    } else {
      setDiscount(0)
    }
  }

  const tax = (cartSubtotal - discount) * 0.05
  const finalTotal = cartSubtotal - discount + tax + shipping

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-playfair font-semibold mb-10">
        My Cart ({cartItems.length})
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-6">
            Your cart is empty.
          </p>
          <Link
            to="/products"
            className="bg-black text-white px-6 py-3 rounded-md"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row gap-6"
              >

                <img
                  src={`http://localhost:5000${item.image}`}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-lg"
                />

                <div className="flex-1">

                  <h3 className="font-semibold text-lg font-playfair">
                    {item.name}
                  </h3>

                  <div className="flex items-center gap-4 mt-4">

                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item._id, Number(e.target.value))
                      }
                      className="border px-3 py-2 rounded-md"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i} value={i + 1}>
                          Qty: {i + 1}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 text-sm flex items-center gap-1"
                    >
                      <FaTrash size={14} /> Remove
                    </button>

                  </div>

                </div>

                <div className="font-semibold text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

              </div>
            ))}

            <Link
              to="/products"
              className="inline-block mt-4 text-sm text-gray-600 underline"
            >
              ← Back to shop
            </Link>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            {/* Coupon */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-4">Have a coupon?</h3>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 border rounded-md px-3 py-2"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-black text-white px-5 rounded-md"
                >
                  Apply
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Try: <span className="font-medium">modest10</span>
              </p>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-xl shadow-sm">

              <h3 className="font-semibold mb-6 text-lg">
                Order Summary
              </h3>

              <div className="flex justify-between mb-3 text-sm">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-3 text-sm">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-3 text-sm text-red-500">
                <span>Discount</span>
                <span>- ${discount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-3 text-sm text-green-600">
                <span>Tax (5%)</span>
                <span>+ ${tax.toFixed(2)}</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>

             <button
  onClick={() => navigate("/checkout")}
  className="w-full mt-6 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
>
  Checkout
</button>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}

export default Cart