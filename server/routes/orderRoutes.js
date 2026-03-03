const express = require("express")
const router = express.Router()
const Order = require("../models/Order")
const { protect, admin } = require("../middleware/authMiddleware")

// ================= CREATE ORDER =================
router.post("/", protect, async (req, res) => {
  try {
    const order = new Order({
      user: req.user._id,
      ...req.body
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


// ================= GET MY ORDERS =================
router.get("/myorders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })

    res.json(orders)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


// ================= ADMIN - GET ALL ORDERS =================
router.get("/", protect, admin, async (req, res) => {
  try {

    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 })

    res.json(orders)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
// ================= ADMIN - MARK AS DELIVERED =================
router.put("/:id/deliver", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router