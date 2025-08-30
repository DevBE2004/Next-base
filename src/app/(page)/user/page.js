import { serverFetcher } from '@/lib/api/axios'

//SSR
export default async function UsersPage() {
  try {
    const data = await serverFetcher({ url: '/user', method: 'GET' })
    console.log(data)
    return (
      <div className='container'>
        <h1>Users (SSR)</h1>
        {data && data.users && data.users.length > 0 ? (
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
