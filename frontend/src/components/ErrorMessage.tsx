interface ErrorMessageProps {
  message: string
  onRetry?: () => void
  onDismiss: () => void
}

export default function ErrorMessage({ message, onRetry, onDismiss }: ErrorMessageProps) {
  return (
    <div className="px-4 pb-2">
      <div className="max-w-3xl mx-auto bg-red-900/20 border border-red-800/50 rounded-xl px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm text-red-200">{message}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onRetry && (
              <button
                onClick={onRetry}
                className="text-xs font-medium text-red-300 hover:text-red-100 bg-red-800/30 hover:bg-red-800/50 px-2.5 py-1 rounded-md transition-colors"
              >
                Retry
              </button>
            )}
            <button
              onClick={onDismiss}
              className="text-red-400 hover:text-red-300 transition-colors"
              aria-label="Dismiss error"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
