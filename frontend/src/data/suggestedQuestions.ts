export interface SuggestedQuestion {
  icon: string
  text: string
  category: string
}

export const suggestedQuestions: SuggestedQuestion[] = [
  {
    icon: '📄',
    text: 'What documents do I need for a business trip to Japan?',
    category: 'Visa & Documents',
  },
  {
    icon: '✈️',
    text: 'Can I book business class for flights over 8 hours?',
    category: 'Travel Policy',
  },
  {
    icon: '🏨',
    text: "What's the per diem for hotels in New York?",
    category: 'Accommodation',
  },
  {
    icon: '⚠️',
    text: 'How do I handle a cancelled flight mid-trip?',
    category: 'Disruptions',
  },
  {
    icon: '💰',
    text: "What's the reimbursement process for travel expenses?",
    category: 'Expenses',
  },
  {
    icon: '🌍',
    text: 'Are there preferred airlines for domestic travel?',
    category: 'Booking',
  },
  {
    icon: '🧳',
    text: 'What are the baggage allowance guidelines for corporate trips?',
    category: 'Travel Policy',
  },
  {
    icon: '🚗',
    text: 'Can I rent a car for a business trip, and what are the limits?',
    category: 'Ground Transport',
  },
]
