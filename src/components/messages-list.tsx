import { useAtom } from 'jotai'
import OpenAI from 'openai'
import type { Stream } from 'openai/streaming'
import { useEffect, useRef, useState } from 'react'

import { interimTranscriptAtom } from '@/store'
import type { Message } from '@/types'

import ChatBubble from './chat-bubble'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

type MessagesListProps = {
  messages: Message[]
  onStreamStop: (content: string) => void
}

function MessagesList({ messages, onStreamStop }: MessagesListProps) {
  const [interimTranscript] = useAtom(interimTranscriptAtom)
  const stream =
    useRef<null | Stream<OpenAI.Chat.Completions.ChatCompletionChunk>>(null)
  const timeoutID = useRef(0)
  const [streamedContent, setStreamedContent] = useState('')

  useEffect(() => {
    if (messages.length === 0) return

    const lastMessage = messages[messages.length - 1]

    if (lastMessage.role !== 'user') return

    async function create() {
      stream.current = await openai.chat.completions.create({
        messages,
        model: 'gpt-3.5-turbo',
        stream: true,
      })

      let streamedContent = ''

      for await (const chunk of stream.current) {
        const content = chunk.choices[0].delta.content || ''

        streamedContent += content

        if (chunk.choices[0].finish_reason === 'stop') {
          setStreamedContent('')

          onStreamStop(streamedContent)

          break
        }

        setStreamedContent(streamedContent)
      }
    }

    function delayedCreate() {
      timeoutID.current = window.setTimeout(create, 2 * 1000)
    }

    delayedCreate()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  useEffect(() => {
    if (!interimTranscript) return

    stream.current?.controller.abort()

    window.clearTimeout(timeoutID.current)

    setStreamedContent('')
  }, [interimTranscript])

  return (
    <ul className="space-y-4">
      {messages.slice(1).map((message, index) => {
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
      {interimTranscript && (
        <li className="flex">
          <ChatBubble content={interimTranscript} variant="received" />
        </li>
      )}
      {streamedContent && (
        <li className="flex flex-row-reverse">
          <ChatBubble content={streamedContent} variant="sent" />
        </li>
      )}
    </ul>
  )
}

export default MessagesList
