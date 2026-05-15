import { motion } from 'framer-motion'

export default function SectionHeading({ badge, title, highlight, description }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
        >
          <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">{badge}</span>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ delay: 0.1 }}
        className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white leading-tight mb-4"
      >
        {title}{' '}
        {highlight && (
          <span className="text-gradient">
            {highlight}
          </span>
        )}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
