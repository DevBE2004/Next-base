'use client'

import useApi from '@/hooks/useApi'
import { useState } from 'react'

export default function UserActions() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // POST - Tạo user mới
  const { mutate: createUser, isLoading: isCreating } = useApi(
    {
      endpoint: '/user',
      method: 'POST',
      data: data,
    },

    {
      onSuccess: () => {
        alert('User created successfully!')
        setName('')
        setEmail('')
      },
      onError: error => {
        alert(`Error: ${error.message}`)
      },
    },
  )

  const handleCreateUser = () => {
    createUser({ data: { name, email } })
  }

  return (
    <div className='bg-gray-50 p-6 rounded-lg'>
      <SeoHead
        title='Quản lý người dùng'
        description='Thêm hoặc xóa người dùng với giao diện quản lý thân thiện.'
        keywords='thêm người dùng'
        canonicalUrl='/user/create'
        ogImage='/images/user-actions-og.jpg'
      />

      <div className='mb-6'>
        <h3 className='font-medium mb-3'>Thêm User mới</h3>
        <div className='flex gap-2 mb-3'>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={e => setName(e.target.value)}
            className='border p-2 rounded flex-1'
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='border p-2 rounded flex-1'
          />
        </div>
        <button
          onClick={handleCreateUser}
          disabled={isCreating || !name || !email}
          className='bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50'
        >
          {isCreating ? 'Đang tạo...' : 'Thêm User'}
        </button>
      </div>
    </div>
  )
}
