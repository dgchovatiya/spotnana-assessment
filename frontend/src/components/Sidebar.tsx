interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-72 bg-dark-900 border-r border-dark-700
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        <div className="p-4 border-b border-dark-700">
          <h2 className="text-sm font-semibold text-dark-400 uppercase tracking-wider">
            Chat History
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <svg className="w-12 h-12 text-dark-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-dark-500 text-sm">No conversations yet</p>
            <p className="text-dark-600 text-xs mt-1">Start a new chat to begin</p>
          </div>
        </div>
      </aside>
    </>
  )
}
