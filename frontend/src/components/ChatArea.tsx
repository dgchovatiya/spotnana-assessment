import { useState } from 'react'
import { Message } from '../types'
import ChatMessages from './ChatMessages'
import PromptInput from './PromptInput'

export default function ChatArea() {
  const [messages, setMessages] = useState<Message[]>([])

  const handleSend = (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: Date.now(),
    }
    setMessages(prev => [...prev, userMessage])
  }

  return (
    <div className="flex-1 flex flex-col bg-dark-950">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-dark-100 mb-2">
              Trip<span className="text-primary-500">Assist</span> AI
            </h2>
            <p className="text-dark-400 max-w-md">
              Your corporate travel assistant. Ask me anything about travel policies, visa requirements, flight options, and more.
            </p>
          </div>
        </div>
      ) : (
        <ChatMessages messages={messages} />
      )}

      <PromptInput onSend={handleSend} />
    </div>
  )
}
