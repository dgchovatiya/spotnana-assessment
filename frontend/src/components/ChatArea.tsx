import { useChat } from '../hooks/useChat'
import ChatMessages from './ChatMessages'
import PromptInput from './PromptInput'

export default function ChatArea() {
  const { messages, isLoading, error, send, clearError } = useChat()

  return (
    <div className="flex-1 flex flex-col bg-dark-950 min-h-0 overflow-hidden">
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
