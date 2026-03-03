import { useState, useEffect } from "react"
import hero1 from "../assets/images/hero1.png"
import hero2 from "../assets/images/hero2.jpg"
import hero3 from "../assets/images/hero3.webp"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function Hero() {
  const images = [hero1, hero2, hero3]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    let interval

    if (isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
      }, 1500) // fast-modern timing
    }

    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT SIDEBAR */}
        <div className="lg:col-span-3 bg-white rounded-md shadow-sm p-4 font-poppins text-xs lg:text-sm">
          <ul className="space-y-3 text-gray-700">
            <li className="font-semibold bg-gray-100 p-2 rounded">
              Luxury Abayas
            </li>
            <li className="hover:text-black cursor-pointer">Casual Abayas</li>
            <li className="hover:text-black cursor-pointer">Open Abayas</li>
            <li className="hover:text-black cursor-pointer">Black Collection</li>
            <li className="hover:text-black cursor-pointer">Embroidered</li>
            <li className="hover:text-black cursor-pointer">New Arrivals</li>
            <li className="hover:text-black cursor-pointer">More Categories</li>
          </ul>
        </div>

        {/* CENTER BANNER WITH SMOOTH CROSSFADE */}
        <div
          className="lg:col-span-6 relative rounded-md overflow-hidden cursor-pointer h-[250px] sm:h-[300px] lg:h-[400px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            setCurrentIndex(0)
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Abaya Banner"
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
            />
          ))}
        </div>

        
        {/* RIGHT SIDE CARDS */}
        <div className="lg:col-span-3 space-y-4">

          {/* ================= WELCOME CARD ================= */}
          <div className="bg-blue-50 p-4 rounded-md font-poppins text-xs lg:text-sm">

            {user ? (
              <>
                <p className="font-semibold text-sm">
                  Hi, {user.name} 👋
                </p>

                <button
                  onClick={() => navigate("/my-orders")}
                  className="mt-3 w-full bg-blue-600 text-white py-2 rounded font-inter text-sm"
                >
                  View Orders
                </button>

                <button
                  onClick={() => {
                    logout()
                    navigate("/")
                  }}
                  className="mt-2 w-full border py-2 rounded font-inter text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <p className="font-semibold">Hi, welcome!</p>

                <button
                  onClick={() => navigate("/register")}
                  className="mt-3 w-full bg-blue-600 text-white py-2 rounded font-inter text-sm"
                >
                  Join now
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="mt-2 w-full border py-2 rounded font-inter text-sm"
                >
                  Log in
                </button>
              </>
            )}

          </div>

          {/* ================= PROMO CARD ================= */}
          <div className="bg-orange-400 text-white p-4 rounded-md font-poppins text-xs lg:text-sm">
            Get 10% off on your first abaya purchase
          </div>

          {/* ================= CUSTOM INQUIRY CARD ================= */}
          <div
            onClick={() => navigate("/custom-inquiry")}
            className="bg-teal-500 text-white p-4 rounded-md font-poppins text-xs lg:text-sm cursor-pointer hover:opacity-90"
          >
            Send inquiry for custom abayas
          </div>

        </div>

      </div>
    </div>
  )
}

export default Hero
