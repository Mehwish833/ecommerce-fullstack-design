const mongoose = require("mongoose")
const dotenv = require("dotenv")
const User = require("./models/User")
const bcrypt = require("bcryptjs")

dotenv.config()

mongoose.connect(process.env.MONGO_URI)

const createAdmin = async () => {
  try {

    const existing = await User.findOne({ email: "superadmin@test.com" })
    if (existing) {
      console.log("Admin already exists ✅")
      process.exit()
    }

    const hashedPassword = await bcrypt.hash("123456", 10)

    await User.create({
      name: "Super Admin",
      email: "superadmin@test.com",
      password: hashedPassword,
      isAdmin: true
    })

    console.log("Admin created ✅")
    process.exit()

  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

createAdmin()