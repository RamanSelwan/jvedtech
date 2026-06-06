import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Button from './ui/Button'

const USE_VIDEO_BACKGROUND = true
const HERO_VIDEO_SRC = '/bg-video.mp4'

const headingWords = [
  { text: 'Redefining Global', className: '' },
  {
    text: 'Healthcare Learning.',
    className:
      'bg-gradient-to-r from-brand-300 via-brand-400 to-brand-300 bg-clip-text text-transparent',
  },
  { text: 'Where compassion meets technology.', className: 'italic text-white/90' },
]

export default function HomeScreen() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !USE_VIDEO_BACKGROUND) return

    video.muted = true
    const playVideo = () => {
      video.play().catch(() => {})
    }

    playVideo()
    video.addEventListener('loadeddata', playVideo)

    return () => video.removeEventListener('loadeddata', playVideo)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: [0.22, 1, 0.36, 1] } })

      tl.from('.hero-content', { opacity: 0, duration: 1.5 })
        .from('.hero-badge', { opacity: 0, y: 16, duration: 0.55 }, 0.2)
        .from(
          '.hero-word',
          { opacity: 0, y: 24, duration: 0.55, stagger: 0.08 },
          0.35,
        )
        .from('.hero-sub', { opacity: 0, y: 20, duration: 0.6 }, 0.7)
        .from('.hero-cta > *', { opacity: 0, y: 16, duration: 0.55, stagger: 0.1 }, 0.85)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100vh] overflow-hidden bg-black py-16 pt-28 lg:py-20 lg:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {USE_VIDEO_BACKGROUND ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={HERO_VIDEO_SRC}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        ) : (
          <div className="absolute inset-0 bg-black" />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="hero-content relative z-20">
        <div className="section-container max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  <span className="size-2 rounded-full bg-brand-300" />
                  <span className="text-xs uppercase tracking-[0.24em] text-white/70">
                    Healthcare Innovation
                  </span>
                </div>

                <h1 className="font-display max-w-3xl text-balance text-5xl font-bold leading-[0.95] text-white sm:text-6xl lg:text-[5.2rem]">
                  <span className="inline-flex flex-wrap items-center gap-4">
                    {headingWords.map((word, index) => (
                      <span
                        key={word.text + index}
                        className={`hero-word inline-block ${word.className}`}
                      >
                        {word.text}
                      </span>
                    ))}
                  </span>
                </h1>

                <p className="hero-sub max-w-lg text-base leading-relaxed text-white/65 lg:text-lg">
                  JV EdTech Medovation bridges compassion and technology — empowering
                  professionals through AI-driven education, clinical informatics, and
                  digital health innovation.
                </p>
              </div>

              <div className="hero-cta flex flex-col gap-3 sm:flex-row">
                <Button href="#services" variant="light" className="px-8 py-4 text-base">
                  Explore Medi AI
                </Button>
                <Button href="#about" variant="on-dark" className="px-8 py-4 text-base">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
