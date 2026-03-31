import { useEffect, useRef } from 'react'
import { Message } from '../types'
import { useChat } from '../hooks/useChat'
import ChatMessages from './ChatMessages'
import PromptInput from './PromptInput'
import WelcomeScreen from './WelcomeScreen'
import ErrorMessage from './ErrorMessage'

interface ChatAreaProps {
  initialMessages?: Message[]
  onMessagesChange?: (messages: Message[]) => void
}

export default function ChatArea({ initialMessages = [], onMessagesChange }: ChatAreaProps) {
  const { messages, isLoading, error, send, retry, clearError } = useChat(initialMessages)
  const onMessagesChangeRef = useRef(onMessagesChange)
  onMessagesChangeRef.current = onMessagesChange

  const prevLengthRef = useRef(messages.length)
  useEffect(() => {
    if (messages.length !== prevLengthRef.current) {
      prevLengthRef.current = messages.length
      onMessagesChangeRef.current?.(messages)
    }
  }, [messages])

  return (
    <div className="flex-1 flex flex-col bg-dark-950 min-h-0 overflow-hidden">
      {messages.length === 0 ? (
        <WelcomeScreen onSelectQuestion={send} />
      ) : (
        <ChatMessages messages={messages} isLoading={isLoading} />
      )}

      {error && (
        <ErrorMessage
          message={error}
          onRetry={retry}
          onDismiss={clearError}
        />
      )}

      <PromptInput onSend={send} disabled={isLoading} />
    </div>
  )
}
