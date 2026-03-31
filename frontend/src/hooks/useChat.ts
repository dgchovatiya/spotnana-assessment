import { useState, useCallback, useRef } from 'react'
import { Message } from '../types'
import { sendMessage } from '../services/api'

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesRef = useRef<Message[]>([])

  const send = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: Date.now(),
    }

    const updatedMessages = [...messagesRef.current, userMessage]
    messagesRef.current = updatedMessages
    setMessages(updatedMessages)
    setIsLoading(true)
    setError(null)

    try {
      const apiMessages = updatedMessages.map(m => ({
        role: m.role,
        content: m.content,
      }))

      const response = await sendMessage(apiMessages)

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      }

      const withResponse = [...updatedMessages, assistantMessage]
      messagesRef.current = withResponse
      setMessages(withResponse)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearMessages = useCallback(() => {
    messagesRef.current = []
    setMessages([])
    setError(null)
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { messages, isLoading, error, send, clearError, clearMessages }
}
