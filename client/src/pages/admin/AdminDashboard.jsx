import { useNavigate } from "react-router-dom"

function AdminDashboard() {

  const navigate = useNavigate()

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      <h1 className="text-3xl font-playfair font-semibold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {/* Manage Products */}
        <div
          onClick={() => navigate("/admin/products")}
          className="bg-white p-8 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Manage Products
          </h2>
          <p className="text-sm text-gray-500">
            Add, edit or delete products
          </p>
        </div>

        {/* Manage Orders */}
        <div
          onClick={() => navigate("/admin/orders")}
          className="bg-white p-8 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Manage Orders
          </h2>
          <p className="text-sm text-gray-500">
            View all customer orders
          </p>
        </div>

        {/* Future Analytics */}
        <div className="bg-gray-100 p-8 rounded-xl opacity-70">
          <h2 className="text-xl font-semibold mb-2">
            Analytics (Coming Soon)
          </h2>
          <p className="text-sm text-gray-500">
            Sales overview & reports
          </p>
        </div>

      </div>

    </div>
  )
}

export default AdminDashboard