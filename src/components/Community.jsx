import { useRef, useEffect, useState } from 'react'
import { COMMUNITY_DATA, CONTACT_INFO } from '../data/content'

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

function BenefitItem({ benefit, index }) {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className="flex gap-4"
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

      <div className="flex-shrink-0">
        <div className="flex items-center justify-center h-8 w-8 rounded-lg border border-brand-400 bg-brand-50">
          <svg className="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-white text-sm mb-1">{benefit.title}</h4>
        <p className="text-white/70 text-sm">{benefit.description}</p>
      </div>
    </div>
  )
}

export default function Community() {
  const [ref, inView] = useInView()

  return (
    <section className="bg-gradient-to-b from-brand-900 to-brand-800 py-20 sm:py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
          {/* Left Content */}
          <div
            ref={ref}
            style={{
              animation: inView ? 'fadeUp 0.8s ease-out 0.2s both' : 'none',
            }}
          >
            <style>{`
              @keyframes fadeUp {
                from { opacity: 0; transform: translateY(32px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            <div className="mb-4 flex items-center gap-3">
              <span className="inline-block w-12 h-px bg-gradient-to-r from-brand-300 to-transparent" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
                Community
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-light font-display text-white mb-4 leading-tight">
              Where healthcare meets <em className="italic text-brand-300">innovation.</em>
            </h2>

            <p className="text-lg text-white/75 leading-relaxed mb-8 max-w-md">
              {COMMUNITY_DATA.description}
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-10 py-6 border-y border-white/10">
              {COMMUNITY_DATA.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-semibold text-white mb-1">
                    {stat.number}
                  </div>
                  <p className="text-xs uppercase tracking-widest text-white/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={CONTACT_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-brand-400 hover:bg-brand-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-brand-400/30 hover:shadow-brand-500/40 group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
              {COMMUNITY_DATA.cta}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>

            <p className="text-sm text-white/50 mt-4">{COMMUNITY_DATA.note}</p>
          </div>

          {/* Right Card */}
          <div
            style={{
              animation: inView ? 'fadeUp 0.8s ease-out 0.4s both' : 'none',
            }}
          >
            <div className="glass-dark rounded-xl p-8 sm:p-10">
              {/* WhatsApp Badge */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/30">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/60 font-semibold">
                    Official Network
                  </p>
                  <p className="text-white font-semibold">JVedtech Community</p>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-6">
                {COMMUNITY_DATA.benefits.map((benefit, index) => (
                  <BenefitItem key={benefit.title} benefit={benefit} index={index} />
                ))}
              </div>

              {/* Avatar Stack */}
              <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-brand-900 bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-semibold"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-brand-900 bg-brand-500/20 flex items-center justify-center text-white text-xs font-semibold">
                    +
                  </div>
                </div>
                <p className="text-sm text-white/70">
                  <span className="text-white font-semibold">Multiple groups integrated</span> — one entry point
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
