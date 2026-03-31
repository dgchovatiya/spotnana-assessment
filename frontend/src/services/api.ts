import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
})

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatResponse {
  response: string
}

interface ErrorResponse {
  error: string
}

export async function sendMessage(messages: ChatMessage[]): Promise<string> {
  try {
    const { data } = await api.post<ChatResponse>('/chat', { messages })
    return data.response
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.data) {
        const errorData = err.response.data as ErrorResponse
        throw new Error(errorData.error || 'Something went wrong. Please try again.')
      }
      if (err.code === 'ECONNABORTED') {
        throw new Error('Request timed out. Please try again.')
      }
      if (!err.response) {
        throw new Error('Unable to connect to the server. Please check if the backend is running.')
      }
    }
    throw new Error('Something went wrong. Please try again.')
  }
}

export default api
