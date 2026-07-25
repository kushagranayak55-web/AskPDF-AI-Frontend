import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Menu, PlusCircle, X } from 'lucide-react'
import Logo from './Logo'

export default function Sidebar({ pdfName, isOpen, onToggle, onNewPDF }) {
  return (
    <>
      {/* Mobile top bar */}
      <div className="glass-strong flex items-center justify-between px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <Logo size="sm" />
          <span className="font-display text-sm font-semibold text-slate-100">RAGMind AI</span>
        </div>
        <button onClick={onToggle} className="rounded-lg p-2 text-slate-300 hover:bg-white/5" aria-label="Toggle menu">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar panel */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 34 }}
        className="glass-strong fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/[0.06] p-5 md:static md:z-0 md:flex md:translate-x-0 md:w-72"
      >
        <div className="hidden items-center gap-3 md:flex">
          <Logo size="sm" />
          <div>
            <p className="font-display text-sm font-semibold leading-tight text-slate-100">RAGMind AI</p>
            <p className="text-xs text-slate-500">RAG Assistant</p>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="font-display text-sm font-semibold text-slate-100">RAGMind AI</span>
          </div>
          <button onClick={onToggle} className="rounded-lg p-1.5 text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="mt-8 flex-1 space-y-4">
          <p className="px-1 text-xs font-medium uppercase tracking-wider text-slate-500">Document</p>

          <div className="glass rounded-xl p-3.5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-gradient-soft">
                <FileText size={16} className="text-accent-blue" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-200" title={pdfName}>
                  {pdfName || 'Untitled.pdf'}
                </p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-xs text-emerald-400">Database Ready</span>
                </div>
              </div>
            </div>
          </div>

          <button onClick={onNewPDF} className="btn-ghost w-full">
            <PlusCircle size={16} />
            New PDF
          </button>
        </div>

        <div className="border-t border-white/[0.06] pt-4">
          <p className="text-xs text-slate-600">
            Made by <span className="text-slate-400">Kushagra Nayak</span>
          </p>
        </div>
      </motion.aside>
    </>
  )
}
