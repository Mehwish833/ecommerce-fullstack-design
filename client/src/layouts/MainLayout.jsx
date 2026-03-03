import Header from "../components/Header"
import Navbar from "../components/Navbar"
import NewsletterSection from "../components/NewsletterSection"
import Footer from "../components/Footer"

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <Navbar />

      {children}

      <NewsletterSection />
      <Footer />
    </>
  )
}

export default MainLayout
