import SectionHeader from './ui/SectionHeader'

const PILLARS = [
  {
    num: '01',
    title: 'Healthcare Excellence',
    description:
      'Delivering educational and care solutions that raise clinical standards and patient outcomes across the healthcare continuum.',
  },
  {
    num: '02',
    title: 'Digital Transformation',
    description:
      'Blending AI, digital strategy, and wellness services to make modern healthcare accessible, actionable, and meaningful.',
  },
  {
    num: '03',
    title: 'People First',
    description:
      'Every program is designed around patient comfort, clinician capability, and compassionate care delivery.',
  },
]

const TEAM_MEMBERS = [
  {
    name: 'Dr. Jyoti Rao',
    title: 'Co-Founder & CEO',
    href: 'https://www.linkedin.com/in/dr-jyoti-dongre-rao-11520726/',
  },
  {
    name: 'Ms. Marilyn Olivera',
    title: 'Director Clinical Education and Operations',
    href: 'https://www.linkedin.com/in/marilynolivera/',
  },
  {
    name: 'Mr. Dinesh Kamble',
    title: 'Board of Director',
    href: 'https://www.linkedin.com/in/dinesh-k-a409a06b/',
  },
  {
    name: 'Ms. Vinita Deopurkar',
    title: 'Associate - Clinical Education',
    href: 'https://www.linkedin.com/in/vinita-suresh-deopurkar-526a7424/',
  },
]

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 mesh-gradient opacity-40" />
      <div className="section-container relative">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 lg:items-start">
          <div className="reveal">
            <SectionHeader
              dark
              label="About Us"
              title="Empowering Lives with Cutting-Edge Solutions in Education, Wellness, and Technology"
              description="JVEDTECH Medovation is a Mumbai-based healthcare innovation firm focused on healthcare education, home wellness, digital transformation, and AI-enabled healthcare solutions."
            />

            <div className="mt-6 space-y-6 text-white/80">
              <p className="max-w-xl text-base leading-relaxed">
                At JVEDTECH, we are dedicated to advancing the standards of healthcare through our tailored educational services and cutting-edge solutions. Our commitment to learning and development drives our mission to adapt and excel in the dynamic healthcare landscape.
              </p>
              <p className="max-w-xl text-base leading-relaxed">
                JVEDTECH started with the vision of bringing high-quality medical services directly to individuals within the comfort of their homes. This focus on home healthcare reflects our core value of accessibility and patient-centric care.
              </p>
              <p className="max-w-xl text-base leading-relaxed">
                JVEDTECH has successfully served a wide range of clients, including healthcare institutions, professionals, and individuals. Our client-focused approach has enabled us to build lasting relationships and make a meaningful impact in the industry.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-300">Our Vision</span>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  Empowering healthcare professionals and students through technology, we deliver top-notch services to individuals and institutions.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-300">Our Mission</span>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  Revolutionizing healthcare learning with AI-driven insights, enhancing patient-care insights, AI diagnostics, telehealth, and real-time monitoring while driving healthcare advancements through strategic collaborations.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-300">Our Values</span>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  We focus on quality and innovation, combined with empathy and collaboration, to build solutions that work for people.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-8">
              <div>
                <p className="font-display text-3xl font-bold text-brand-500">AI</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-dim">Driven impact</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-white">India</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-dim">Mumbai headquarters</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-white">Global</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-dim">Healthcare reach</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {PILLARS.map((pillar, i) => (
              <article
                key={pillar.title}
                className={`reveal reveal-delay-${i + 1} group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 shadow-sm transition duration-500 hover:border-brand-400/40 hover:shadow-lg hover:shadow-brand-300/20`}
              >
                <div className="card-shine pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <span className="font-display text-xs font-semibold tracking-widest text-brand-500">
                      {pillar.num}
                    </span>
                    <h3 className="mt-3 font-display text-xl font-semibold text-brand-800">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {pillar.description}
                    </p>
                  </div>
                  <span className="font-display text-4xl font-bold text-white/20 transition group-hover:text-white/40">
                    {pillar.num}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <SectionHeader
            dark
            label="Meet Our Team"
            title="Talented leaders shaping our healthcare vision"
            description="A strong leadership team with deep healthcare, education, and digital expertise guides our strategy and delivery."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {TEAM_MEMBERS.map((member) => (
              <article
                key={member.name}
                className="glass rounded-3xl p-6 border border-white/10 bg-white/5 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="mt-2 text-sm text-white/70">{member.title}</p>
                <a
                  href={member.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-300 hover:text-brand-100"
                >
                  View LinkedIn
                  <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
