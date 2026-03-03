import ProductSidebar from "../components/ProductSidebar"
import ProductGrid from "../components/ProductGrid"

function Products() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">

      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 font-poppins mb-6">
          Home &gt; Abayas &gt; Luxury Collection
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-1">
            <ProductSidebar />
          </div>

          {/* RIGHT PRODUCTS SECTION */}
          <div className="lg:col-span-3">
            <ProductGrid />
          </div>

        </div>

      </div>

    </div>
  )
}

export default Products
