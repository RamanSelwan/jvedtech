import { useRef, useEffect, useState } from 'react'
import { EVENTS } from '../data/content'

const SAMPLE_EVENTS = EVENTS || []

function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}

function EventCard({ event, delay, onRegister }) {
  const [ref, inView] = useInView()
  const eventDate = new Date(event.date)
  const day = eventDate.getDate()
  const month = eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase()

  const statusStyles = {
    upcoming: 'bg-brand-50 text-brand-600 border-brand-200',
    live: 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse',
    past: 'bg-gray-100 text-gray-600 border-gray-200',
  }

  return (
    <div
      ref={ref}
      className="group"
      style={{ animation: inView ? `fadeUp 0.6s ease-out ${delay}s both` : 'none' }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="glass rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-brand-400/20 h-full">
        <div className="relative p-6 border-b border-brand-600/10">
          <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-brand-100 to-brand-50 rounded-3xl flex flex-col items-center justify-center">
            <div className="text-xs font-semibold text-brand-400 uppercase">{month}</div>
            <div className="text-2xl font-bold text-brand-700">{day}</div>
          </div>

          <div className="flex gap-2 mb-3 pr-20 flex-wrap">
            <span className={`inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded border ${statusStyles[event.status]}`}>
              {event.status === 'upcoming' ? 'Upcoming' : event.status === 'live' ? 'LIVE' : 'Past'}
            </span>
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground-muted bg-surface-elevated rounded border border-brand-600/10">
              {event.time.split('–')[0].trim()}
            </span>
          </div>

          <h3 className="text-xl font-semibold text-brand-900 pr-20">{event.title}</h3>
        </div>

        <div className="p-6">
          <p className="text-sm text-foreground-muted leading-relaxed mb-5">{event.description}</p>

          <div className="space-y-3 mb-6 pt-4 border-t border-brand-600/10">
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-brand-700 font-medium">{event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-brand-700 font-medium">{event.attendees} interested</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onRegister}
            className="w-full px-4 py-3 bg-brand-500 text-white text-sm font-semibold rounded-2xl transition-all duration-300 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/20"
          >
            {event.status === 'past' ? 'Closed' : 'Register Now'}
          </button>
        </div>
      </div>
    </div>
  )
}

function RegistrationModal({ event, onClose, onSubmit }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      alert('Please enter your name and email.')
      return
    }

    setSubmitting(true)
    const payload = {
      id: Date.now(),
      eventId: event.id,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      date: new Date().toISOString(),
    }

    const success = await onSubmit(payload)
    setSubmitting(false)
    if (success) {
      setName('')
      setEmail('')
      setPhone('')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-2xl rounded-[32px] bg-white p-8 shadow-2xl shadow-brand-900/20">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-brand-900 mb-2">Register: {event.title}</h3>
            <p className="text-sm text-foreground-muted">Complete the form below and we’ll confirm your seat.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-brand-200 px-4 py-2 text-sm text-brand-700 transition hover:bg-brand-50"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="Full name"
            className="w-full rounded-2xl border border-brand-200 bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand-400"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="Email"
            className="w-full rounded-2xl border border-brand-200 bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand-400"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
            placeholder="Phone (optional)"
            className="w-full rounded-2xl border border-brand-200 bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand-400"
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-brand-200 bg-white px-5 py-3 text-sm text-brand-700 transition hover:bg-brand-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-2xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-brand-300"
            >
              {submitting ? 'Registering…' : 'Submit Registration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Events() {
  const [filter, setFilter] = useState('all')
  const [events, setEvents] = useState(SAMPLE_EVENTS)
  const [modalOpen, setModalOpen] = useState(false)
  const [activeEvent, setActiveEvent] = useState(null)

  useEffect(() => {
    setEvents(SAMPLE_EVENTS)
  }, [])

  async function submitRegistration(payload) {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Registration request failed')
      }
      return true
    } catch (error) {
      try {
        const key = 'jvedtech_event_regs'
        const stored = JSON.parse(localStorage.getItem(key) || '[]')
        stored.push(payload)
        localStorage.setItem(key, JSON.stringify(stored))
        return true
      } catch (storageError) {
        return false
      }
    }
  }

  const openRegister = (event) => {
    setActiveEvent(event)
    setModalOpen(true)
  }

  const handleModalSubmit = async (payload) => {
    const success = await submitRegistration(payload)
    if (success) {
      alert('Registered successfully.')
      setModalOpen(false)
    } else {
      alert('Unable to register. Please try again.')
    }
  }

  const filteredEvents = filter === 'all' ? events : events.filter((item) => item.status === filter)

  return (
    <section className="relative overflow-hidden py-28 sm:py-32">
      <div className="pointer-events-none absolute inset-0 mesh-gradient opacity-30" />
      <div className="section-container relative">
        <div className="mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-300 block mb-3">
            Learning & Networking
          </span>
          <h2 className="text-4xl sm:text-5xl font-light font-display text-white mb-4 leading-tight">
            Upcoming Events
          </h2>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Join our webinars, workshops, and summits to stay updated on the latest trends in healthcare education and AI-driven innovation.
          </p>
        </div>

        <div className="flex gap-3 mb-12 flex-wrap">
          {['all', 'upcoming', 'past'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === option
                  ? 'bg-brand-500 text-white'
                  : 'border border-brand-200 text-brand-700 hover:bg-brand-50'
              }`}
            >
              {option === 'all' ? 'All Events' : option === 'upcoming' ? 'Upcoming' : 'Past Events'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} delay={index * 0.1} onRegister={() => openRegister(event)} />
            ))
          ) : (
            <div className="col-span-2 text-center py-16">
              <div className="text-4xl mb-4">📋</div>
              <p className="text-white/70">No events matched that filter.</p>
            </div>
          )}
        </div>
      </div>

      {modalOpen && activeEvent && (
        <RegistrationModal event={activeEvent} onClose={() => setModalOpen(false)} onSubmit={handleModalSubmit} />
      )}
    </section>
  )
}
