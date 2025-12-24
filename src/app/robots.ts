import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Generate robots.txt for the site
 * Following Next.js App Router metadataRoute pattern
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}





