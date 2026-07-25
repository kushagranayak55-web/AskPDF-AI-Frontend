import { motion } from 'framer-motion'

const dotVariants = {
  animate: (i) => ({
    y: [0, -6, 0],
    transition: { duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' },
  }),
}

export default function ThinkingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      className="glass flex w-fit items-center gap-3 rounded-2xl rounded-tl-sm px-4 py-3 shadow-card"
    >
      <span className="text-sm text-slate-400">Thinking</span>
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            custom={i}
            variants={dotVariants}
            animate="animate"
            className="h-1.5 w-1.5 rounded-full bg-brand-gradient"
          />
        ))}
      </div>
    </motion.div>
  )
}
