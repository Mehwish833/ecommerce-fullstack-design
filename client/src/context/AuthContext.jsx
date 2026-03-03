import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)

  // Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Login function
  const login = (userData) => {
    localStorage.setItem("userInfo", JSON.stringify(userData))
    setUser(userData)
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("userInfo")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook
export function useAuth() {
  return useContext(AuthContext)
}