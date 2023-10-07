import type { Message } from './types'
import ChatBubble from './ChatBubble'

type MessagesListProps = {
  messages: Message[]
}

function MessagesList({ messages }: MessagesListProps) {
  return (
    <ul className="space-y-4">
      {messages.map((message, index) => {
        const isYou = message.role === 'assistant'

        return (
          <li className={`flex${isYou ? ' flex-row-reverse' : ''}`} key={index}>
            <ChatBubble
              variant={isYou ? 'sent' : 'received'}
              content={message.content}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default MessagesList
