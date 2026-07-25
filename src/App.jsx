import { AnimatePresence } from 'framer-motion'
import Landing from './pages/Landing'
import ChatPage from './pages/ChatPage'
import ToastContainer from './components/ToastContainer'
import { useToast } from './hooks/useToast'
import { useState } from 'react'

export default function App() {
  const [pdfName, setPdfName] = useState(null)
  const { toasts, showToast, dismiss } = useToast()

  const handleReady = (filename) => setPdfName(filename)
  const handleNewPDF = () => setPdfName(null)
  const handleError = (message) => showToast(message, 'error')

  return (
    <div className="min-h-screen w-full bg-base">
      <ToastContainer toasts={toasts} onDismiss={dismiss} />

      <AnimatePresence mode="wait">
        {!pdfName ? (
          <Landing key="landing" onReady={handleReady} onError={handleError} />
        ) : (
          <ChatPage key="chat" pdfName={pdfName} onNewPDF={handleNewPDF} onError={handleError} />
        )}
      </AnimatePresence>
    </div>
  )
}
