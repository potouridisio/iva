type ChatBubbleProps = {
  content: null | string
  variant: 'received' | 'sent'
}

function ChatBubble({ content, variant }: ChatBubbleProps) {
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
