import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {

  // ================= LOAD FROM LOCAL STORAGE =================
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems")
    return savedCart ? JSON.parse(savedCart) : []
  })

  // ================= SAVE TO LOCAL STORAGE =================
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  // ================= ADD TO CART =================
  const addToCart = (product) => {

    setCartItems(prev => {

      const existingItem = prev.find(item => item._id === product._id)

      if (existingItem) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      }

      return [...prev, { ...product }]
    })
  }

  // ================= REMOVE ITEM =================
  const removeFromCart = (_id) => {
    setCartItems(prev => prev.filter(item => item._id !== _id))
  }

  // ================= UPDATE QUANTITY =================
  const updateQuantity = (_id, qty) => {

    if (qty < 1) return

    setCartItems(prev =>
      prev.map(item =>
        item._id === _id
          ? { ...item, quantity: qty }
          : item
      )
    )
  }

  // ================= CLEAR CART =================
  const clearCart = () => {
    setCartItems([])
  }

  // ================= CALCULATIONS =================
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const shipping = cartSubtotal > 0 ? 10 : 0

  const cartTotal = cartSubtotal + shipping

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        shipping,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}