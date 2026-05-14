import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Menu, X, Sun, Moon } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'How to Use', href: '#how-to-use' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    
    // Check initial theme (default to dark)
    if (document.documentElement.classList.contains('light')) {
      setIsDark(false)
    } else {
      document.documentElement.classList.add('dark')
    }
    
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    if (isDark) {
      root.classList.remove('dark')
      root.classList.add('light')
      setIsDark(false)
    } else {
      root.classList.remove('light')
      root.classList.add('dark')
      setIsDark(true)
    }
  }

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 h-20 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md border-b border-black/5 dark:border-black/5 dark:border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
              <div className="relative bg-gradient-to-tr from-blue-600 to-violet-600 p-2.5 rounded-xl border border-black/10 dark:border-white/10 group-hover:scale-105 transition-transform duration-300">
                <Brain className="w-5 h-5 text-slate-900 dark:text-white" />
              </div>
            </div>
            <span className="font-heading font-bold text-2xl tracking-tight text-slate-900 dark:text-slate-900 dark:text-white">
              Resume<span className="text-gradient">AI</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 p-1.5 bg-black/5 dark:bg-black/5 dark:bg-white/5 rounded-full border border-black/5 dark:border-black/5 dark:border-white/5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-5 py-2 text-sm font-medium text-slate-600 dark:text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-900 dark:text-white rounded-full hover:bg-black/5 dark:hover:bg-black/5 dark:bg-white/10 transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 text-slate-600 dark:text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-900 dark:text-white bg-black/5 dark:bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-black/5 dark:bg-white/10 rounded-full border border-black/5 dark:border-black/5 dark:border-white/5 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <a
              href="#how-to-use"
              onClick={(e) => handleLinkClick(e, '#how-to-use')}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-slate-900 dark:text-white text-sm font-semibold rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] border border-blue-400/20 transition-all duration-300"
            >
              Get Started
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-900 dark:text-white hover:bg-black/5 dark:hover:bg-black/5 dark:bg-white/5 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-50 dark:bg-[#020617] border-b border-black/5 dark:border-black/5 dark:border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="block px-4 py-3 text-base font-medium text-slate-600 dark:text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-900 dark:text-white hover:bg-black/5 dark:hover:bg-black/5 dark:bg-white/5 rounded-xl transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
              
              <div className="flex items-center justify-between px-4 py-3 border-t border-black/5 dark:border-black/5 dark:border-white/5 mt-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-600 dark:text-slate-300">Theme</span>
                <button
                  onClick={toggleTheme}
                  className="p-2 text-slate-600 dark:text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-900 dark:text-white bg-black/5 dark:bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-black/5 dark:bg-white/10 rounded-lg transition-colors"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>

              <div className="pt-2 mt-2 border-t border-black/5 dark:border-white/5 px-4">
                <a
                  href="#how-to-use"
                  onClick={(e) => handleLinkClick(e, '#how-to-use')}
                  className="flex justify-center w-full px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-200"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
