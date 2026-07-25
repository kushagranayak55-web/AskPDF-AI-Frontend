import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import ChatArea from '../components/ChatArea'
import { useChat } from '../hooks/useChat'
import { newPDF } from '../services/api'

export default function ChatPage({ pdfName, onNewPDF, onError }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { messages, isThinking, sendMessage } = useChat(onError)

  const handleNewPDF = async () => {
    try {
      await newPDF()
    } catch (err) {
      // Non-blocking: still let the user start a fresh upload locally.
      onError('Could not fully reset the previous session, but you can upload a new PDF.')
    } finally {
      onNewPDF()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex h-screen w-full flex-col md:flex-row"
    >
      <Sidebar
        pdfName={pdfName}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((v) => !v)}
        onNewPDF={handleNewPDF}
      />
      <ChatArea messages={messages} isThinking={isThinking} onSend={sendMessage} pdfName={pdfName} />
    </motion.div>
  )
}
