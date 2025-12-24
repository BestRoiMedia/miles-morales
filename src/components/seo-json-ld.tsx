import { type JsonLdSchema } from '@/lib/seo-schema';

interface SeoJsonLdProps {
  schema: JsonLdSchema | JsonLdSchema[];
}

/**
 * Renders JSON-LD structured data script tag(s) for SEO
 * Accepts a single schema or an array of schemas
 */
export function SeoJsonLd({ schema }: SeoJsonLdProps) {
  // Handle array of schemas
  if (Array.isArray(schema)) {
    return (
      <>
        {schema.map((s, index) => (
          <script
            key={index}
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
          />
        ))}
      </>
    );
  }

  // Handle single schema
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}





