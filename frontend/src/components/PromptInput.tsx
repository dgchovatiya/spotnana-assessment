import { useState, useRef, useEffect, KeyboardEvent } from 'react'

interface PromptInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export default function PromptInput({ onSend, disabled = false }: PromptInputProps) {
  const [input, setInput] = useState('')
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
    if (!trimmed || disabled) return
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
        <div className="flex items-end gap-3 bg-dark-800 border border-dark-600 rounded-2xl px-4 py-2 focus-within:border-primary-500 transition-colors">
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
                : 'bg-dark-700 text-dark-500 cursor-not-allowed'
            }`}
            aria-label="Send message"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" />
            </svg>
          </button>
        </div>

        <p className="text-[11px] text-dark-600 text-center mt-2">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}
