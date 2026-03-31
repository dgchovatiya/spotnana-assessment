export default function TypingIndicator() {
  return (
    <div className="flex gap-3 flex-row">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-dark-700">
        <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </div>

      {/* Typing bubble */}
      <div className="bg-dark-800 border border-dark-700 rounded-2xl rounded-bl-md px-5 py-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
        <p className="text-dark-500 text-xs mt-2">TripAssist is thinking...</p>
      </div>
    </div>
  )
}
