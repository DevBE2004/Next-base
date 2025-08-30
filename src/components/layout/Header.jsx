import Link from 'next/link'

const Header = () => {
  return (
    <header className='bg-blue-600 text-white shadow-md'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex justify-between items-center'>
          <Link href='/' className='text-2xl font-bold'>
            NextJS SEO
          </Link>

          <nav className='hidden md:block'>
            <ul className='flex space-x-6'>
              <li>
                <Link href='/' className='hover:underline'>
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href='/blog' className='hover:underline'>
                  Blog
                </Link>
              </li>
              <li>
                <Link href='/about' className='hover:underline'>
                  Giới thiệu
                </Link>
              </li>
            </ul>
          </nav>

          <button className='md:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
