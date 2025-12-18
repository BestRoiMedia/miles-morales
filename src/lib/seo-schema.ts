/**
 * JSON-LD Schema generators for SEO
 * All functions return plain JS objects to be serialized as JSON-LD
 */

import { siteConfig } from '@/config/site';

// Schema.org type definitions
type SchemaContext = 'https://schema.org';

interface BaseSchema {
  '@context': SchemaContext;
  '@type': string;
}

// Person Schema
export interface PersonSchema extends BaseSchema {
  '@type': 'Person';
  name: string;
  description?: string;
  jobTitle?: string;
  url?: string;
  image?: string;
  sameAs?: string[];
  address?: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
}

// Organization/PerformingGroup Schema
export interface OrganizationSchema extends BaseSchema {
  '@type': 'PerformingGroup' | 'Organization' | 'LocalBusiness';
  name: string;
  description?: string;
  url?: string;
  logo?: string;
  image?: string;
  sameAs?: string[];
  address?: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  areaServed?: string;
  contactPoint?: {
    '@type': 'ContactPoint';
    email?: string;
    contactType: string;
  };
}

// Service Schema
export interface ServiceSchema extends BaseSchema {
  '@type': 'Service';
  name: string;
  description?: string;
  provider?: {
    '@type': 'Person' | 'Organization';
    name: string;
    url?: string;
  };
  serviceType?: string;
  areaServed?: string;
  offers?: {
    '@type': 'Offer';
    price?: string;
    priceCurrency?: string;
    priceSpecification?: {
      '@type': 'PriceSpecification';
      price: string;
      priceCurrency: string;
      minPrice?: string;
    };
  };
}

// Event Schema
export interface EventSchema extends BaseSchema {
  '@type': 'Event' | 'MusicEvent';
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location?: {
    '@type': 'Place';
    name: string;
    address?: {
      '@type': 'PostalAddress';
      streetAddress?: string;
      addressLocality?: string;
      addressRegion?: string;
      addressCountry?: string;
    };
  };
  performer?: {
    '@type': 'Person' | 'PerformingGroup';
    name: string;
    url?: string;
  };
  organizer?: {
    '@type': 'Person' | 'Organization';
    name: string;
    url?: string;
  };
  eventStatus?: string;
  eventAttendanceMode?: string;
  offers?: {
    '@type': 'Offer';
    price?: string;
    priceCurrency?: string;
    availability?: string;
    url?: string;
  };
}

// WebSite Schema
export interface WebSiteSchema extends BaseSchema {
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
  publisher?: {
    '@type': 'Person' | 'Organization';
    name: string;
  };
}

// BreadcrumbList Schema
export interface BreadcrumbSchema extends BaseSchema {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

/**
 * Generate Person schema for DJ Miles Morales
 */
export function generatePersonSchema(options?: {
  extended?: boolean;
}): PersonSchema {
  const socialLinks = Object.values(siteConfig.social).filter(Boolean);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    description: options?.extended 
      ? 'Skillful, experienced, and versatile in his turntable style, DJ Miles Morales can rock any occasion. Defining his genre as "everything you love to hear," Miles is quickly becoming one of the premier open-format DJs in the country.'
      : siteConfig.shortDescription,
    jobTitle: siteConfig.author.jobTitle,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    sameAs: socialLinks,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.state,
      addressCountry: siteConfig.location.country,
    },
  };
}

/**
 * Generate Organization/PerformingGroup schema for DJ Miles Morales brand
 */
export function generateOrganizationSchema(): OrganizationSchema {
  const socialLinks = Object.values(siteConfig.social).filter(Boolean);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'PerformingGroup',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    sameAs: socialLinks,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.state,
      addressCountry: siteConfig.location.country,
    },
    areaServed: siteConfig.location.serviceArea,
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.author.email,
      contactType: 'booking',
    },
  };
}

/**
 * Generate Service schema for DJ services
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  serviceType: string;
  price?: string;
  minPrice?: string;
}): ServiceSchema {
  const schema: ServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    provider: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    areaServed: siteConfig.location.serviceArea,
  };

  if (service.price || service.minPrice) {
    schema.offers = {
      '@type': 'Offer',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: service.price || service.minPrice || '',
        priceCurrency: 'USD',
        ...(service.minPrice && { minPrice: service.minPrice }),
      },
    };
  }

  return schema;
}

/**
 * Generate multiple service schemas for all DJ services
 */
export function generateAllServicesSchema(): ServiceSchema[] {
  return [
    generateServiceSchema({
      name: 'Wedding DJ Services',
      description: 'Professional wedding DJ services from ceremony to reception. Creating the perfect soundtrack for your special day.',
      serviceType: 'Wedding DJ',
    }),
    generateServiceSchema({
      name: 'Corporate Event DJ Services',
      description: 'Professional DJ services for corporate events, conferences, galas, and product launches.',
      serviceType: 'Corporate Event DJ',
    }),
    generateServiceSchema({
      name: 'Fashion Show DJ Services',
      description: 'High-energy DJ services for fashion shows, runway events, and luxury brand activations.',
      serviceType: 'Fashion Show DJ',
    }),
    generateServiceSchema({
      name: 'Radio DJ Services',
      description: 'Professional radio DJ and mix show services. Member of "The Beat Committee" on Now 92.1.',
      serviceType: 'Radio DJ',
    }),
  ];
}

/**
 * Generate pricing-specific service schemas with price info
 */
export function generatePricingServiceSchemas(): ServiceSchema[] {
  return [
    generateServiceSchema({
      name: 'Essential Events Package',
      description: 'Perfect for intimate gatherings, birthday parties, and smaller celebrations. Includes up to 4 hours of DJ services with professional sound system.',
      serviceType: 'DJ Services',
      minPrice: '1999',
    }),
    generateServiceSchema({
      name: 'Signature Events Package',
      description: 'Ideal for weddings, milestone celebrations, and mid-size corporate events. Includes up to 6 hours of DJ services with premium sound and MC services.',
      serviceType: 'Wedding DJ',
      minPrice: '3499',
    }),
    generateServiceSchema({
      name: 'Premier & Corporate Package',
      description: 'For large-scale galas, corporate events, fashion shows, and luxury celebrations. Includes 8+ hours with concert-grade sound and full hosting services.',
      serviceType: 'Corporate Event DJ',
      minPrice: '4999',
    }),
  ];
}

/**
 * Generate Event schema for future event listings
 * @param event - Event details
 */
export function generateEventSchema(event: {
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  locationName: string;
  locationAddress?: {
    streetAddress?: string;
    city?: string;
    state?: string;
    country?: string;
  };
  ticketUrl?: string;
  ticketPrice?: string;
}): EventSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    location: {
      '@type': 'Place',
      name: event.locationName,
      address: event.locationAddress ? {
        '@type': 'PostalAddress',
        streetAddress: event.locationAddress.streetAddress,
        addressLocality: event.locationAddress.city,
        addressRegion: event.locationAddress.state,
        addressCountry: event.locationAddress.country || 'US',
      } : undefined,
    },
    performer: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    ...(event.ticketUrl && {
      offers: {
        '@type': 'Offer',
        url: event.ticketUrl,
        price: event.ticketPrice,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    }),
  };
}

/**
 * Generate WebSite schema
 */
export function generateWebSiteSchema(): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: Array<{
  name: string;
  url?: string;
}>): BreadcrumbSchema {
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

// Type for any valid schema
export type JsonLdSchema = 
  | PersonSchema 
  | OrganizationSchema 
  | ServiceSchema 
  | EventSchema 
  | WebSiteSchema 
  | BreadcrumbSchema;




