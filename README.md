# TripAssist AI — Corporate Travel Assistant

An AI-powered travel assistant that acts as a smart first point of contact for corporate travel questions. Travelers get instant answers without emailing a travel manager or digging through policy docs.

## Problem

Corporate travelers waste hours every week on things that should take seconds — figuring out travel policies, comparing flight options, understanding visa requirements, handling disruptions, and estimating trip costs. There's no intelligent, conversational layer between the traveler and the information they need.

## Who Uses It

- A business traveler checking if their hotel choice is within policy
- An employee flying internationally for the first time asking about visa requirements
- A travel manager who wants to reduce repetitive support queries
- A new hire who doesn't know the company travel rules yet

## Core Features

### 1. Ask Anything Travel-Related
User types a question, AI responds instantly with helpful, accurate travel guidance.

### 2. Suggested Questions on Load
Show 6-8 pre-built travel prompts so users know what to ask:
- "What documents do I need for a business trip to Japan?"
- "How do I handle a cancelled flight mid-trip?"
- "What's the per diem for hotels in New York?"
- "Can I book a business class flight for trips over 8 hours?"
- "What's the reimbursement process for travel expenses?"
- "Are there preferred airlines for domestic travel?"

### 3. Conversation Memory
The AI remembers context within the session — follow-up questions work naturally.

### 4. Chat History
Save past conversations locally so users can revisit previous trips or questions.

### 5. Clear Session
One button to wipe the conversation and start fresh.

## Tech Stack

- **Framework:** React + Vite + TypeScript
- **Styling:** Tailwind CSS
- **AI:** OpenAI API (GPT-4)
- **State:** React hooks + localStorage for chat history

## Getting Started

```bash
# Clone the repo
git clone https://github.com/dgchovatiya/spotnana-assessment.git
cd spotnana-assessment

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your OpenAI API key to .env

# Start the dev server
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_OPENAI_API_KEY` | Your OpenAI API key |

## License

MIT
