interface HeaderProps {
  onToggleSidebar: () => void
  onNewChat: () => void
}

export default function Header({ onToggleSidebar, onNewChat }: HeaderProps) {
  return (
    <header className="h-14 bg-dark-900 border-b border-dark-700 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-dark-700 text-dark-300 hover:text-dark-100 transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <h1 className="text-lg font-semibold text-dark-100">
            Trip<span className="text-primary-500">Assist</span>
          </h1>
        </div>
      </div>

      <button
        onClick={onNewChat}
        className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="hidden sm:inline">New Chat</span>
      </button>
    </header>
  )
}
