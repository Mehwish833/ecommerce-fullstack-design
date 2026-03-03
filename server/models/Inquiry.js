const mongoose = require("mongoose")

const inquirySchema = new mongoose.Schema(
  {
    style: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      default: "Pcs",
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Inquiry", inquirySchema)