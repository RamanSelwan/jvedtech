/**
 * INTEGRATED PAGE COMPONENT
 * 
 * Combines HomeScreen hero with all sections below it.
 * Maintains the futuristic premium design aesthetic throughout.
 * Navigation is handled by the PremiumNavbar overlay.
 */

import useScrollReveal from '../hooks/useScrollReveal'
import HomeScreen from './HomeScreen'

export default function IntegratedPage() {
  useScrollReveal()

  return (
    <main className="relative overflow-hidden">
      <section id="home">
        <HomeScreen />
      </section>
    </main>
  )
}
