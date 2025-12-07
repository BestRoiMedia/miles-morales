/**
 * Central site configuration for SEO and metadata
 * Update this file to change site-wide SEO values
 */

export const siteConfig = {
  // Base URL - change this for production
  url: 'https://djmilesmorales.com',
  
  // Site identity
  name: 'DJ Miles Morales',
  description: 'Skillful, experienced, and versatile. DJ Miles Morales is one of the premier open-format DJs in the country. Based in Chambersburg, PA and available nationwide.',
  shortDescription: 'Open-Format DJ for Corporate, Fashion, & Luxury Events',
  
  // Author/Owner
  author: {
    name: 'DJ Miles Morales',
    jobTitle: 'DJ / Open-Format DJ',
    email: 'booking@djmilesmorales.com',
  },
  
  // Location
  location: {
    city: 'Chambersburg',
    state: 'PA',
    country: 'US',
    serviceArea: 'Nationwide',
  },
  
  // Social links (update with actual URLs)
  social: {
    instagram: 'https://instagram.com/djmilesmorales',
    tiktok: 'https://tiktok.com/@djmilesmorales',
    facebook: 'https://facebook.com/djmilesmorales',
    twitter: 'https://twitter.com/djmilesmorales',
  },
  
  // Brand assets
  logo: '/images/dj-miles-morales.jpg', // Update with actual logo path
  ogImage: '/images/dj-miles-morales.jpg',
  
  // Keywords for SEO
  keywords: [
    'DJ',
    'Miles Morales',
    'Wedding DJ',
    'Corporate DJ',
    'Event DJ',
    'Open Format DJ',
    'Pennsylvania DJ',
    'Fashion Show DJ',
    'Radio DJ',
    'Chambersburg DJ',
  ] as string[],
} as const;

export type SiteConfig = typeof siteConfig;

