import axios, { AxiosInstance } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

// Request interceptor
api.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor with retry logic
let retryCount = 0
const MAX_RETRIES = 3

api.interceptors.response.use(
  response => response,
  async error => {
    const config = error.config

    if (error.response?.status === 500 && config && retryCount < MAX_RETRIES) {
      retryCount++
      const delay = Math.pow(2, retryCount) * 1000
      await new Promise(resolve => setTimeout(resolve, delay))
      return api(config)
    }

    retryCount = 0
    return Promise.reject(error)
  }
)

export const apiClient = {
  get: <T,>(url: string) => api.get<T>(url).then(res => res.data),
  post: <T,>(url: string, data: unknown) => api.post<T>(url, data).then(res => res.data),
  put: <T,>(url: string, data: unknown) => api.put<T>(url, data).then(res => res.data),
  delete: <T,>(url: string) => api.delete<T>(url).then(res => res.data),
}

export default api
