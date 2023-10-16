import { cn } from '@/lib/utils'

type ChatBubbleProps = {
  content: null | string
  variant: 'received' | 'sent'
}

function ChatBubble({ content, variant }: ChatBubbleProps) {
  const isSent = variant === 'sent'

  return (
    <div
      className={cn(
        'max-w-3/5 rounded-2xl bg-white p-4',
        !isSent && 'rounded-tl-none',
        isSent && 'rounded-br-none bg-blue-500 text-white'
      )}
    >
      <p>{content}</p>
    </div>
  )
}

export default ChatBubble
