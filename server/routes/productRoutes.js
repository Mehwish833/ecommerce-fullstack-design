const express = require("express")
const router = express.Router()
const Product = require("../models/Product")
const { protect, admin } = require("../middleware/authMiddleware")
const upload = require("../middleware/uploadMiddleware")

// ================= FEATURED PRODUCTS =================
router.get("/featured", async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(6)

    res.status(200).json(products)
  } catch (error) {
    console.error("Featured Error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// ================= OFFER PRODUCTS =================
router.get("/offers", async (req, res) => {
  try {
    const products = await Product.find({ isOffer: true })
      .sort({ createdAt: -1 })

    res.status(200).json(products)
  } catch (error) {
    console.error("Offers Error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// ================= ALL PRODUCTS =================
router.get("/", async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sort } = req.query

    let filter = {}

    if (category) filter.category = category

    if (search) {
      filter.name = {
        $regex: search.trim(),
        $options: "i"
      }
    }

    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    let query = Product.find(filter)

    if (sort === "low-high") query = query.sort({ price: 1 })
    else if (sort === "high-low") query = query.sort({ price: -1 })
    else query = query.sort({ createdAt: -1 })

    const products = await query

    res.status(200).json(products)

  } catch (error) {
    console.error("All Products Error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// ================= SINGLE PRODUCT =================
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.status(200).json(product)

  } catch (error) {
    console.error("Single Product Error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// ================= CREATE PRODUCT =================
router.post("/", protect, admin, upload.single("image"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" })
    }

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      category: req.body.category,
      image: `/uploads/${req.file.filename}`,
      isFeatured: req.body.isFeatured || false,
      isOffer: req.body.isOffer || false
    })

    const savedProduct = await product.save()

    res.status(201).json(savedProduct)

  } catch (error) {
    console.error("Create Product Error:", error)
    res.status(400).json({ message: error.message })
  }
})

// ================= UPDATE PRODUCT =================
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.status(200).json(updatedProduct)

  } catch (error) {
    console.error("Update Error:", error)
    res.status(400).json({ message: error.message })
  }
})

// ================= DELETE PRODUCT =================
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.status(200).json({ message: "Product deleted successfully" })

  } catch (error) {
    console.error("Delete Error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router