import Header from "../components/Header"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function SimpleLayout({ children }) {
  return (
    <>
      <Header />
      <Navbar />

      {children}

      <Footer />
    </>
  )
}

export default SimpleLayout
