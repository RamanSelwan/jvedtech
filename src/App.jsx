import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Preloader from './components/Preloader'
import IntegratedPage from './components/IntegratedPage'
import About from './components/About'
import Services from './components/Services'
import Events from './components/Events'
import Careers from './components/Careers'
import Community from './components/Community'
import PremiumNavbar from './components/PremiumNavbar'
import Footer from './components/Footer'
import useScrollReveal from './hooks/useScrollReveal'

function AppContent({ loading }) {
  const location = useLocation()

  useScrollReveal([loading, location.pathname])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div
      className={`app-shell transition-opacity duration-1000 ease-out ${
        loading ? 'pointer-events-none h-screen overflow-hidden opacity-0' : 'opacity-100'
      }`}
    >
      {!loading && (
        <>
          <PremiumNavbar />
          <Routes>
            <Route path="/" element={<IntegratedPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/events" element={<Events />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/community" element={<Community />} />
            <Route path="*" element={<IntegratedPage />} />
          </Routes>
          {location.pathname === '/' && <Footer />}
        </>
      )}
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <BrowserRouter>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <AppContent loading={loading} />
    </BrowserRouter>
  )
}
