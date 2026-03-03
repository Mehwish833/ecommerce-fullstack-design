const express = require("express")
const path = require("path")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config({ path: "./server/.env" })

const newsletterRoutes = require("./routes/newsletter")
const productRoutes = require("./routes/productRoutes")
const authRoutes = require("./routes/authRoutes")
const inquiryRoutes = require("./routes/inquiryRoutes")
const orderRoutes = require("./routes/orderRoutes")

const app = express()

// ================= CORS =================
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}))

// ================= MIDDLEWARE =================
app.use(express.json())

// ================= ROUTES =================
app.use("/api/newsletter", newsletterRoutes)
app.use("/api/products", productRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/inquiries", inquiryRoutes)
app.use("/api/orders", orderRoutes)

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// ================= DATABASE CONNECT =================
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected DB Name:", mongoose.connection.name)
    console.log("MongoDB Connected ✅")

    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running 🚀")
    })

  } catch (error) {
    console.error("MongoDB Error:", error)
    process.exit(1)
  }
}

startServer()