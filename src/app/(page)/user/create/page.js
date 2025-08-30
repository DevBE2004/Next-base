'use client'

import SeoHead from '@/components/layout/SeoHead'
import useApi from '@/hooks/useApi'
import { useState } from 'react'

export default function UserActions() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // POST - Tạo user mới
  const { mutate: createUser, isLoading: isCreating } = useApi(
    {
      endpoint: '/user/sign-up',
      method: 'POST',
    },
    {
      onSuccess: () => {
        setSuccess('User created successfully!')
        setName('')
        setEmail('')
        setError(null)
        setTimeout(() => setSuccess(null), 3000) // Clear success message after 3s
      },
      onError: error => {
        setError(error.message)
      },
    },
  )

  const handleCreateUser = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    createUser({ data: { name, email } })
  }

  return (
    <div className='mx-auto max-w-lg p-6 bg-white shadow-lg rounded-xl'>
      <SeoHead
        title='Quản lý người dùng'
        description='Thêm người dùng mới với giao diện quản lý thân thiện, sử dụng Next.js.'
        keywords='quản lý người dùng, thêm người dùng, Next.js, SSR'
        canonicalUrl='/user/create'
        ogImage='/images/user-actions-og.jpg'
      />
      <h3 className='text-2xl font-bold text-gray-800 mb-6'>Thêm User mới</h3>
      <div className='space-y-4'>
        <div className='flex flex-col gap-4 sm:flex-row'>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={e => setName(e.target.value)}
            className='flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200'
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200'
          />
        </div>
        {error && <div className='p-3 bg-red-100 text-red-700 rounded-lg text-sm'>{error}</div>}
        {success && (
          <div className='p-3 bg-green-100 text-green-700 rounded-lg text-sm'>{success}</div>
        )}
        <button
          onClick={handleCreateUser}
          disabled={isCreating || !name || !email}
          className='w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200'
        >
          {isCreating ? 'Đang tạo...' : 'Thêm User'}
        </button>
      </div>
    </div>
  )
}
