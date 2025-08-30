'use client'

import { clientFetcher } from '@/lib/api/api'
import useSWR from 'swr'

// Hàm tạo key duy nhất cho SWR
const createKey = ({ endpoint, method, params, data }) => {
  return endpoint ? JSON.stringify({ endpoint, method, params, data }) : null
}

// Hook useApi tối ưu cho cả client-side và server-side
const useApi = ({ endpoint, method = 'GET', params, data, config = {} }) => {
  const key = createKey({ endpoint, method, params, data })

  const {
    data: responseData,
    error,
    isLoading,
    mutate,
  } = useSWR(key, () => clientFetcher({ url: endpoint, method, params, data }), {
    revalidateOnFocus: false, // Tắt revalidate khi focus để tối ưu
    revalidateOnReconnect: true, // Revalidate khi reconnect mạng
    dedupingInterval: 2000, // Tránh gọi API trùng trong 2s
    ...config,
  })

  return {
    data: responseData,
    isLoading,
    error,
    mutate,
  }
}

export default useApi
