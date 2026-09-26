import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { nav, person, socials } from '../data'

const d = (ms: number) => ({ animationDelay: `${ms}ms` })
const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)'

function ext(href: string) {
  return href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {}
}

export default function Hero() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const name = (
    <>
      {person.first} &mdash; {person.last}&nbsp;
    </>
  )

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      {/* BG image */}
      <picture>
        <source media="(max-width: 639px)" srcSet="/img/hero-bg-m.jpg" />
        <img src="/img/hero-bg.jpg" alt="" className="anim-fade-in absolute inset-0 h-full w-full object-cover" />
      </picture>

      {/* Marquee name */}
      <div className="anim-fade-up absolute inset-x-0 top-[16vh] z-10 overflow-hidden sm:top-[14vh]" style={d(500)} aria-hidden="true">
        <div className="marquee flex w-max whitespace-nowrap font-hn text-[16vh] leading-none text-cream sm:text-[26vh]">
          <span className="pr-[6vw]">{name}</span>
          <span className="pr-[6vw]">{name}</span>
        </div>
      </div>

      {/* Front portrait */}
      <picture>
        <source media="(max-width: 639px)" srcSet="/img/hero-front-m.webp" />
        <img
        src="/img/hero-front.webp"
        alt="Portrait of Yoobin Park"
        className="anim-rise-in pointer-events-none absolute inset-0 z-20 h-full w-full object-cover"
        style={d(300)}
        />
      </picture>

      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 text-cream sm:px-10 sm:pt-8">
        <a href="#" className="anim-fade-up font-hn text-lg tracking-wide" style={d(800)}>
          {person.first}
        </a>

        <div className="hidden items-start gap-16 sm:flex lg:gap-24">
          <span className="anim-fade-up text-sm" style={d(900)}>
            {new Date().getFullYear()}
          </span>
          <nav className="flex flex-col gap-0.5 text-sm">
            {nav.map((l, i) => (
              <a key={l.label} href={l.href} className="anim-fade-up transition-opacity duration-300 hover:opacity-60" style={d(1000 + i * 80)}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-0.5 text-sm">
            {socials.map((l, i) => (
              <a key={l.label} href={l.href} {...ext(l.href)} className="anim-fade-up transition-opacity duration-300 hover:opacity-60" style={d(1150 + i * 80)}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Cream rule */}
      <div className="anim-line absolute inset-x-6 bottom-[5.5rem] z-10 h-0.5 bg-cream sm:inset-x-10 sm:bottom-28" style={d(1200)} />

      {/* Footer */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between px-6 pb-5 font-hn text-xs leading-relaxed text-cream sm:z-10 sm:px-10 sm:pb-8 sm:text-sm">
        <div className="anim-fade-up" style={d(1400)}>
          <p>Mechanical Engineering</p>
          <p>City College of New York</p>
          <p>Design · Build · Test</p>
        </div>
        <div className="anim-fade-up text-right" style={d(1550)}>
          <p>Seeking</p>
          <p>Summer 2027 internships</p>
        </div>
      </div>

      {/* Hamburger */}
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="anim-fade-up fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center sm:hidden"
        style={d(900)}
      >
        <span className="relative block h-4 w-6">
          <span
            className="absolute left-0 top-0 block h-0.5 w-6 bg-cream"
            style={{ transition: `transform 500ms ${EASE}`, transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }}
          />
          <span
            className="absolute left-0 top-[7px] block h-0.5 w-6 bg-cream"
            style={{ transition: 'opacity 300ms', opacity: open ? 0 : 1 }}
          />
          <span
            className="absolute bottom-0 left-0 block h-0.5 w-6 bg-cream"
            style={{ transition: `transform 500ms ${EASE}`, transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }}
          />
        </span>
      </button>

      {/* Mobile drawer */}
      <div className="sm:hidden">
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        />
        <aside
          className={`fixed right-0 top-0 z-40 flex h-full w-[80%] max-w-sm flex-col bg-[#141414] px-8 py-10 text-cream ${open ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ transition: `transform 600ms ${EASE}` }}
          aria-hidden={!open}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute right-6 top-6"
            style={{
              transition: 'transform 500ms, opacity 500ms',
              transitionDelay: open ? '300ms' : '0ms',
              transform: open ? 'rotate(0deg)' : 'rotate(90deg)',
              opacity: open ? 1 : 0,
            }}
          >
            <X size={26} strokeWidth={1.5} />
          </button>

          <Reveal open={open} delay={250} from="translate-y-4">
            <p className="mt-16 text-xs uppercase tracking-[0.2em] text-cream/50">Site Index</p>
          </Reveal>
          <nav className="mt-4 flex flex-col gap-2">
            {nav.map((l, i) => (
              <Reveal key={l.label} open={open} delay={300 + i * 80} from="translate-y-6">
                <a href={l.href} onClick={() => setOpen(false)} className="text-4xl">
                  {l.label}
                </a>
              </Reveal>
            ))}
          </nav>

          <Reveal open={open} delay={500} from="translate-y-4">
            <p className="mt-12 text-xs uppercase tracking-[0.2em] text-cream/50">Find Me</p>
          </Reveal>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {socials.map((l, i) => (
              <Reveal key={l.label} open={open} delay={550 + i * 60} from="translate-y-4">
                <a href={l.href} {...ext(l.href)}>
                  {l.label}
                </a>
              </Reveal>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}

function Reveal({ open, delay, from, children }: { open: boolean; delay: number; from: string; children: React.ReactNode }) {
  return (
    <div
      className={`transition-all duration-700 ${open ? 'translate-y-0 opacity-100' : `${from} opacity-0`}`}
      style={{ transitionDelay: open ? `${delay}ms` : '0ms', transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
    >
      {children}
    </div>
  )
}
