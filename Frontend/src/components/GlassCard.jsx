import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative bg-slate-50 dark:bg-[#0a0a14]/60 backdrop-blur-xl border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden border-glow ${className}`}
      {...props}
    >
      {/* Top subtle highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
      {children}
    </motion.div>
  )
}
