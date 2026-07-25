import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FileUp, UploadCloud } from 'lucide-react'

export default function UploadCard({ onFileSelected }) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef(null)

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files?.[0]
      if (file && file.type === 'application/pdf') {
        onFileSelected(file)
      }
    },
    [onFileSelected]
  )

  const handleBrowse = (e) => {
    const file = e.target.files?.[0]
    if (file) onFileSelected(file)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className="relative w-full max-w-lg"
    >
      <div
        className={`absolute -inset-px rounded-2xl bg-brand-gradient opacity-0 blur-md transition-opacity duration-500 ${
          isDragging ? 'opacity-70' : 'opacity-30'
        }`}
      />
      <div
        className={`glass relative flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed px-8 py-12 text-center transition-colors duration-300 ${
          isDragging ? 'border-accent-purple/70 bg-white/[0.04]' : 'border-white/10'
        }`}
      >
        <motion.div
          animate={{ y: isDragging ? -4 : 0 }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient-soft"
        >
          {isDragging ? (
            <FileUp size={24} className="text-accent-purple" />
          ) : (
            <UploadCloud size={24} className="text-accent-blue" />
          )}
        </motion.div>

        <div>
          <p className="text-sm font-medium text-slate-200">Drag & drop your PDF here</p>
          <p className="mt-1 text-xs text-slate-500">or click below to browse from your device</p>
        </div>

        <button type="button" onClick={() => inputRef.current?.click()} className="btn-primary">
          Browse Files
        </button>

        <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={handleBrowse} />
      </div>
    </motion.div>
  )
}
