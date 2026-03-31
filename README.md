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

### Backend
- **Framework:** Flask (Python)
- **AI Integration:** OpenAI API (GPT-4)
- **CORS:** Flask-CORS
- **Environment:** python-dotenv

### Frontend
- **Framework:** React 18 + Vite + TypeScript
- **Styling:** Tailwind CSS (custom red theme)
- **HTTP Client:** Axios
- **Markdown:** react-markdown for AI response rendering
- **State:** React hooks + localStorage for chat history

## Project Structure

```
spotnana-assessment/
├── backend/
│   ├── app.py                  # Flask app entry point + API routes
│   ├── services/
│   │   └── openai_service.py   # OpenAI client wrapper
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example            # Backend env template
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.tsx          # Main responsive grid layout
│   │   │   ├── Header.tsx          # App header with nav actions
│   │   │   ├── Sidebar.tsx         # Chat history sidebar (collapsible)
│   │   │   ├── ChatArea.tsx        # Main chat container
│   │   │   ├── ChatMessages.tsx    # Scrollable message list
│   │   │   ├── MessageBubble.tsx   # Individual message bubble
│   │   │   ├── PromptInput.tsx     # Text input + send button
│   │   │   ├── WelcomeScreen.tsx   # Landing state with suggested prompts
│   │   │   ├── TypingIndicator.tsx # Animated loading dots
│   │   │   ├── ConfirmDialog.tsx   # Reusable confirmation modal
│   │   │   └── ErrorMessage.tsx    # Inline error with retry
│   │   ├── hooks/
│   │   │   ├── useChat.ts         # Chat message state management
│   │   │   └── useChatHistory.ts  # Multi-conversation management
│   │   ├── services/
│   │   │   ├── api.ts             # Axios instance + API calls
│   │   │   └── storage.ts         # localStorage CRUD operations
│   │   ├── types/
│   │   │   └── index.ts           # TypeScript interfaces
│   │   ├── data/
│   │   │   └── suggestedQuestions.ts  # Pre-built travel prompts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- OpenAI API key

### Backend

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Add your OpenAI API key to .env

# Start the Flask server
flask run --port 5000
```

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies API requests to `http://localhost:5000`.

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key |
| `FLASK_ENV` | `development` or `production` |

## Design

- **Theme:** Red color palette with dark gray backgrounds
- **Responsive:** Mobile-first — sidebar collapses to hamburger menu on small screens
- **Accessible:** Keyboard navigation, proper focus management, screen reader friendly
- **Error Handling:** Every failure scenario shows a clear message with retry option

## License

MIT
