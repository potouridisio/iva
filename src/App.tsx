import RecordButton from './RecordButton'
import MessagesList from './MessagesList'
import { useState, useCallback } from 'react'
import type { Message } from './types'

function App() {
  const [messages, setMessages] = useState<Message[]>([])

  const handleRecognitionResult = useCallback((transcript: string) => {
    setMessages((prev) => [
      ...prev,
      {
        content: transcript.trim(),
        role: 'user',
      },
    ])
  }, [])

  return (
    <div className="flex h-screen flex-col bg-neutral-200">
      <header className="sticky top-0 flex justify-center bg-white p-4">
        <h1 className="text-2xl font-bold">Iva</h1>
      </header>
      <main className="flex grow flex-col-reverse overflow-y-auto p-4">
        <MessagesList messages={messages} />
      </main>
      <footer className="sticky bottom-0 flex justify-center bg-white p-4">
        <RecordButton onRecognitionResult={handleRecognitionResult} />
      </footer>
    </div>
  )
}

export default App
