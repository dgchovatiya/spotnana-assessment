import { useEffect, useRef } from 'react'
import { Message } from '../types'
import { useChat } from '../hooks/useChat'
import ChatMessages from './ChatMessages'
import PromptInput from './PromptInput'
import WelcomeScreen from './WelcomeScreen'

interface ChatAreaProps {
  initialMessages?: Message[]
  onMessagesChange?: (messages: Message[]) => void
}

export default function ChatArea({ initialMessages = [], onMessagesChange }: ChatAreaProps) {
  const { messages, isLoading, error, send, clearError } = useChat(initialMessages)
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
        <div className="px-4 pb-2">
          <div className="max-w-3xl mx-auto bg-red-900/30 border border-red-700 text-red-200 text-sm rounded-lg px-4 py-2 flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={clearError}
              className="text-red-400 hover:text-red-300 ml-3"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <PromptInput onSend={send} disabled={isLoading} />
    </div>
  )
}
