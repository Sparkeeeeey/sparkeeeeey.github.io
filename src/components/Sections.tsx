import type { Media, Project } from '../data'
import { experience, extras, person, projects, socials } from '../data'
import { useReveal } from './useReveal'

function Reveal({ className = '', children }: { className?: string; children: React.ReactNode }) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

function SectionHead({ label, right }: { label: string; right?: string }) {
  return (
    <Reveal>
      <div className="flex items-end justify-between text-xs uppercase tracking-[0.2em] text-cream/50 sm:text-sm">
        <span>{label}</span>
        {right && <span>{right}</span>}
      </div>
      <div className="mt-4 h-0.5 bg-cream" />
    </Reveal>
  )
}

function Figure({ m, className = '', fit = 'cover' }: { m: Media; className?: string; fit?: 'cover' | 'contain' }) {
  const cls = `h-full w-full ${fit === 'cover' ? 'object-cover' : 'object-contain bg-[#e9e8e3]'}`
  return (
    <figure className={`min-w-0 ${className}`}>
      <div className="w-full overflow-hidden bg-[#1a1a1a] sm:h-full">
        {m.video ? (
          <video src={m.src} className={cls} autoPlay muted loop playsInline preload="metadata" aria-label={m.alt} />
        ) : (
          <img src={m.src} alt={m.alt} loading="lazy" className={`${cls} transition-transform duration-700 hover:scale-[1.03]`} />
        )}
      </div>
      {m.caption && <figcaption className="mt-2 text-xs text-cream/50">{m.caption}</figcaption>}
    </figure>
  )
}

const isDrawing = (m: Media) => /cad|wiring/.test(m.src)

function ProjectBlock({ p, i }: { p: Project; i: number }) {
  return (
    <article id={p.id} className="scroll-mt-10 border-b border-cream/15 py-16 sm:py-24">
      <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-[18vw] leading-none text-cream/15 sm:text-8xl">{String(i + 1).padStart(2, '0')}</p>
          <div className="mt-6 space-y-1 text-sm text-cream/60">
            <p>{p.context}</p>
            {p.date && <p>{p.date}</p>}
            <p>{p.team}</p>
          </div>
        </div>
        <div className="lg:col-span-8">
          <h3 className="text-4xl leading-[1.05] sm:text-6xl">{p.title}</h3>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/85 sm:text-xl">{p.summary}</p>

          <dl className="mt-10 grid gap-8 text-sm leading-relaxed sm:grid-cols-[8rem_1fr] sm:gap-x-8 sm:gap-y-6 sm:text-base">
            <dt className="uppercase tracking-[0.2em] text-xs text-cream/50 sm:pt-1">Problem</dt>
            <dd className="-mt-6 sm:mt-0">{p.problem}</dd>
            <dt className="uppercase tracking-[0.2em] text-xs text-cream/50 sm:pt-1">What I did</dt>
            <dd className="-mt-6 sm:mt-0">
              <ul className="space-y-2">
                {p.did.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-cream/60" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </dd>
            {p.result && (
              <>
                <dt className="uppercase tracking-[0.2em] text-xs text-cream/50 sm:pt-1">Result</dt>
                <dd className="-mt-6 sm:mt-0">{p.result}</dd>
              </>
            )}
            <dt className="uppercase tracking-[0.2em] text-xs text-cream/50 sm:pt-1">Tools</dt>
            <dd className="-mt-6 text-cream/70 sm:mt-0">{p.skills.join(' · ')}</dd>
          </dl>
        </div>
      </Reveal>

      <Reveal className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-12">
        <Figure m={p.cover} className="sm:col-span-7 [&>div]:aspect-[4/5] sm:[&>div]:aspect-auto sm:[&>div]:h-[36rem]" />
        <div className="grid min-w-0 grid-cols-2 gap-4 sm:col-span-5">
          {p.gallery.map((m) => (
            <Figure key={m.src} m={m} fit={isDrawing(m) ? 'contain' : 'cover'} className="[&>div]:aspect-square sm:[&>div]:aspect-auto sm:[&>div]:h-[16.25rem]" />
          ))}
        </div>
      </Reveal>
    </article>
  )
}

export function Work() {
  return (
    <section id="work" className="px-6 pt-24 sm:px-10 sm:pt-32">
      <SectionHead label="Selected Work" right={`${String(projects.length).padStart(2, '0')} projects`} />
      {projects.map((p, i) => (
        <ProjectBlock key={p.id} p={p} i={i} />
      ))}
    </section>
  )
}

export function Experience() {
  const { education, award, skills } = extras
  return (
    <section id="experience" className="scroll-mt-4 px-6 pt-24 sm:px-10 sm:pt-32">
      <SectionHead label="Experience" />
      {experience.map((e) => (
        <Reveal key={e.org} className="grid gap-4 border-b border-cream/15 py-10 sm:grid-cols-12 sm:gap-8">
          <p className="text-sm text-cream/60 sm:col-span-3">{e.years}</p>
          <div className="sm:col-span-4">
            <h3 className="text-2xl sm:text-3xl">{e.org}</h3>
            <p className="mt-1 text-sm text-cream/60">
              {e.role} · {e.place}
            </p>
          </div>
          <ul className="space-y-2 text-sm leading-relaxed text-cream/85 sm:col-span-5 sm:text-base">
            {e.points.map((x) => (
              <li key={x} className="flex gap-3">
                <span className="mt-[0.7em] h-px w-3 shrink-0 bg-cream/60" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}

      <div className="grid gap-16 pt-24 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-cream/50">Education</p>
          <h3 className="mt-4 text-2xl sm:text-3xl">{education.degree}</h3>
          <p className="mt-2 text-cream/70">{education.school}</p>
          <p className="mt-1 text-sm text-cream/50">
            {education.years} · {education.clubs}
          </p>

          <p className="mt-14 text-xs uppercase tracking-[0.2em] text-cream/50">Award</p>
          <h3 className="mt-4 text-2xl sm:text-3xl">{award.title}</h3>
          <p className="mt-2 text-cream/70">{award.detail}</p>
          <p className="mt-1 text-sm text-cream/50">{award.year}</p>
        </Reveal>
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-cream/50">Skills</p>
          <dl className="mt-4">
            {skills.map((s) => (
              <div key={s.group} className="grid gap-1 border-b border-cream/15 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="text-sm text-cream/50">{s.group}</dt>
                <dd>{s.items}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="px-6 pb-8 pt-32 sm:px-10 sm:pt-44">
      <SectionHead label="Contact" />
      <Reveal className="py-16 sm:py-24">
        <p className="max-w-3xl text-3xl leading-tight text-cream/85 sm:text-5xl">
          Looking for a mechanical engineering intern for Summer 2027? Let&rsquo;s talk.
        </p>
        <a
          href={`mailto:${person.email}`}
          className="mt-10 inline-block break-all text-[9vw] leading-none underline decoration-1 underline-offset-[0.15em] transition-opacity duration-300 hover:opacity-60 sm:text-[6vw]"
        >
          {person.email}
        </a>
      </Reveal>
      <div className="h-0.5 bg-cream" />
      <footer className="flex flex-col justify-between gap-4 pt-6 text-xs text-cream/60 sm:flex-row sm:text-sm">
        <span>
          &copy; {new Date().getFullYear()} {person.first} {person.last}
        </span>
        <div className="flex gap-6">
          {socials.map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="transition-opacity duration-300 hover:opacity-60">
              {l.label}
            </a>
          ))}
        </div>
      </footer>
    </section>
  )
}
