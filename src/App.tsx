import { useCallback, useState } from 'react'

import MessagesList from './MessagesList'
import RecordButton from './RecordButton'
import type { Message } from './types'

function App() {
  const [messages, setMessages] = useState<Message[]>([])

  const handleRecognitionResult = useCallback((transcript: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: transcript.trim(), role: 'user' },
    ])
  }, [])

  const handleStreamStop = useCallback((content: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { content, role: 'assistant' },
    ])
  }, [])

  return (
    <div className="flex h-screen flex-col bg-neutral-200">
      <header className="sticky top-0 flex justify-center bg-white p-4">
        <h1 className="text-2xl font-bold">Iva</h1>
      </header>

      <main className="flex grow flex-col-reverse overflow-y-auto p-4">
        <MessagesList messages={messages} onStreamStop={handleStreamStop} />
      </main>

      <footer className="sticky bottom-0 flex justify-center bg-white p-4">
        <RecordButton onRecognitionResult={handleRecognitionResult} />
      </footer>
    </div>
  )
}

export default App
