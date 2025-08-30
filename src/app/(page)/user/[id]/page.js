import SeoHead from '@/components/layout/SeoHead'
import { serverFetcher } from '@/lib/api/axios'

// Tạo danh sách các đường dẫn tĩnh (static paths) cho trang chi tiết người dùng dựa trên danh sách ID từ API
export async function generateStaticParams() {
  try {
    const users = await serverFetcher({ url: '/users', method: 'GET' })

    return users.map(user => ({
      id: user.id,
    }))
  } catch (error) {
    console.error('Error fetching users for static generation:', error)
    return []
  }
}
// Kích hoạt fallback kiểu 'blocking': nếu path chưa được tạo tĩnh, Next.js sẽ render trang theo SSR khi có yêu cầu
export const fallback = 'blocking'
// Cập nhật lại trang tĩnh sau mỗi 1 giờ (3600 giây) bằng Incremental Static Regeneration (ISR)
export const revalidate = 3600

export default async function UserDetailPage({ params }) {
  const { id } = await params

  try {
    const data = await serverFetcher({ url: `/user/${id}`, method: 'GET' })
    return (
      <>
        <SeoHead
          title={`User Details for ${data.user.name}`}
          description={`Profile details for ${data.user.name}, including email and ID.`}
          keywords={`user profile, ${data.user.name}, user details, ISR, Next.js`}
          canonicalUrl={`/user/${data.user.id}`}
          ogImage={`${data.user.avatar}`}
        />
        <div className='container'>
          <h1>User Details (ISR)</h1>
          <div className='user-card'>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>ID: {user.id}</p>
          </div>
        </div>
      </>
    )
  } catch (error) {
    console.error('Error fetching user:', error)

    return (
      <>
        <SeoHead
          title='User Details - Error'
          description='An error occurred while loading user details.'
          keywords='user profile, error, Next.js'
          canonicalUrl={`/user/${id}`}
          ogImage='/og-image.jpg'
        />
        <div className='container'>
          <h1>User Details</h1>
          <div className='error-message'>
            <p>Failed to load user data.</p>
            <p>User might not exist or there was a server error.</p>
          </div>
        </div>
      </>
    )
  }
}
