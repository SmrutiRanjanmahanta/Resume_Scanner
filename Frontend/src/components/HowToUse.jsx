import { useEffect, useRef } from 'react'
import { Upload, FileText, BrainCircuit, ListOrdered, ArrowRight, CheckCircle2 } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from './SectionHeading'
import GlassCard from './GlassCard'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload Resumes',
    description: 'Drag and drop or browse to upload candidate resumes in PDF, DOCX, or TXT format. Batch upload is supported.',
    details: ['PDF, DOCX, TXT support', 'Batch upload up to 500', 'Instant format detection'],
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    glow: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:border-blue-500/50'
  },
  {
    icon: FileText,
    step: '02',
    title: 'Add Job Description',
    description: 'Paste or type the job description. Our AI identifies required skills, qualifications, and experience automatically.',
    details: ['Auto-extract requirements', 'Skill taxonomy mapping', 'Priority weighting'],
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    glow: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] group-hover:border-violet-500/50'
  },
  {
    icon: BrainCircuit,
    step: '03',
    title: 'AI Analyzes Skills',
    description: 'Our AI engine processes every resume, scores skill matches, evaluates experience, and generates comprehensive insights.',
    details: ['NLP-powered analysis', 'Semantic skill matching', 'Experience evaluation'],
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    glow: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] group-hover:border-cyan-500/50'
  },
  {
    icon: ListOrdered,
    step: '04',
    title: 'Get Ranked Results',
    description: 'Receive an instant leaderboard of candidates ranked by fit score. Download reports or shortlist your top picks.',
    details: ['Instant leaderboard', 'Exportable reports', 'One-click shortlisting'],
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] group-hover:border-emerald-500/50'
  },
]

export default function HowToUse() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate line
      gsap.from('.connecting-line', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 1
        },
        scaleX: 0,
        transformOrigin: 'left center',
        ease: 'none'
      })

      // Animate cards
      gsap.from('.step-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.2)'
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="how-to-use" className="relative w-full min-h-screen py-28">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <SectionHeading
          badge="How It Works"
          title="Get Started in"
          highlight="4 Simple Steps"
          description="From uploading resumes to receiving ranked results — our streamlined workflow makes intelligent hiring effortless."
        />

        {/* Steps grid */}
        <div ref={containerRef} className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 mt-16">
          {/* Connecting glowing line */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-0.5 bg-black/5 dark:bg-white/10 -z-10">
            <div className="connecting-line w-full h-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 shadow-[0_0_15px_rgba(139,92,246,0.6)]" />
          </div>

          {steps.map((s) => (
            <div key={s.step} className="step-card relative group h-full">
              <GlassCard className={`h-full p-6 lg:p-7 transition-all duration-500 ${s.glow}`}>
                {/* Step number + icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl ${s.bg} border border-black/5 dark:border-white/5 flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
                    <s.icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <span className="font-heading font-extrabold text-4xl text-slate-900 dark:text-white/10 select-none group-hover:text-slate-900 dark:text-white/20 transition-colors duration-300">
                    {s.step}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">{s.description}</p>

                {/* Detail list */}
                <ul className="space-y-2 mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                  {s.details.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className={`w-4 h-4 ${s.color}`} />
                      {d}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <button className="inline-flex items-center gap-2 px-10 py-4 bg-blue-600 hover:bg-blue-500 rounded-full text-slate-900 dark:text-white font-bold text-base shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] border border-blue-400/20 transition-all duration-300 hover:-translate-y-1">
            Start Screening Now
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="mt-4 text-sm font-medium text-slate-500">No sign-up required • Free to use</p>
        </div>
      </div>
    </section>
  )
}
