import OpenAI from 'openai'
import { useEffect, useState } from 'react'

import ChatBubble from './ChatBubble'
import type { Message } from './types'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

type MessagesListProps = {
  messages: Message[]
  onStreamStop: (content: string) => void
}

function MessagesList({ messages, onStreamStop }: MessagesListProps) {
  const [content, setContent] = useState('')

  useEffect(() => {
    if (messages.length === 0) return

    const lastMessage = messages[messages.length - 1]

    if (lastMessage.role !== 'user') return

    async function create() {
      const stream = await openai.chat.completions.create({
        messages,
        model: 'gpt-3.5-turbo',
        stream: true,
      })

      let content = ''

      for await (const chunk of stream) {
        const nextContent = chunk.choices[0].delta.content || ''

        content += nextContent

        if (chunk.choices[0].finish_reason === 'stop') {
          setContent('')

          onStreamStop(content)

          break
        }

        setContent(content)
      }
    }

    create()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  return (
    <ul className="space-y-4">
      {messages.map((message, index) => {
        const isYou = message.role === 'assistant'

        return (
          <li className={`flex${isYou ? ' flex-row-reverse' : ''}`} key={index}>
            <ChatBubble
              content={message.content}
              variant={isYou ? 'sent' : 'received'}
            />
          </li>
        )
      })}
      {content && (
        <li className="flex flex-row-reverse">
          <ChatBubble content={content} variant="sent" />
        </li>
      )}
    </ul>
  )
}

export default MessagesList
