import { useState, useCallback, useRef } from 'react'
import { Message } from '../types'
import { useChatHistory } from '../hooks/useChatHistory'
import Header from './Header'
import Sidebar from './Sidebar'
import ChatArea from './ChatArea'
import ConfirmDialog from './ConfirmDialog'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatKey, setChatKey] = useState(0)
  const [hasMessages, setHasMessages] = useState(false)
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

  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    title: string
    message: string
    confirmLabel: string
    onConfirm: () => void
  }>({ isOpen: false, title: '', message: '', confirmLabel: '', onConfirm: () => {} })

  const closeDialog = () => setConfirmDialog(prev => ({ ...prev, isOpen: false }))

  const handleToggleSidebar = () => setSidebarOpen(prev => !prev)
  const handleCloseSidebar = () => setSidebarOpen(false)

  const pendingConvIdRef = useRef<string | null>(null)

  const handleMessagesChange = useCallback((messages: Message[]) => {
    if (messages.length === 0) return
    setHasMessages(true)

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
    setHasMessages(true)
    setChatKey(prev => prev + 1)
  }, [selectConversation])

  const doStartNewChat = useCallback(() => {
    pendingConvIdRef.current = null
    startNewChat()
    setHasMessages(false)
    setChatKey(prev => prev + 1)
    setSidebarOpen(false)
  }, [startNewChat])

  const handleStartNewChat = useCallback(() => {
    doStartNewChat()
  }, [doStartNewChat])

  const handleClearChat = useCallback(() => {
    setConfirmDialog({
      isOpen: true,
      title: 'Clear conversation',
      message: 'This will clear the current conversation. This action cannot be undone.',
      confirmLabel: 'Clear',
      onConfirm: () => {
        const convId = activeId || pendingConvIdRef.current
        if (convId) {
          removeConversation(convId)
        }
        doStartNewChat()
        closeDialog()
      },
    })
  }, [activeId, removeConversation, doStartNewChat])

  const handleDeleteConversation = useCallback((id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete conversation',
      message: 'Are you sure you want to delete this conversation? This action cannot be undone.',
      confirmLabel: 'Delete',
      onConfirm: () => {
        const isActive = id === activeId || id === pendingConvIdRef.current
        removeConversation(id)
        if (isActive) {
          doStartNewChat()
        }
        closeDialog()
      },
    })
  }, [activeId, removeConversation, doStartNewChat])

  const initialMessages = activeConversation?.messages || []
  const sidebarActiveId = activeId || pendingConvIdRef.current

  return (
    <div className="h-screen flex flex-col bg-dark-950">
      <Header
        onToggleSidebar={handleToggleSidebar}
        onNewChat={handleStartNewChat}
        onClearChat={handleClearChat}
        hasMessages={hasMessages}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={handleCloseSidebar}
          conversations={conversations}
          activeId={sidebarActiveId}
          onSelect={handleSelectConversation}
          onDelete={handleDeleteConversation}
        />

        <main className="flex-1 flex flex-col overflow-hidden">
          <ChatArea
            key={chatKey}
            initialMessages={initialMessages}
            onMessagesChange={handleMessagesChange}
          />
        </main>
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmLabel={confirmDialog.confirmLabel}
        onConfirm={confirmDialog.onConfirm}
        onCancel={closeDialog}
      />
    </div>
  )
}
