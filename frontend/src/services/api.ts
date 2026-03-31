import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatResponse {
  response: string
}

export async function sendMessage(messages: ChatMessage[]): Promise<string> {
  const { data } = await api.post<ChatResponse>('/chat', { messages })
  return data.response
}

export default api
