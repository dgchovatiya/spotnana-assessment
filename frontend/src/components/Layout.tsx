import { useState, useCallback, useRef } from 'react'
import { Message } from '../types'
import { useChatHistory } from '../hooks/useChatHistory'
import Header from './Header'
import Sidebar from './Sidebar'
import ChatArea from './ChatArea'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatKey, setChatKey] = useState(0)
  const {
    conversations,
    activeConversation,
    activeId,
    createConversation,
    updateMessages,
    selectConversation,
    removeConversation,
    startNewChat,
  } = useChatHistory()

  const handleToggleSidebar = () => setSidebarOpen(prev => !prev)
  const handleCloseSidebar = () => setSidebarOpen(false)

  // Track conversation ID created during current chat session
  const pendingConvIdRef = useRef<string | null>(null)

  const handleMessagesChange = useCallback((messages: Message[]) => {
    if (messages.length === 0) return

    let convId = activeId || pendingConvIdRef.current
    if (!convId) {
      convId = createConversation()
      pendingConvIdRef.current = convId
    }
    updateMessages(convId, messages)
  }, [activeId, createConversation, updateMessages])

  const handleSelectConversation = useCallback((id: string) => {
    pendingConvIdRef.current = null
    selectConversation(id)
    setChatKey(prev => prev + 1)
  }, [selectConversation])

  const handleStartNewChat = useCallback(() => {
    pendingConvIdRef.current = null
    startNewChat()
    setChatKey(prev => prev + 1)
    setSidebarOpen(false)
  }, [startNewChat])

  const initialMessages = activeConversation?.messages || []
  const sidebarActiveId = activeId || pendingConvIdRef.current

  return (
    <div className="h-screen flex flex-col bg-dark-950">
      <Header
        onToggleSidebar={handleToggleSidebar}
        onNewChat={handleStartNewChat}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={handleCloseSidebar}
          conversations={conversations}
          activeId={sidebarActiveId}
          onSelect={handleSelectConversation}
          onDelete={removeConversation}
        />

        <main className="flex-1 flex flex-col overflow-hidden">
          <ChatArea
            key={chatKey}
            initialMessages={initialMessages}
            onMessagesChange={handleMessagesChange}
          />
        </main>
      </div>
    </div>
  )
}
