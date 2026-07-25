import { motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'

const STEPS = ['Uploading PDF...', 'Creating Embeddings...', 'Preparing AI...', 'Database Ready']

export default function UploadProgress({ currentStep }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      className="glass-strong w-full max-w-md rounded-2xl p-8 shadow-card"
    >
      <div className="space-y-5">
        {STEPS.map((label, i) => {
          const isDone = i < currentStep
          const isActive = i === currentStep

          return (
            <div key={label} className="flex items-center gap-3">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                  isDone
                    ? 'border-transparent bg-brand-gradient'
                    : isActive
                    ? 'border-accent-purple/60 bg-white/5'
                    : 'border-white/10 bg-transparent'
                }`}
              >
                {isDone ? (
                  <Check size={14} className="text-white" strokeWidth={3} />
                ) : isActive ? (
                  <Loader2 size={14} className="animate-spin text-accent-purple" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
                )}
              </div>

              <span
                className={`text-sm transition-colors duration-300 ${
                  isDone ? 'text-slate-300' : isActive ? 'text-slate-100 font-medium' : 'text-slate-600'
                }`}
              >
                {label}
              </span>

              {isDone && <Check size={14} className="ml-auto text-emerald-400" />}
            </div>
          )
        })}
      </div>

      <div className="mt-7 h-1 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full bg-brand-gradient"
          animate={{ width: `${Math.min(((currentStep + 1) / STEPS.length) * 100, 100)}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}
