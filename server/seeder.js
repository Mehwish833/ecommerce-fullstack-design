const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Product = require("./models/Product")

dotenv.config()

mongoose.connect(process.env.MONGO_URI)

const products = [

  // ================= LUXURY =================
  {
    name: "Luxury Black Abaya",
    price: 120,

    image: "/uploads/p1.webp",
    category: "Luxury",
    stock: 15,
    isFeatured: true,
    
  },
  {
    name: "Premium Silk Abaya",
    price: 180,
   
    image: "/uploads/p2.webp",
    category: "Luxury",
    stock: 10,
    isFeatured: true,
    
  },
  {
    name: "Gold Thread Abaya",
    price: 200,
   
    image: "/uploads/p3.jpg",
    category: "Luxury",
    stock: 8,
    isFeatured: false,
    
  },
  {
    name: "Dubai Royal Abaya",
    price: 170,
    
    image: "/uploads/p4.webp",
    category: "Luxury",
    stock: 12,
    isFeatured: true,
    
  },
  {
    name: "Elegant Brown Luxury Abaya",
    price: 150,
   
    image: "/uploads/p5.webp",
    category: "Luxury",
    stock: 14,
    isFeatured: false,
   
  },

  // ================= CASUAL =================
  {
    name: "Classic Daily Abaya 1",
    price: 90,
   
    image: "/uploads/abaya1.jpg",
    category: "Casual",
    stock: 25,
    isFeatured: false,
    
  },
  {
    name: "Classic Daily Abaya 2",
    price: 95,
   
    image: "/uploads/abaya2.jpg",
    category: "Casual",
    stock: 30,
    isFeatured: true,
    
  },
  {
    name: "Classic Daily Abaya 3",
    price: 88,
    
    image: "/uploads/abaya3.jpg",
    category: "Casual",
    stock: 28,
    isFeatured: false,
    
  },
  {
    name: "Classic Daily Abaya 4",
    price: 92,
   
    image: "/uploads/abaya4.jpg",
    category: "Casual",
    stock: 20,
    isFeatured: false,
    
  },
  {
    name: "Classic Daily Abaya 5",
    price: 89,
   
    image: "/uploads/abaya5.jpg",
    category: "Casual",
    stock: 22,
    isFeatured: false,
   
  },

  // ================= MODERN =================
  {
    name: "Modern Belted Abaya",
    price: 130,
    
    image: "/uploads/abaya6.webp",
    category: "Modern",
    stock: 15,
    isFeatured: true,
    
  },
  {
    name: "Modern Open Front Abaya",
    price: 135,
    
    image: "/uploads/abaya7.jpg",
    category: "Modern",
    stock: 12,
    isFeatured: false,
   
  },
  {
    name: "Minimal Style Abaya",
    price: 125,
    
    image: "/uploads/abaya8.jpg",
    category: "Modern",
    stock: 18,
    isFeatured: false,
    
  },
  {
    name: "Layered Modern Abaya",
    price: 140,
    
    image: "/uploads/abaya9.jpg",
    category: "Modern",
    stock: 10,
    isFeatured: true,
   
  },
  {
    name: "Contemporary Flow Abaya",
    price: 145,
   
    image: "/uploads/abaya10.jpg",
    category: "Modern",
    stock: 9,
    isFeatured: false,
    
  },

  // ================= BRIDAL =================
  {
    name: "Bridal White Abaya",
    price: 250,
    
    image: "/uploads/abaya11.jpg",
    category: "Bridal",
    stock: 5,
    isFeatured: true,
   
  },
  {
    name: "Luxury Wedding Abaya",
    price: 270,
    
    image: "/uploads/abaya12.jpg",
    category: "Bridal",
    stock: 4,
    isFeatured: false,
   
  },
  {
    name: "Lace Bridal Abaya",
    price: 260,
    
    image: "/uploads/abaya13.jpg",
    category: "Bridal",
    stock: 6,
    isFeatured: false,
    
  },

  // ================= SILK =================
  {
    name: "Silk Evening Abaya",
    price: 210,
    
    image: "/uploads/abaya14.jpg",
    category: "Silk",
    stock: 7,
    isFeatured: false,
    
  },
  {
    name: "Premium Satin Abaya",
    price: 200,
   
    image: "/uploads/abaya15.jpg",
    category: "Silk",
    stock: 8,
    isFeatured: true,
    
  },

  // ================= CATEGORY PRODUCTS =================
  {
    name: "Category Collection 1",
    price: 150,
    
    image: "/uploads/cat1.jpg",
    category: "Special",
    stock: 12,
    isFeatured: false,
    
  },
  {
    name: "Category Collection 2",
    price: 155,
   
    image: "/uploads/cat2.jpg",
    category: "Special",
    stock: 10,
    isFeatured: false,
   
  },
  {
    name: "Category Collection 3",
    price: 160,
   
    image: "/uploads/cat3.jpg",
    category: "Special",
    stock: 8,
    isFeatured: false,
    
  },
  {
    name: "Category Collection 4",
    price: 165,
    
    image: "/uploads/cat4.webp",
    category: "Special",
    stock: 7,
    isFeatured: false,
    
  },
  {
    name: "Category Collection 5",
    price: 170,
    
    image: "/uploads/cat5.jpg",
    category: "Special",
    stock: 6,
    isFeatured: false,
    
  },

  // ================= DEALS =================
  {
    name: "Limited Deal Abaya 1",
    price: 140,
    oldPrice: 200,
    image: "/uploads/deal1.jpg",
    category: "Deals",
    stock: 6,
    isFeatured: false,
    isOffer: true
  },
  {
    name: "Limited Deal Abaya 2",
    price: 135,
    oldPrice: 195,
    image: "/uploads/deal2.jpg",
    category: "Deals",
    stock: 7,
    isFeatured: false,
    isOffer: true
  },
  {
    name: "Limited Deal Abaya 3",
    price: 145,
    oldPrice: 205,
    image: "/uploads/deal3.webp",
    category: "Deals",
    stock: 5,
    isFeatured: false,
    isOffer: true
  },
  {
    name: "Limited Deal Abaya 4",
    price: 150,
    oldPrice: 210,
    image: "/uploads/deal4.jpg",
    category: "Deals",
    stock: 4,
    isFeatured: false,
    isOffer: true
  },
  {
    name: "Limited Deal Abaya 5",
    price: 130,
    oldPrice: 185,
    image: "/uploads/deal5.jpg",
    category: "Deals",
    stock: 9,
    isFeatured: false,
    isOffer: true
  }

]

// ================= INSERT =================
const importData = async () => {
  try {
    await Product.deleteMany()
    await Product.insertMany(products)
    console.log("60 Products inserted successfully ✅")
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

importData()