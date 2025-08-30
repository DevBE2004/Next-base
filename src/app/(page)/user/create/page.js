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

  // DELETE - Xóa user
  const { mutate: deleteUser } = useApi(
    {
      method: 'DELETE',
    },
    {
      onSuccess: () => {
        alert('User deleted successfully!')
      },
    },
  )

  const handleCreateUser = () => {
    createUser({ data: { name, email } })
  }

  const handleDeleteUser = userId => {
    deleteUser({ endpoint: `/users/${userId}` })
  }

  return (
    <div className='bg-gray-50 p-6 rounded-lg'>
      <h2 className='text-xl font-semibold mb-4'>Quản lý Users</h2>

      {/* Form tạo user mới */}
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

      {/* Danh sách actions */}
      <div>
        <h3 className='font-medium mb-3'>Quick Actions</h3>
        <div className='flex gap-2'>
          <button
            onClick={() => handleDeleteUser(1)}
            className='bg-red-500 text-white px-3 py-1 rounded text-sm'
          >
            Xóa User #1
          </button>
          <button
            onClick={() => handleDeleteUser(2)}
            className='bg-red-500 text-white px-3 py-1 rounded text-sm'
          >
            Xóa User #2
          </button>
        </div>
      </div>
    </div>
  )
}
