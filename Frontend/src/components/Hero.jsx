import { useEffect, useRef } from 'react'
import { ArrowRight, Play, Sparkles, Brain, Target, ShieldCheck } from 'lucide-react'
import gsap from 'gsap'
import GlassCard from './GlassCard'

function DashboardVisual() {
  const container = useRef(null)

  useEffect(() => {
    // Floating animation
    gsap.to(container.current, {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    })
  }, [])

  return (
    <div ref={container} className="relative w-full max-w-xl lg:max-w-2xl mx-auto z-10">
      {/* Background radial glow */}
      <div className="absolute -inset-10 bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />

      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
            </div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">NLP Analysis Active</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl p-4 text-center">
            <Brain className="w-6 h-6 text-violet-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">1,204</div>
            <div className="text-[10px] text-slate-600 dark:text-slate-400 uppercase tracking-widest">Resumes Parsed</div>
          </div>
          <div className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl p-4 text-center">
            <Target className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">92%</div>
            <div className="text-[10px] text-slate-600 dark:text-slate-400 uppercase tracking-widest">Avg Skill Match</div>
          </div>
        </div>

        {/* Candidate List Mockup */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-3">Top Ranked</div>
          {[
            { name: 'Sarah Chen', role: 'Senior Frontend Engineer', match: 98, color: 'bg-cyan-500', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.5)]' },
            { name: 'James Miller', role: 'Full Stack Developer', match: 87, color: 'bg-blue-500', glow: '' },
            { name: 'Priya Patel', role: 'React Developer', match: 78, color: 'bg-violet-500', glow: '' }
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl p-3">
              <div className={`w-10 h-10 rounded-full ${c.color} ${c.glow} flex items-center justify-center text-sm font-bold text-slate-900 dark:text-white`}>
                {c.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-900 dark:text-white">{c.name}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">{c.role}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-cyan-400">{c.match}%</div>
                <div className="text-[10px] text-slate-500">Match</div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Floating Badges */}
      <div className="absolute -top-6 -right-6 bg-black/5 dark:bg-white/10 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-2xl animate-bounce" style={{ animationDuration: '4s' }}>
        <ShieldCheck className="w-6 h-6 text-emerald-400" />
        <div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">Verified Match</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">By AI Engine</div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stagger-item', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      })
    }, contentRef)

    return () => ctx.revert()
  }, [])

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center overflow-hidden pt-20">
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <div className="stagger-item inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
                AI-Powered Hiring Platform
              </span>
            </div>

            <h1 className="stagger-item font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-tight text-slate-900 dark:text-white mb-6">
              Screen Resumes <br />
              <span className="text-gradient">Smarter with AI</span>
            </h1>

            <p className="stagger-item text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
              Upload resumes, analyze job descriptions, extract skills, and rank candidates instantly using intelligent NLP.
            </p>

            <div className="stagger-item flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollTo('#how-to-use')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-full text-slate-900 dark:text-white font-semibold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] border border-blue-400/20 transition-all duration-300"
              >
                Start Screening
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => scrollTo('#about')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-black/5 dark:bg-white/5 hover:bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-full text-slate-900 dark:text-white font-semibold transition-all duration-300"
              >
                <Play className="w-5 h-5 text-violet-400" />
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="stagger-item lg:block">
            <DashboardVisual />
          </div>

        </div>
      </div>
    </section>
  )
}
