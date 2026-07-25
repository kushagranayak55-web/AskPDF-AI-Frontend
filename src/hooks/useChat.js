import { useCallback, useState } from 'react'
import { chat as chatRequest } from '../services/api'

export function useChat(onError) {
  const [messages, setMessages] = useState([])
  const [isThinking, setIsThinking] = useState(false)

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim()
      if (!trimmed || isThinking) return

      const userMessage = { id: crypto.randomUUID(), role: 'user', content: trimmed }
      setMessages((prev) => [...prev, userMessage])
      setIsThinking(true)

      try {
        const { data } = await chatRequest(trimmed)
        const answer = data?.answer ?? data?.response ?? data?.message ?? ''
        const assistantMessage = { id: crypto.randomUUID(), role: 'assistant', content: answer }
        setMessages((prev) => [...prev, assistantMessage])
      } catch (err) {
        onError?.('Something went wrong while getting a response. Please try again.')
      } finally {
        setIsThinking(false)
      }
    },
    [isThinking, onError]
  )

  const resetChat = useCallback(() => {
    setMessages([])
    setIsThinking(false)
  }, [])

  return { messages, isThinking, sendMessage, resetChat }
}
