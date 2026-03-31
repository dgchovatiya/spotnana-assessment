import { Conversation } from '../types'

const STORAGE_KEY = 'tripassist_conversations'

export function getConversations(): Conversation[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveConversation(conversation: Conversation): void {
  try {
    const conversations = getConversations()
    const index = conversations.findIndex(c => c.id === conversation.id)

    if (index >= 0) {
      conversations[index] = conversation
    } else {
      conversations.unshift(conversation)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations))
  } catch {
    // localStorage quota exceeded — silently fail
  }
}

export function deleteConversation(id: string): void {
  try {
    const conversations = getConversations().filter(c => c.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations))
  } catch {
    // silently fail
  }
}

export function clearAllConversations(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // silently fail
  }
}
