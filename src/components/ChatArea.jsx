import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageSquareText } from 'lucide-react'
import MessageBubble from './MessageBubble'
import ThinkingIndicator from './ThinkingIndicator'
import ChatInput from './ChatInput'

export default function ChatArea({ messages, isThinking, onSend, pdfName }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isThinking])

  return (
    <div className="flex h-full min-w-0 flex-1 flex-col">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 py-8">
          {messages.length === 0 && !isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center gap-3 py-24 text-center"
            >
              <div className="glass flex h-14 w-14 items-center justify-center rounded-2xl">
                <MessageSquareText size={22} className="text-accent-blue" />
              </div>
              <h2 className="font-display text-lg font-medium text-slate-200">Ask anything about your PDF</h2>
              <p className="max-w-sm text-sm text-slate-500">
                {pdfName ? `${pdfName} is ready.` : 'Your document is ready.'} Try asking for a summary, a
                definition, or a specific detail from the document.
              </p>
            </motion.div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <MessageBubble key={m.id} role={m.role} content={m.content} />
            ))}
          </AnimatePresence>

          <AnimatePresence>{isThinking && <ThinkingIndicator />}</AnimatePresence>
        </div>
      </div>

      <div className="px-4 sm:px-8">
        <ChatInput onSend={onSend} disabled={isThinking} />
      </div>
    </div>
  )
}
