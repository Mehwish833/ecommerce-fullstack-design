import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
import { useNavigate, useParams } from "react-router-dom"

const API = import.meta.env.VITE_API_URL

function AdminProductForm() {

  const { user } = useAuth()
  const navigate = useNavigate()
  const { id } = useParams()

  const isEditMode = Boolean(id)

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: ""
  })

  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    if (isEditMode) {
      fetchProduct()
    }
  }, [])

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/products/${id}`
      )

      setFormData({
        name: data.name,
        price: data.price,
        stock: data.stock,
        description: data.description,
        category: data.category
      })

      if (data.image) {
        setPreview(`${API}${data.image}`)
      }

    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImageFile(file)

    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formDataObj = new FormData()

      formDataObj.append("name", formData.name)
      formDataObj.append("price", formData.price)
      formDataObj.append("stock", formData.stock)
      formDataObj.append("description", formData.description)
      formDataObj.append("category", formData.category)

      if (imageFile) {
        formDataObj.append("image", imageFile)
      }

      if (isEditMode) {
        await axios.put(
          `${API}/api/products/${id}`,
          formDataObj,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "multipart/form-data"
            }
          }
        )
      } else {
        await axios.post(
          `${API}/api/products`,
          formDataObj,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "multipart/form-data"
            }
          }
        )
      }

      navigate("/admin/products")

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">

      <h1 className="text-2xl font-semibold mb-6">
        {isEditMode ? "Edit Product" : "Add Product"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="w-full border p-3 rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full border p-3 rounded"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          className="w-full border p-3 rounded"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full border p-3 rounded"
          value={formData.category}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-3 rounded"
          value={formData.description}
          onChange={handleChange}
        />

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded border"
          />
        )}

        <button className="bg-black text-white px-6 py-2 rounded">
          {isEditMode ? "Update Product" : "Save Product"}
        </button>

      </form>

    </div>
  )
}

export default AdminProductForm