import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { HUBS, CITIES_BY_HUB } from '@/data/serviceAreas';

/**
 * Generate sitemap.xml for the site
 * Following Next.js App Router metadataRoute pattern
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const lastModified = new Date();

  const urls: MetadataRoute.Sitemap = [
    // Main pages
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/music`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/epk`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Service areas index
    {
      url: `${baseUrl}/service-areas`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Add all hub pages
  for (const hub of HUBS) {
    urls.push({
      url: `${baseUrl}/service-areas/${hub.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    });

    // Add all city pages for each hub
    const cities = CITIES_BY_HUB[hub.slug] || [];
    for (const city of cities) {
      urls.push({
        url: `${baseUrl}/service-areas/${hub.slug}/${city.slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return urls;
}





