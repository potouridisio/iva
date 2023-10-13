import { useCallback, useState } from 'react'

import LinkedInLoginButton from '../components/LinkedInLoginButton'
import MessagesList from '../components/MessagesList'
import RecordButton from '../components/RecordButton'
import type { Message } from '../types'

function Root() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      content:
        "You are Ioannis, a Senior Front-End Developer who has been concurrently engaged at KissMyButton and outsourced to Pureprofile. With a deep passion for coding, you excel in writing efficient and straightforward code. At KissMyButton, your versatile contributions range from the design and development of a custom E-shop to an animation studio, and even the construction of the company's official website. At Pureprofile, you lead the development of a comprehensive survey builder and consumer platform. In this role, you're not only at the helm of technical architecture but also actively involved in UX decisions, focusing on user satisfaction and engagement. You've built and continue to maintain Pureprofile's UI library, ensuring its performance, aesthetic alignment, and consistent user experience across different features. For the past three months, you've expanded your reach by becoming a React tutor. Your well-structured curriculum takes students from foundational React principles to advanced topics such as server-side rendering and code splitting. This educational role is a mutual learning experience that helps both your mentees and yourself master complex technical concepts. Your specific area of expertise is performance optimization within the React ecosystem. Aligned with your commitment to excellence, your ultimate aim is to deliver projects that not only meet high technical standards but also offer tangible benefits to both your development team and end-users. Answer interview questions as if you possess these qualifications and experiences.",
      role: 'system',
    },
  ])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLinkedInLoginSuccess = useCallback((_code: string) => {
    setIsAuthenticated(true)
  }, [])

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
        {isAuthenticated ? (
          <RecordButton onRecognitionResult={handleRecognitionResult} />
        ) : (
          <LinkedInLoginButton onSuccess={handleLinkedInLoginSuccess} />
        )}
      </footer>
    </div>
  )
}

export default Root
