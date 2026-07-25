# RAGMind AI — Frontend

Chat with your PDF using Retrieval-Augmented Generation.
Made by Kushagra Nayak.

This is the **frontend only**. It expects your existing backend to be running
at `http://localhost:8000` (change this in `src/services/api.js` if needed)
and to expose:

- `GET /health`
- `POST /upload` — multipart/form-data, field name `file`
- `POST /chat` — JSON body `{ "message": string }`, expects `{ "answer": string }`
  in the response (also falls back to `response` / `message` keys)
- `DELETE /new-pdf`

## Setup

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Notes on response shapes

- `POST /upload` — the UI reads `data.filename` to show the PDF name in the
  sidebar; if your backend returns a different key, update `Landing.jsx`.
- `POST /chat` — the UI reads `data.answer` first, falling back to
  `data.response` / `data.message`. Update `useChat.js` if your backend uses
  a different field.

## Structure

```
src/
  components/   Reusable UI pieces (Sidebar, ChatArea, MessageBubble, etc.)
  pages/        Landing (upload) and ChatPage (conversation) screens
  hooks/        useChat, useToast
  services/     api.js — all Axios calls, no backend logic
```
