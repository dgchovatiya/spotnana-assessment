import { useState, useCallback, useEffect } from 'react'
import { Conversation, Message } from '../types'
import { getConversations, saveConversation, deleteConversation } from '../services/storage'

export function useChatHistory() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    setConversations(getConversations())
  }, [])

  const activeConversation = conversations.find(c => c.id === activeId) || null

  const createConversation = useCallback((): string => {
    const id = crypto.randomUUID()
    const conversation: Conversation = {
      id,
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    saveConversation(conversation)
    setConversations(prev => [conversation, ...prev])
    setActiveId(id)
    return id
  }, [])

  const updateMessages = useCallback((id: string, messages: Message[]) => {
    setConversations(prev => {
      const updated = prev.map(c => {
        if (c.id !== id) return c

        const title = messages.length > 0
          ? messages[0].content.slice(0, 40) + (messages[0].content.length > 40 ? '...' : '')
          : 'New Chat'

        const updatedConv = { ...c, messages, title, updatedAt: Date.now() }
        saveConversation(updatedConv)
        return updatedConv
      })

      return updated
    })
  }, [])

  const selectConversation = useCallback((id: string) => {
    setActiveId(id)
  }, [])

  const removeConversation = useCallback((id: string) => {
    deleteConversation(id)
    setConversations(prev => prev.filter(c => c.id !== id))
    if (activeId === id) {
      setActiveId(null)
    }
  }, [activeId])

  const startNewChat = useCallback(() => {
    setActiveId(null)
  }, [])

  return {
    conversations,
    activeConversation,
    activeId,
    createConversation,
    updateMessages,
    selectConversation,
    removeConversation,
    startNewChat,
  }
}
