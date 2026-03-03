const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    oldPrice: {
      type: Number
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    category: {
      type: String
    },
    stock: {
      type: Number,
      default: 0
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    isOffer: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Product", productSchema)