import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import ChatArea from './ChatArea'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleToggleSidebar = () => setSidebarOpen(prev => !prev)
  const handleCloseSidebar = () => setSidebarOpen(false)
  const handleNewChat = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="h-screen flex flex-col bg-dark-950">
      <Header
        onToggleSidebar={handleToggleSidebar}
        onNewChat={handleNewChat}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={handleCloseSidebar}
        />

        <main className="flex-1 flex flex-col overflow-hidden">
          <ChatArea />
        </main>
      </div>
    </div>
  )
}
