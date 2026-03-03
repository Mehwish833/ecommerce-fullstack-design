const express = require("express")
const router = express.Router()
const Inquiry = require("../models/Inquiry")

// CREATE INQUIRY
router.post("/", async (req, res) => {
  try {
    const { style, details, quantity, unit, email } = req.body

    const inquiry = new Inquiry({
      style,
      details,
      quantity,
      unit,
      email
    })

    const savedInquiry = await inquiry.save()

    res.status(201).json({
      message: "Inquiry submitted successfully",
      inquiry: savedInquiry
    })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// GET ALL INQUIRIES (for admin later)
router.get("/", async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 })
    res.json(inquiries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router