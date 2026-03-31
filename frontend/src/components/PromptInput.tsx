import { useState, useRef, useEffect, KeyboardEvent } from 'react'

interface PromptInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export default function PromptInput({ onSend, disabled = false }: PromptInputProps) {
  const [input, setInput] = useState('')
  const [shake, setShake] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!disabled) {
      textareaRef.current?.focus()
    }
  }, [disabled])

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`
    }
  }, [input])

  const handleSend = () => {
    const trimmed = input.trim()
    if (disabled) return
    if (!trimmed) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      textareaRef.current?.focus()
      return
    }
    onSend(trimmed)
    setInput('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const canSend = input.trim().length > 0 && !disabled

  return (
    <div className="border-t border-dark-700 bg-dark-900 px-4 py-3">
      <div className="max-w-3xl mx-auto">
        <div className={`flex items-end gap-3 bg-dark-800 border border-dark-600 rounded-2xl px-4 py-2 focus-within:border-primary-500 transition-colors ${shake ? 'animate-[shake_0.4s_ease-in-out] border-red-500/50' : ''}`}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about travel policies, visa requirements, flights..."
            disabled={disabled}
            rows={1}
            className="flex-1 bg-transparent text-dark-100 placeholder-dark-500 text-sm resize-none outline-none py-1.5 max-h-[150px] disabled:opacity-50"
          />

          <button
            onClick={handleSend}
            disabled={!canSend}
            className={`p-2 rounded-xl transition-all shrink-0 ${
              canSend
                ? 'bg-primary-600 hover:bg-primary-700 text-white'
                : disabled
                  ? 'bg-primary-600/50 text-white/50 cursor-wait'
                  : 'bg-dark-700 text-dark-500 cursor-not-allowed'
            }`}
            aria-label={disabled ? 'Generating response...' : 'Send message'}
          >
            {disabled ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" />
              </svg>
            )}
          </button>
        </div>

        <p className="text-[11px] text-dark-600 text-center mt-2">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}
