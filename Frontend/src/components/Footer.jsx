import { Brain, Globe, Mail, ExternalLink, ArrowUp } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'How to Use', href: '#how-to-use' },
]

export default function Footer() {
  const scrollTo = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-white dark:bg-[#05050a] border-t border-black/10 dark:border-white/10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#home" onClick={(e) => scrollTo(e, '#home')} className="flex items-center gap-3 mb-4 group">
              <div className="relative bg-gradient-to-tr from-blue-600 to-violet-600 p-2 rounded-lg border border-black/10 dark:border-white/10 group-hover:scale-105 transition-transform duration-300">
                <Brain className="w-5 h-5 text-slate-900 dark:text-white" />
              </div>
              <span className="font-heading font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                Resume<span className="text-gradient">AI</span>
              </span>
            </a>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">
              Empowering recruiters with AI-driven candidate screening. Faster hiring, smarter decisions.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {[Globe, Mail, ExternalLink].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-black/5 dark:bg-white/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white mb-5 tracking-wide uppercase">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Newsletter placeholder */}
          <div>
            <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white mb-5 tracking-wide uppercase">Stay Updated</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Get notified about new features and updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-200"
              />
              <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold text-slate-900 dark:text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all duration-200 shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 font-medium">
            © 2026 AI Resume Screener. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors duration-200"
          >
            Back to top
            <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 group-hover:bg-black/5 dark:bg-white/10 flex items-center justify-center transition-colors duration-200">
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  )
}
