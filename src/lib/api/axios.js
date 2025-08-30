import axios from 'axios'

// Tạo Axios instance với cấu hình tối ưu
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
})

// Hàm fetcher chung cho cả server và client
const fetcher = async ({ url, method = 'GET', params, data }) => {
  try {
    const response = await api.request({
      url,
      method,
      params,
      data,
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message)
  }
}

// Hàm fetcher cho phía server (SSR/ISR)
export const serverFetcher = async ({ url, method = 'GET', params, data }) => {
  return fetcher({ url, method, params, data })
}

// Hàm fetcher cho phía client (SWR)
export const clientFetcher = async ({ url, method = 'GET', params, data }) => {
  return fetcher({ url, method, params, data })
}

export default api
