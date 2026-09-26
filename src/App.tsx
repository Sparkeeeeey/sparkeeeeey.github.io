import Hero from './components/Hero'
import { Contact, Experience, Work } from './components/Sections'

export default function App() {
  return (
    <main className="bg-ink font-hn text-cream">
      <Hero />
      <Work />
      <Experience />
      <Contact />
    </main>
  )
}
