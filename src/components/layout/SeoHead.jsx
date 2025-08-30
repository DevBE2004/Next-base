import Head from 'next/head'

const SeoHead = ({ title, description, keywords, canonicalUrl, ogImage }) => {
  const siteName = 'NextJS SEO Optimized'
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl
  const fullOgImage = ogImage ? `${siteUrl}${ogImage}` : `${siteUrl}/og-image.jpg`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <link rel='canonical' href={fullCanonicalUrl} />

      {/* Open Graph */}
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={fullOgImage} />
      <meta property='og:url' content={fullCanonicalUrl} />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content={siteName} />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={fullOgImage} />

      {/* Additional tags */}
      <meta name='robots' content='index, follow' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    </Head>
  )
}

export default SeoHead
