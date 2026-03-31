import { suggestedQuestions } from '../data/suggestedQuestions'

interface WelcomeScreenProps {
  onSelectQuestion: (question: string) => void
}

export default function WelcomeScreen({ onSelectQuestion }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 overflow-y-auto">
      <div className="w-full max-w-2xl">
        {/* Logo & tagline */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-dark-100 mb-2">
            Trip<span className="text-primary-500">Assist</span> AI
          </h2>
          <p className="text-dark-400">
            Your corporate travel assistant. How can I help you today?
          </p>
        </div>

        {/* Suggested questions grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {suggestedQuestions.map((q, index) => (
            <button
              key={index}
              onClick={() => onSelectQuestion(q.text)}
              className="group text-left p-4 bg-dark-800/50 hover:bg-dark-800 border border-dark-700 hover:border-primary-600/50 rounded-xl transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl shrink-0">{q.icon}</span>
                <div>
                  <span className="text-xs text-primary-400 font-medium">{q.category}</span>
                  <p className="text-sm text-dark-200 group-hover:text-dark-100 mt-0.5 leading-relaxed">
                    {q.text}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
