import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa"

function Footer() {
  return (
    <div className="bg-gray-100 mt-20 pt-12">

      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* TOP FOOTER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 pb-10 border-b">

          {/* BRAND SECTION */}
          <div className="lg:col-span-2">
            <h2 className="font-playfair text-xl font-bold text-gray-800">
              MS Modest
            </h2>

            <p className="text-gray-600 text-sm mt-4 font-poppins max-w-xs">
              Elegant and modest abayas crafted with luxury fabrics and timeless designs.
            </p>

            <div className="flex gap-3 mt-4 text-gray-600">
              <FaFacebookF className="cursor-pointer hover:text-black" />
              <FaTwitter className="cursor-pointer hover:text-black" />
              <FaLinkedinIn className="cursor-pointer hover:text-black" />
              <FaInstagram className="cursor-pointer hover:text-black" />
            </div>
          </div>

          {/* ABOUT */}
          <div>
            <h3 className="font-semibold mb-3">About</h3>
            <ul className="text-sm text-gray-600 space-y-2 font-poppins">
              <li>About Us</li>
              <li>Our Story</li>
              <li>Collections</li>
              <li>Blogs</li>
            </ul>
          </div>

          {/* PARTNERSHIP */}
          <div>
            <h3 className="font-semibold mb-3">Partnership</h3>
            <ul className="text-sm text-gray-600 space-y-2 font-poppins">
              <li>Become Partner</li>
              <li>Wholesale</li>
              <li>Affiliate</li>
              <li>Suppliers</li>
            </ul>
          </div>

          {/* INFORMATION */}
          <div>
            <h3 className="font-semibold mb-3">Information</h3>
            <ul className="text-sm text-gray-600 space-y-2 font-poppins">
              <li>Help Center</li>
              <li>Returns</li>
              <li>Shipping</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* FOR USERS */}
          <div>
            <h3 className="font-semibold mb-3">For Users</h3>
            <ul className="text-sm text-gray-600 space-y-2 font-poppins">
              <li>Login</li>
              <li>Register</li>
              <li>Settings</li>
              <li>My Orders</li>
            </ul>
          </div>

        </div>

        {/* BOTTOM FOOTER */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 py-6 gap-4">

          <p>© 2026 MS Modest. All rights reserved.</p>

          <div className="flex items-center gap-2 cursor-pointer">
            <span>English</span>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Footer
