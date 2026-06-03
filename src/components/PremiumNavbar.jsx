import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Events', path: '/events' },
  { label: 'Careers', path: '/careers' },
  { label: 'Community', path: '/community' },
]

export default function PremiumNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const scrollHandler = () => setIsScrolled(window.scrollY > 50)
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  useEffect(() => {
    const pathToSection = {
      '/': 'home',
      '/about': 'about',
      '/services': 'services',
      '/events': 'events',
      '/careers': 'careers',
      '/community': 'community',
    }
    setActiveSection(pathToSection[location.pathname] || 'home')
  }, [location.pathname])

  const handleNavClick = (e, path) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    navigate(path)
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backdropFilter: isScrolled ? 'blur(12px)' : 'blur(4px)',
          background: isScrolled
            ? 'rgba(15, 35, 25, 0.85)'
            : 'rgba(15, 35, 25, 0.4)',
          borderBottom: isScrolled ? '1px solid rgba(78, 205, 196, 0.2)' : 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: isScrolled ? '12px 32px' : '20px 32px',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/')}
            style={{
              fontSize: '18px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #4ecdc4, #88d8b0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textDecoration: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <span
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #4ecdc4, #88d8b0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              JV
            </span>
            JVEDTECH
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === (link.path === '/' ? 'home' : link.path.replace('/', ''))
              return (
                <a
                  key={link.label}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  style={{
                    color: isActive ? '#4ecdc4' : 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: 500,
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: isActive ? 'rgba(78, 205, 196, 0.15)' : 'transparent',
                    borderBottom: isActive ? '2px solid #4ecdc4' : '2px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#4ecdc4'
                    e.currentTarget.style.background = 'rgba(78, 205, 196, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  {link.label}
                </a>
              )
            })}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden rounded-lg border border-brand-300/30 bg-white/10 px-4 py-2 text-brand-200 hover:bg-white/15"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            ☰
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed top-[76px] left-0 right-0 z-50 bg-[#0f2319de] backdrop-blur-xl border-b border-brand-600/20 p-4 md:hidden">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === (link.path === '/' ? 'home' : link.path.replace('/', ''))
            return (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? 'bg-brand-500/15 text-brand-200' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </div>
      )}
    </>
  )
}
