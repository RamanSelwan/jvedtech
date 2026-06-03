import { useRef, useEffect, useState } from 'react'
import { OPEN_POSITIONS, COMPANY_VALUES, COMPANY_PERKS, CONTACT_INFO } from '../data/content'

function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true)
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

function ValueCard({ value, delay }) {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      style={{
        animation: inView ? `fadeUp 0.6s ease-out ${delay}s both` : 'none',
      }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      <div className="glass p-8 rounded-xl h-full">
        <div className="text-3xl mb-4">{value.icon}</div>
        <h3 className="text-lg font-semibold text-brand-900 mb-2 font-display">
          {value.title}
        </h3>
        <p className="text-sm text-foreground-muted leading-relaxed">
          {value.description}
        </p>
      </div>
    </div>
  )
}

function PerkCard({ perk }) {
  return (
    <div className="text-center">
      <div className="text-3xl mb-3">{perk.icon}</div>
      <h4 className="font-semibold text-white mb-1">{perk.title}</h4>
      <p className="text-sm text-white/70">{perk.description}</p>
    </div>
  )
}

function JobCard({ job, index }) {
  const [expanded, setExpanded] = useState(false)
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className="glass rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-brand-400/20"
      style={{
        animation: inView ? `fadeUp 0.6s ease-out ${index * 0.1}s both` : 'none',
      }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-brand-50/50 transition-colors duration-300"
      >
        <div className="flex-1">
          <div className="flex gap-2 mb-3 flex-wrap">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 bg-brand-50 rounded-full">
              {job.department}
            </span>
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground-muted bg-surface-elevated rounded-full">
              {job.type}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-brand-900 mb-2">
            {job.title}
          </h3>
          <p className="text-sm text-foreground-muted leading-relaxed">
            {job.summary}
          </p>
        </div>

        <div className={`flex-shrink-0 w-8 h-8 rounded-full border border-brand-300 flex items-center justify-center text-brand-600 transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`}>
          →
        </div>
      </button>

      {expanded && (
        <div className="border-t border-brand-600/10 px-6 py-4 bg-surface-elevated/50">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-3">
              Key Skills Required
            </p>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-block px-3 py-1 text-xs font-medium text-brand-600 bg-brand-50 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-4 px-4 py-2 bg-brand-500 text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:bg-brand-600 hover:shadow-md hover:shadow-brand-500/30"
          >
            Apply for this Role →
          </button>
        </div>
      )}
    </div>
  )
}

export default function Careers() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-32">
      <div className="pointer-events-none absolute inset-0 mesh-gradient opacity-30" />
      <div className="section-container relative">
        {/* Hero Section */}
        <div className="py-20 sm:py-28">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-200 block mb-4">
              We're Hiring
            </span>
            <h1 className="text-4xl sm:text-5xl font-light font-display text-white mb-4 leading-tight">
              Shape the Future of <span className="text-brand-300">Healthcare Education</span>
            </h1>
            <p className="text-white/70 leading-relaxed mb-6 text-lg">
              At JVEDTECH Medovation, we advance healthcare standards through tailored education and cutting-edge solutions. Join a team where learning, growth, and impact converge.
            </p>

            <div className="flex gap-3 flex-wrap">
              <button className="px-6 py-2 bg-brand-500 text-white rounded-lg font-medium transition-all duration-300 hover:bg-brand-600">
                View Open Roles
              </button>
              <button className="px-6 py-2 border border-white/20 text-white rounded-lg font-medium transition-all duration-300 hover:bg-white/10">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Why JVedtech Section */}
      <div className="py-20 sm:py-28 border-b border-brand-600/10">
        <div className="section-container">
          <div className="mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-200 block mb-3">
              Why JVedtech
            </span>
            <h2 className="text-3xl sm:text-4xl font-light font-display text-white mb-3">
              Where expertise meets purpose
            </h2>
            <p className="text-white/70">
              We believe the best healthcare outcomes start with the best-trained people.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {COMPANY_VALUES.map((value, i) => (
              <ValueCard key={value.title} value={value} delay={i * 0.1} />
            ))}
          </div>

          {/* Perks Bar */}
          <div className="bg-gradient-to-r from-brand-900 to-brand-800 rounded-xl p-8 sm:p-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {COMPANY_PERKS.map((perk) => (
                <PerkCard key={perk.title} perk={perk} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Open Positions Section */}
      <div className="py-20 sm:py-28 border-b border-brand-600/10">
        <div className="section-container">
          <div className="mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-500 block mb-3">
              Open Positions
            </span>
            <h2 className="text-3xl sm:text-4xl font-light font-display text-brand-900 mb-3">
              Find your role at JVedtech
            </h2>
            <p className="text-foreground-muted">
              We're growing our team with professionals passionate about advancing healthcare through education and innovation.
            </p>
          </div>

          <div className="space-y-4">
            {OPEN_POSITIONS.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Application CTA Section */}
      <div className="py-20 sm:py-28">
        <div className="section-container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Details */}
            <div>
              <h2 className="text-2xl font-light font-display text-white mb-8">
                Get in Touch
              </h2>

              <div className="space-y-6 text-white/80">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-300 mb-2">
                    Email
                  </p>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-white hover:text-brand-100 transition-colors"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-300 mb-2">
                    Phone
                  </p>
                  <a
                    href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                    className="text-white hover:text-brand-100 transition-colors"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-300 mb-2">
                    Address
                  </p>
                  <p className="text-white">{CONTACT_INFO.address}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-300 mb-2">
                    Response Time
                  </p>
                  <p className="text-brand-800">We aim to respond within 3–5 business days</p>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div id="apply-form" className="glass-strong rounded-xl p-8">
              <h3 className="text-xl font-semibold text-brand-900 mb-2">
                Submit Your Application
              </h3>
              <p className="text-sm text-foreground-muted mb-6">
                Complete the form and our team will be in touch shortly.
              </p>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="text-sm px-4 py-2 rounded-lg border border-brand-200 focus:border-brand-400 focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="text-sm px-4 py-2 rounded-lg border border-brand-200 focus:border-brand-400 focus:outline-none transition-colors"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full text-sm px-4 py-2 rounded-lg border border-brand-200 focus:border-brand-400 focus:outline-none transition-colors"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full text-sm px-4 py-2 rounded-lg border border-brand-200 focus:border-brand-400 focus:outline-none transition-colors"
                />

                <select className="w-full text-sm px-4 py-2 rounded-lg border border-brand-200 focus:border-brand-400 focus:outline-none transition-colors text-foreground-muted">
                  <option value="">Select a role</option>
                  {OPEN_POSITIONS.map((job) => (
                    <option key={job.id} value={job.title}>
                      {job.title}
                    </option>
                  ))}
                </select>

                <textarea
                  placeholder="Tell us why you're a great fit..."
                  className="w-full text-sm px-4 py-2 rounded-lg border border-brand-200 focus:border-brand-400 focus:outline-none transition-colors resize-none"
                  rows="3"
                />

                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-brand-500 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-brand-600 hover:shadow-md hover:shadow-brand-500/30"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
