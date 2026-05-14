import { useEffect, useRef } from 'react'
import { FileSearch, BrainCircuit, Trophy, Layers } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlassCard from './GlassCard'
import SectionHeading from './SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: FileSearch,
    title: 'Smart Resume Parsing',
    description: 'Advanced NLP algorithms extract key information from resumes in any format — PDF, DOCX, or plain text — with near-perfect accuracy.',
    accent: 'text-blue-400',
    bg: 'bg-blue-500/10',
    glow: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:border-blue-500/50'
  },
  {
    icon: BrainCircuit,
    title: 'AI Skill Matching',
    description: 'Our AI engine maps candidate skills to job requirements using semantic understanding, going beyond simple keyword matching.',
    accent: 'text-violet-400',
    bg: 'bg-violet-500/10',
    glow: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] group-hover:border-violet-500/50'
  },
  {
    icon: Layers,
    title: 'Semantic JD Analysis',
    description: 'Automatically break down complex job descriptions into core requirements, required experience levels, and essential soft skills.',
    accent: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    glow: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] group-hover:border-cyan-500/50'
  },
  {
    icon: Trophy,
    title: 'Candidate Ranking',
    description: 'Get an instant, data-driven leaderboard of top candidates ranked by fit score, experience relevance, and skill alignment.',
    accent: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] group-hover:border-emerald-500/50'
  },
]

export default function About() {
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      })
    }, cardsRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="relative w-full min-h-screen py-28">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <SectionHeading
          badge="Platform Capabilities"
          title="Transform Hiring with"
          highlight="Intelligent Automation"
          description="Our AI-powered platform combines natural language processing, machine learning, and intelligent automation to transform how organizations screen and evaluate candidates."
        />

        {/* Feature cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((f) => (
            <div key={f.title} className="feature-card h-full">
              <GlassCard className={`h-full group transition-all duration-500 ${f.glow}`}>
                <div className="p-8 flex flex-col h-full relative z-10">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${f.bg} border border-black/5 dark:border-white/5 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <f.icon className={`w-7 h-7 ${f.accent}`} />
                  </div>

                  <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white mb-3">{f.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-1">{f.description}</p>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
