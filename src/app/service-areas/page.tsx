import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { HUBS } from '@/data/serviceAreas';
import { SeoJsonLd } from '@/components/seo-json-ld';
import { generateWebSiteSchema } from '@/lib/seo-schema';
import { buildBreadcrumbSchema } from '@/lib/schema';
import { pickImageForSlug } from '@/lib/pickImage';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Service Areas | DJ Miles Morales',
  description: 'DJ Miles Morales serves weddings, corporate events, and parties in Pennsylvania, Maryland, Washington DC, and surrounding areas.',
  openGraph: {
    title: 'Service Areas | DJ Miles Morales',
    description: 'Professional DJ services throughout Pennsylvania, Maryland, and Washington DC metro areas.',
    url: `${siteConfig.url}/service-areas`,
  },
  alternates: {
    canonical: `${siteConfig.url}/service-areas`,
  },
};

export default function ServiceAreasIndexPage() {
  const websiteSchema = generateWebSiteSchema();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'Service Areas', url: `${siteConfig.url}/service-areas` },
  ]);
  
  // Use fixed seed for index page
  const indexImage = pickImageForSlug('service-areas');

  return (
    <>
      <SeoJsonLd schema={[websiteSchema, breadcrumbSchema]} />
      
      <div className="min-h-screen bg-[#050509]">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-28 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-[family-name:var(--font-bebas-neue)] text-5xl sm:text-6xl lg:text-7xl text-[#F5F5F5] uppercase tracking-wide mb-6">
              Service Areas
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl">
              DJ Miles Morales provides professional DJ services throughout Pennsylvania, Maryland, and the Washington DC metro area. 
              From intimate weddings to large corporate events, we serve communities within a 20-mile radius of our primary service hubs.
            </p>
          </div>
        </section>

        {/* Hubs Grid */}
        <section className="py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl text-[#F5F5F5] uppercase tracking-wide mb-8">
              Primary Service Hubs
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {HUBS.map((hub) => {
                const hubImage = pickImageForSlug(hub.slug);
                const objectPosition = hub.slug === 'pittsburgh-pa' ? 'object-center' : 'object-top';
                return (
                  <Link
                    key={hub.slug}
                    href={`/service-areas/${hub.slug}`}
                    className="comic-panel overflow-hidden bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800 hover:border-[#FF2436]/50 transition-all group"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={hubImage.src}
                        alt={`${hubImage.altBase} in ${hub.name}, ${hub.state}`}
                        fill
                        className={`object-cover ${objectPosition} group-hover:scale-105 transition-transform duration-500`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl text-[#F5F5F5] uppercase tracking-wide mb-2 group-hover:text-[#FF2436] transition-colors">
                        {hub.name}
                      </h3>
                      <p className="text-zinc-400 text-sm mb-4">{hub.state}</p>
                      <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                        {hub.introCopy}
                      </p>
                      <span className="text-[#FF2436] text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Service Area →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 border-t border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl text-[#F5F5F5] uppercase tracking-wide mb-6">
              Ready to Book Your Event?
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
              Whether you&apos;re planning a wedding, corporate event, or private celebration, 
              we&apos;d love to discuss how we can make your event unforgettable.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-[#FF2436] hover:bg-[#ff4d5c] text-white font-display text-xl uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-red-500/20 hover:shadow-red-500/30 hover:-translate-y-0.5"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

