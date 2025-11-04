import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/cart',
        '/checkout',
        '/orders',
        '/favorites',
        '/addresses',
        '/payment-methods',
        '/notifications',
        '/security',
        '/settings',
        '/api-test',
      ],
    },
    sitemap: 'https://tempshop.com/sitemap.xml',
  }
}
