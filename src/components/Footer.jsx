import { IconDroplet } from './icons/ServiceIcons'
import { CONTACT_INFO } from '../data/content'

const FOOTER_LINKS = [
  {
    title: 'Navigation',
    links: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Events', href: '#events' },
      { label: 'Careers', href: '#careers' },
      { label: 'Community', href: '#community' },
    ],
  },
  {
    title: 'Our Services',
    links: [
      { label: 'EduGlobe', href: '#services' },
      { label: 'Digital Ads Pro', href: '#services' },
      { label: 'Medi AI Informatics', href: '#initiatives' },
      { label: 'In-Home Wellness', href: '#services' },
      { label: 'Holistic Wellbeing', href: '#services' },
      { label: 'Leadership Programs', href: '#services' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '#' },
      { label: 'Newsroom', href: '#' },
      { label: 'Webinars', href: '#events' },
      { label: 'Careers', href: '#careers' },
      { label: 'Community', href: '#community' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="section-dark border-t border-white/10 pt-16 pb-8">
      <div className="section-container">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#home" className="flex items-center gap-2.5 font-display text-lg font-bold tracking-wider text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-300/30 bg-brand-300/10 text-brand-300">
                <IconDroplet className="h-3.5 w-2.5" animated />
              </span>
              JV<span className="text-brand-300">EDTECH</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              Where compassion meets technology — redefining global healthcare learning.
            </p>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-300/80">
                {group.title}
              </p>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/65 transition hover:text-brand-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-300/80">
              Get in Touch
            </p>
            <ul className="mt-4 space-y-3 text-sm text-white/65">
              <li>
                <a href={`mailto:${CONTACT_INFO.email}`} className="transition hover:text-brand-300">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="transition hover:text-brand-300">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="text-white/50 text-xs">
                {CONTACT_INFO.address}
              </li>
              <li className="mt-3 pt-3 border-t border-white/10">
                <a 
                  href={CONTACT_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-300 hover:text-brand-200 transition font-semibold flex items-center gap-2"
                >
                  <span>Join WhatsApp Community</span>
                  <span>→</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="glow-line mt-14 h-px w-full opacity-80" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center text-xs text-white/50 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} JV EdTech Medovation. All rights reserved.</p>
          <p className="uppercase tracking-[0.25em] text-brand-300/70">
            Compassion · Technology · Innovation
          </p>
        </div>
      </div>
    </footer>
  )
}
