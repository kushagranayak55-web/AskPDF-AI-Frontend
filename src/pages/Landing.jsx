import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from '../components/Logo'
import UploadCard from '../components/UploadCard'
import UploadProgress from '../components/UploadProgress'
import { uploadPDF } from '../services/api'

const STEP_COUNT = 4 // Uploading, Embeddings, Preparing, Ready

export default function Landing({ onReady, onError }) {
  const [isUploading, setIsUploading] = useState(false)
  const [step, setStep] = useState(0)

  const handleFileSelected = async (file) => {
    setIsUploading(true)
    setStep(0)

    try {
      // Step 1: Uploading
      const uploadPromise = uploadPDF(file, (percent) => {
        if (percent >= 100) setStep(1)
      })

      // Give the "Creating Embeddings..." step a moment to feel real
      // while the actual request (which includes embedding on the backend) resolves.
      const stepTimer = setTimeout(() => setStep(2), 1400)

      const { data } = await uploadPromise
      clearTimeout(stepTimer)

      setStep(3)
      await new Promise((r) => setTimeout(r, 600))

      onReady(data?.filename || file.name)
    } catch (err) {
      setIsUploading(false)
      setStep(0)
      onError('Upload failed. Please check your file and try again.')
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" />

      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center"
      >
        <Logo size="lg" />

        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
          RAGMind <span className="gradient-text">AI</span>
        </h1>

        <p className="mt-3 max-w-md text-center text-[15px] text-slate-400">
          Chat with your PDF using Retrieval-Augmented Generation.
        </p>
      </motion.div>

      <div className="relative z-10 mt-10 flex w-full max-w-lg items-center justify-center">
        <AnimatePresence mode="wait">
          {!isUploading ? (
            <UploadCard key="upload" onFileSelected={handleFileSelected} />
          ) : (
            <UploadProgress key="progress" currentStep={step} />
          )}
        </AnimatePresence>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 mt-12 text-xs text-slate-600"
      >
        Made by <span className="text-slate-500">Kushagra Nayak</span>
      </motion.p>
    </div>
  )
}
