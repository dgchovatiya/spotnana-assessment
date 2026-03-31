import { useState, useCallback, useRef } from 'react'
import { Message } from '../types'
import { sendMessage } from '../services/api'

export function useChat(initialMessages: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesRef = useRef<Message[]>(initialMessages)
  const lastFailedContentRef = useRef<string | null>(null)

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
    lastFailedContentRef.current = null

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
      lastFailedContentRef.current = content
    } finally {
      setIsLoading(false)
    }
  }, [])

  const retry = useCallback(async () => {
    if (!lastFailedContentRef.current) return

    // Remove the last user message that failed
    const withoutLast = messagesRef.current.slice(0, -1)
    messagesRef.current = withoutLast
    setMessages(withoutLast)
    setError(null)

    // Re-send
    const content = lastFailedContentRef.current
    lastFailedContentRef.current = null
    await send(content)
  }, [send])

  const clearMessages = useCallback(() => {
    messagesRef.current = []
    setMessages([])
    setError(null)
    lastFailedContentRef.current = null
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { messages, isLoading, error, send, retry, clearError, clearMessages }
}
