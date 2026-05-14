import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import HowToUse from './components/HowToUse'
import Footer from './components/Footer'
import ThreeBackground from './components/ThreeBackground'

export default function App() {
  return (
    <div className="relative w-full min-h-screen text-slate-900 bg-slate-50 dark:text-slate-200 dark:bg-[#020617] transition-colors duration-300">
      <ThreeBackground />
      <Navbar />
      <main className="relative z-10 flex flex-col items-center w-full">
        <Hero />
        <About />
        <HowToUse />
      </main>
      <Footer />
    </div>
  )
}
