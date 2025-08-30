import SeoHead from '@/components/layout/SeoHead'
import { serverFetcher } from '@/lib/api/axios'

// SSR
export default async function UsersPage() {
  try {
    const data = await serverFetcher({ url: '/user', method: 'GET' })

    return (
      <div className='container'>
        <SeoHead
          title='Danh sách người dùng'
          description='Xem danh sách người dùng được tải bằng Server-Side Rendering trong Next.js'
          keywords='users, danh sách người dùng, Next.js, SSR, hồ sơ người dùng'
          canonicalUrl='/users'
          ogImage='/images/users-og.jpg'
        />
        <h1>Users (SSR)</h1>
        {data?.users?.length > 0 ? (
          <ul className='user-list'>
            {data.users.map(user => (
              <li key={user.id} className='user-item'>
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
                <p>ID: {user.id}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error fetching users:', error)
    return (
      <div className='container'>
        <SeoHead
          title='Danh sách người dùng - Lỗi'
          description='Đã xảy ra lỗi khi tải danh sách người dùng. Vui lòng thử lại sau.'
          keywords='users, danh sách người dùng, lỗi, Next.js, SSR'
          canonicalUrl='/users'
          ogImage='/images/users-og.jpg'
        />
        <h1>Users (SSR)</h1>
        <div className='error-message'>
          <p>Failed to load users.</p>
          <p>Please try again later.</p>
        </div>
      </div>
    )
  }
}

export const dynamic = 'force-dynamic'
