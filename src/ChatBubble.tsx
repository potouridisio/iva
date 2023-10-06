type ChatBubbleProps = {
  content: string | null
} & {
  variant: 'sent' | 'received'
}

function ChatBubble({ variant, content }: ChatBubbleProps) {
  const isSent = variant === 'sent'

  return (
    <div
      className={`max-w-3/5 rounded-2xl ${
        isSent ? 'rounded-br-none bg-blue-500' : 'rounded-tl-none bg-white'
      } p-4${isSent ? ' text-white' : ''}`}
    >
      <p>{content}</p>
    </div>
  )
}

export default ChatBubble
