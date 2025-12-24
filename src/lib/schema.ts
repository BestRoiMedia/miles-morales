/**
 * Schema helper functions for service area pages
 */

import { siteConfig } from '@/config/site';
import type { OrganizationSchema, ServiceSchema as BaseServiceSchema, BreadcrumbSchema as BaseBreadcrumbSchema, FaqPageSchema as BaseFaqPageSchema } from '@/lib/seo-schema';

export interface BaseBusinessSchema extends OrganizationSchema {
  '@type': 'LocalBusiness' | 'EntertainmentBusiness';
  telephone: string;
}

export interface EntertainmentBusinessSchema extends BaseBusinessSchema {
  '@type': 'EntertainmentBusiness';
}

export type ServiceSchema = BaseServiceSchema;
export type BreadcrumbSchema = BaseBreadcrumbSchema;

export type FaqPageSchema = BaseFaqPageSchema;

/**
 * Build EntertainmentBusiness schema for hub/city pages
 */
export function buildEntertainmentBusinessSchema(options: {
  url: string;
  image: string;
  areaName: string;
  state: string;
  nearbyCities?: string[];
}): EntertainmentBusinessSchema {
  const socialLinks = Object.values(siteConfig.social).filter(Boolean);
  
  const areaServed: string[] = [`${options.areaName}, ${options.state}`];
  if (options.nearbyCities && options.nearbyCities.length > 0) {
    areaServed.push(...options.nearbyCities.slice(0, 5).map(city => `${city}, ${options.state}`));
  }
  
  return {
    '@context': 'https://schema.org',
    '@type': 'EntertainmentBusiness',
    name: siteConfig.name,
    description: siteConfig.description,
    url: options.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    image: options.image,
    telephone: '(717) 555-0000', // Placeholder - update from site config if available
    areaServed: areaServed.length === 1 ? areaServed[0]! : areaServed,
    address: {
      '@type': 'PostalAddress',
      addressLocality: options.areaName,
      addressRegion: options.state,
      addressCountry: 'US',
    },
    sameAs: socialLinks,
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.author.email,
      contactType: 'booking',
    },
  };
}

/**
 * Get base business schema for service area pages (legacy, use buildEntertainmentBusinessSchema)
 */
export function getBaseBusinessSchema(options: {
  areaName: string;
  state: string;
  phone?: string;
}): BaseBusinessSchema {
  const socialLinks = Object.values(siteConfig.social).filter(Boolean);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    telephone: options.phone || '(717) 555-0000', // Placeholder
    areaServed: `${options.areaName}, ${options.state}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Serves area',
      addressRegion: options.state,
      addressCountry: 'US',
    },
    sameAs: socialLinks,
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.author.email,
      contactType: 'booking',
    },
  };
}

/**
 * Build Service schema for DJ services
 */
export function buildServiceSchema(options: {
  url: string;
  areaName: string;
  state: string;
}): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `DJ Services in ${options.areaName}`,
    description: `Professional DJ services for weddings, corporate events, parties, and celebrations in ${options.areaName}, ${options.state}.`,
    serviceType: ['Wedding DJ', 'Corporate DJ', 'Event DJ', 'Party DJ'],
    provider: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    areaServed: {
      '@type': 'City',
      name: options.areaName,
      addressRegion: options.state,
    },
  };
}

/**
 * Get service schema for DJ services (legacy, use buildServiceSchema)
 */
export function getServiceSchema(options: {
  areaName: string;
  state: string;
}): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'DJ Services',
    description: `Professional DJ services for weddings, corporate events, parties, and celebrations in ${options.areaName}, ${options.state}.`,
    serviceType: 'DJ Services',
    provider: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    areaServed: `${options.areaName}, ${options.state}`,
  };
}

/**
 * Build breadcrumb schema
 */
export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Get breadcrumb schema (legacy, use buildBreadcrumbSchema)
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>): BreadcrumbSchema {
  return buildBreadcrumbSchema(items);
}

/**
 * Build FAQPage schema for hub pages
 */
export function buildFaqSchema(faqItems: Array<{ question: string; answer: string }>): FaqPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

