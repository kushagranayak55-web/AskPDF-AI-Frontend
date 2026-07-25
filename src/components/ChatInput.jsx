import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim() || disabled) return
    onSend(value)
    setValue('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInput = (e) => {
    setValue(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`
  }

  return (
    <div className="sticky bottom-0 w-full bg-gradient-to-t from-base via-base/95 to-transparent pb-4 pt-6 sm:pb-6">
      <form
        onSubmit={handleSubmit}
        className="glass-strong mx-auto flex w-full max-w-3xl items-end gap-2 rounded-2xl p-2 shadow-card focus-within:border-white/20"
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={disabled ? 'Waiting for a response…' : 'Ask something about your PDF…'}
          className="max-h-40 flex-1 resize-none bg-transparent px-3 py-2.5 text-[15px] text-slate-100 placeholder:text-slate-500 focus:outline-none disabled:opacity-50"
        />
        <motion.button
          type="submit"
          disabled={disabled || !value.trim()}
          whileHover={{ scale: value.trim() && !disabled ? 1.05 : 1 }}
          whileTap={{ scale: value.trim() && !disabled ? 0.95 : 1 }}
          className="mb-1 mr-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-glow transition-opacity disabled:opacity-30"
          aria-label="Send message"
        >
          <ArrowUp size={18} strokeWidth={2.5} />
        </motion.button>
      </form>
      <p className="mt-2 text-center text-xs text-slate-600">RAGMind AI can make mistakes. Verify important answers.</p>
    </div>
  )
}
