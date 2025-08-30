import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'

const Layout = ({
  children,
  title = 'NextJS SEO Optimized',
  description = 'Một trang web được xây dựng với NextJS tối ưu SEO',
}) => {
  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='min-h-screen flex flex-col'>
        <Header />
        <main className='flex-grow'>{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
