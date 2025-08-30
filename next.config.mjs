/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Tắt Turbopack nếu cần (tùy chọn)
  // experimental: {
  //   turbo: false
  // },
  images: {
    domains: ['jsonplaceholder.typicode.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}

export default nextConfig
