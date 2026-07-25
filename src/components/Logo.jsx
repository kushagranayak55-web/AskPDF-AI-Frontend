import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function Logo({ size = 'lg' }) {
  const dims = size === 'lg' ? 'w-20 h-20' : 'w-9 h-9'
  const iconDims = size === 'lg' ? 22 : 16

  return (
    <motion.div
      className={`relative ${dims} shrink-0`}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 rounded-2xl bg-brand-gradient blur-xl opacity-60 animate-pulse-glow" />
      <div className="relative flex h-full w-full items-center justify-center rounded-2xl bg-brand-gradient shadow-glow">
        <Sparkles size={iconDims} className="text-white" strokeWidth={2.25} />
      </div>
    </motion.div>
  )
}
