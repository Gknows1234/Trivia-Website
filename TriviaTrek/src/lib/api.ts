import axios, { AxiosInstance, AxiosError } from 'axios'

const baseURL = 'http://localhost:4000'

const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor with exponential backoff retry
let retryCount = 0
const MAX_RETRIES = 3
const RETRY_DELAY = 1000

api.interceptors.response.use(
  (response) => {
    retryCount = 0
    return response
  },
  async (error: AxiosError) => {
    const config = error.config

    // Retry only for GET requests and specific error codes
    if (
      config &&
      config.method === 'get' &&
      retryCount < MAX_RETRIES &&
      (error.response?.status === 408 || error.response?.status === 429 || !error.response)
    ) {
      retryCount++
      const delay = RETRY_DELAY * Math.pow(2, retryCount - 1)
      await new Promise((resolve) => setTimeout(resolve, delay))
      return api(config)
    }

    retryCount = 0
    return Promise.reject(error)
  },
)

export const apiClient = {
  get: async <T,>(path: string): Promise<T> => {
    const response = await api.get<T>(path)
    return response.data
  },

  post: async <T,>(path: string, data: unknown): Promise<T> => {
    const response = await api.post<T>(path, data)
    return response.data
  },

  put: async <T,>(path: string, data: unknown): Promise<T> => {
    const response = await api.put<T>(path, data)
    return response.data
  },

  delete: async <T,>(path: string): Promise<T> => {
    const response = await api.delete<T>(path)
    return response.data
  },
}

export default api
