import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"

import MainLayout from "./layouts/MainLayout"
import SimpleLayout from "./layouts/SimpleLayout"

import Home from "./pages/home"
import Products from "./pages/Products"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import MyOrders from "./pages/MyOrders"

import ProtectedRoute from "./components/ProtectedRoute"
import ProtectedAdminRoute from "./components/ProtectedAdminRoute"

import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminProducts from "./pages/admin/AdminProducts"
import AdminProductForm from "./pages/admin/AdminProductForm"
import AdminOrders from "./pages/admin/AdminOrders"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/products"
          element={
            <MainLayout>
              <Products />
            </MainLayout>
          }
        />

        <Route
          path="/products/:id"
          element={
            <SimpleLayout>
              <ProductDetail />
            </SimpleLayout>
          }
        />

        <Route
          path="/cart"
          element={
            <SimpleLayout>
              <Cart />
            </SimpleLayout>
          }
        />

        <Route
          path="/checkout"
          element={
            <SimpleLayout>
              <Checkout />
            </SimpleLayout>
          }
        />

        <Route
          path="/login"
          element={
            <SimpleLayout>
              <Login />
            </SimpleLayout>
          }
        />

        <Route
          path="/register"
          element={
            <SimpleLayout>
              <Register />
            </SimpleLayout>
          }
        />

        {/* ================= USER PROTECTED ROUTES ================= */}

        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <SimpleLayout>
                <MyOrders />
              </SimpleLayout>
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ROUTES ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <SimpleLayout>
                <AdminDashboard />
              </SimpleLayout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedAdminRoute>
              <SimpleLayout>
                <AdminProducts />
              </SimpleLayout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/products/new"
          element={
            <ProtectedAdminRoute>
              <SimpleLayout>
                <AdminProductForm />
              </SimpleLayout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/products/:id/edit"
          element={
            <ProtectedAdminRoute>
              <SimpleLayout>
                <AdminProductForm />
              </SimpleLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
        path="/admin/orders"
        element={
          <ProtectedAdminRoute>
            <SimpleLayout>
              <AdminOrders />
            </SimpleLayout>
          </ProtectedAdminRoute>
        }
      />

      </Routes>
      
    </BrowserRouter>
  )
}

export default App