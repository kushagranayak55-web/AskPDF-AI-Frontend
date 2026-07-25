import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Bot, User } from 'lucide-react'

export default function MessageBubble({ role, content }) {
  const isUser = role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`flex w-full items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          isUser ? 'bg-white/10' : 'bg-brand-gradient shadow-glow'
        }`}
      >
        {isUser ? <User size={15} className="text-slate-300" /> : <Bot size={15} className="text-white" />}
      </div>

      <div
        className={`max-w-[78%] sm:max-w-[70%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
          isUser
            ? 'rounded-tr-sm bg-slate-800/80 text-slate-100 border border-white/[0.05]'
            : 'glass rounded-tl-sm text-slate-200 shadow-card'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{content}</p>
        ) : (
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  )
}
