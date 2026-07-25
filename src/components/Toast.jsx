import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, X } from 'lucide-react'

export default function Toast({ toast, onDismiss }) {
  const isError = toast.type === 'error'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="glass-strong flex w-80 items-start gap-3 rounded-xl p-4 shadow-card"
    >
      {isError ? (
        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-rose-400" />
      ) : (
        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
      )}
      <p className="flex-1 text-sm leading-snug text-slate-200">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 rounded-md p-0.5 text-slate-500 transition-colors hover:text-slate-200"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </motion.div>
  )
}
