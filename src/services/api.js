import axios from 'axios'

// Backend is assumed to already exist and run here.
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
})

/**
 * GET /health
 * Checks whether the backend + vector DB are alive.
 */
export const health = () => client.get('/health')

/**
 * POST /upload
 * Uploads a PDF file (multipart/form-data) and returns embedding status.
 * @param {File} file
 * @param {(percent: number) => void} onProgress
 */
export const uploadPDF = (file, onProgress) => {
  const formData = new FormData()
  formData.append('file', file)

  return client.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (event) => {
      if (onProgress && event.total) {
        onProgress(Math.round((event.loaded * 100) / event.total))
      }
    },
  })
}

/**
 * POST /chat
 * Sends a user question and returns the assistant's answer.
 * @param {string} message
 */
export const chat = (message) => client.post('/chat', { message })

/**
 * DELETE /new-pdf
 * Clears the current PDF / vector store session so a new one can be uploaded.
 */
export const newPDF = () => client.delete('/new-pdf')

export default { health, uploadPDF, chat, newPDF }
