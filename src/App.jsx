import { useState, useEffect } from 'react'
import Preloader from './components/Preloader'
import IntegratedPage from './components/IntegratedPage'
import PremiumNavbar from './components/PremiumNavbar'
import Footer from './components/Footer'
import useScrollReveal from './hooks/useScrollReveal'
import { scrollToSection } from './utils/scrollToSection'

export default function App() {
  const [loading, setLoading] = useState(true)

  useScrollReveal([loading])

  useEffect(() => {
    if (loading) return

    window.scrollTo({ top: 0, behavior: 'auto' })
    window.history.replaceState(null, '', window.location.pathname)
  }, [loading])

  useEffect(() => {
    const onDocumentClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return

      const sectionId = anchor.getAttribute('href').slice(1)
      if (!sectionId || !document.getElementById(sectionId)) return

      e.preventDefault()
      scrollToSection(sectionId)
    }

    document.addEventListener('click', onDocumentClick)
    return () => document.removeEventListener('click', onDocumentClick)
  }, [])

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div
        className={`app-shell transition-opacity duration-1000 ease-out ${
          loading ? 'pointer-events-none h-screen overflow-hidden opacity-0' : 'opacity-100'
        }`}
      >
        {!loading && (
          <>
            <PremiumNavbar />
            <IntegratedPage />
            <Footer />
          </>
        )}
      </div>
    </>
  )
}
