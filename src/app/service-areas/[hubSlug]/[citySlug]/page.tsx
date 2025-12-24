import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { getHubBySlug, getCityBySlug, getAllHubSlugs, getAllCitySlugsForHub, getCitiesByHub } from '@/data/serviceAreas';
import { SeoJsonLd } from '@/components/seo-json-ld';
import { buildEntertainmentBusinessSchema, buildServiceSchema, buildBreadcrumbSchema } from '@/lib/schema';
import { pickImageForSlug } from '@/lib/pickImage';

export const dynamic = 'force-static';
export const revalidate = false;

interface CityPageProps {
  params: Promise<{ hubSlug: string; citySlug: string }>;
}

export async function generateStaticParams() {
  const hubSlugs = getAllHubSlugs();
  const params: Array<{ hubSlug: string; citySlug: string }> = [];
  
  for (const hubSlug of hubSlugs) {
    const citySlugs = getAllCitySlugsForHub(hubSlug);
    for (const citySlug of citySlugs) {
      params.push({ hubSlug, citySlug });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { hubSlug, citySlug } = await params;
  const hub = getHubBySlug(hubSlug);
  const city = getCityBySlug(hubSlug, citySlug);
  
  if (!hub || !city) {
    return {
      title: 'Service Area Not Found',
    };
  }

  const title = `DJ Services in ${city.name}, ${city.state} | DJ Miles Morales`;
  const description = `Professional DJ services for weddings, corporate events, and parties in ${city.name}, ${city.state}. Serving within 20 miles of ${hub.name}.`;

  // City pages are noindex by default unless hub.indexCityPages is true
  const shouldIndex = hub.indexCityPages === true;

  return {
    title: title.length <= 60 ? title : `DJ Services in ${city.name} | DJ Miles Morales`,
    description: description.length <= 155 ? description : description.substring(0, 152) + '...',
    openGraph: {
      title: title.length <= 60 ? title : `DJ Services in ${city.name} | DJ Miles Morales`,
      description: description.length <= 155 ? description : description.substring(0, 152) + '...',
      url: `${siteConfig.url}/service-areas/${hubSlug}/${citySlug}`,
    },
    alternates: {
      canonical: `${siteConfig.url}/service-areas/${hubSlug}/${citySlug}`,
    },
    robots: {
      index: shouldIndex,
      follow: true,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { hubSlug, citySlug } = await params;
  const hub = getHubBySlug(hubSlug);
  const city = getCityBySlug(hubSlug, citySlug);
  
  if (!hub || !city) {
    notFound();
  }

  const allCities = getCitiesByHub(hubSlug);
  const cityImage = pickImageForSlug(`${hubSlug}/${citySlug}`);
  const canonicalUrl = `${siteConfig.url}/service-areas/${hubSlug}/${citySlug}`;
  const imageUrl = cityImage.src.startsWith('http') ? cityImage.src : `${siteConfig.url}${cityImage.src}`;
  
  // Get nearby cities (8-12 from same hub, excluding current city)
  const nearbyCities = allCities
    .filter(c => c.slug !== citySlug)
    .slice(0, 12)
    .map(c => c.name);
  
  const businessSchema = buildEntertainmentBusinessSchema({
    url: canonicalUrl,
    image: imageUrl,
    areaName: city.name,
    state: city.state,
    nearbyCities,
  });
  
  const serviceSchema = buildServiceSchema({
    url: canonicalUrl,
    areaName: city.name,
    state: city.state,
  });
  
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'Service Areas', url: `${siteConfig.url}/service-areas` },
    { name: `${hub.name}, ${hub.state}`, url: `${siteConfig.url}/service-areas/${hubSlug}` },
    { name: `${city.name}, ${city.state}`, url: canonicalUrl },
  ]);

  return (
    <>
      <SeoJsonLd schema={[businessSchema, serviceSchema, breadcrumbSchema]} />
      
      <div className="min-h-screen bg-[#050509]">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-28 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="mb-6 flex flex-wrap gap-2 text-sm">
              <Link 
                href="/service-areas" 
                className="text-zinc-500 hover:text-[#FF2436] transition-colors"
              >
                Service Areas
              </Link>
              <span className="text-zinc-600">/</span>
              <Link 
                href={`/service-areas/${hubSlug}`}
                className="text-zinc-500 hover:text-[#FF2436] transition-colors"
              >
                {hub.name}, {hub.state}
              </Link>
            </nav>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="font-[family-name:var(--font-bebas-neue)] text-5xl sm:text-6xl lg:text-7xl text-[#F5F5F5] uppercase tracking-wide mb-6">
                  DJ Services in {city.name}, {city.state}
                </h1>
                <p className="text-xl text-zinc-400 max-w-3xl mb-4">
                  Professional DJ services for weddings, corporate events, and celebrations in {city.name}, {city.state}.
                </p>
                <p className="text-zinc-500 max-w-3xl">
                  Located within approximately 20 miles of {hub.name}, {hub.state}, we bring professional DJ services 
                  to {city.name} and surrounding communities.
                </p>
              </div>
              <div className="relative aspect-[4/3] comic-panel overflow-hidden">
                <Image
                  src={cityImage.src}
                  alt={`${cityImage.altBase} in ${city.name}, ${city.state}`}
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Popular Events Section */}
        <section className="py-16 sm:py-24 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl text-[#F5F5F5] uppercase tracking-wide mb-8">
              Popular Events We DJ in {city.name}
            </h2>
            <ul className="grid md:grid-cols-2 gap-4 text-zinc-400">
              <li className="flex items-start gap-3">
                <span className="text-[#FF2436] mt-1">◆</span>
                <span>Weddings & Receptions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF2436] mt-1">◆</span>
                <span>Corporate Events & Galas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF2436] mt-1">◆</span>
                <span>Birthday Celebrations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF2436] mt-1">◆</span>
                <span>School Events & Dances</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF2436] mt-1">◆</span>
                <span>Private Parties</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF2436] mt-1">◆</span>
                <span>Anniversary Celebrations</span>
              </li>
            </ul>
          </div>
        </section>

        {/* What You Get Section */}
        <section className="py-16 sm:py-24 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl text-[#F5F5F5] uppercase tracking-wide mb-8">
              What You Get
            </h2>
            <ul className="grid md:grid-cols-2 gap-4 text-zinc-400">
              <li className="flex items-start gap-3">
                <span className="text-[#FF2436] mt-1">◆</span>
                <span>Professional Sound System</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF2436] mt-1">◆</span>
                <span>Wireless Microphone</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF2436] mt-1">◆</span>
                <span>Professional Lighting</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF2436] mt-1">◆</span>
                <span>Custom Playlist Planning</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF2436] mt-1">◆</span>
                <span>MC Services</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF2436] mt-1">◆</span>
                <span>Open-Format Music Selection</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Nearby Areas Section */}
        <section className="py-16 sm:py-24 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl text-[#F5F5F5] uppercase tracking-wide mb-8">
              Nearby Areas
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {nearbyCities.map((nearbyCityName) => {
                const nearbyCity = allCities.find(c => c.name === nearbyCityName);
                if (!nearbyCity) return null;
                return (
                  <Link
                    key={nearbyCity.slug}
                    href={`/service-areas/${hubSlug}/${nearbyCity.slug}`}
                    className="comic-panel p-4 bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800 hover:border-[#FF2436]/50 transition-all group"
                  >
                    <span className="text-zinc-400 group-hover:text-[#FF2436] transition-colors text-sm">
                      {nearbyCity.name}, {nearbyCity.state}
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-6">
              <Link
                href={`/service-areas/${hubSlug}`}
                className="inline-flex items-center text-zinc-500 hover:text-[#FF2436] transition-colors text-sm"
              >
                ← View all cities in {hub.name}, {hub.state}
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl text-[#F5F5F5] uppercase tracking-wide mb-6">
              Ready to Book Your Event in {city.name}?
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can make your {city.name}, {city.state} event unforgettable. 
              Contact us today to check availability and get a quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-4 bg-[#FF2436] hover:bg-[#ff4d5c] text-white font-display text-xl uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-red-500/20 hover:shadow-red-500/30 hover:-translate-y-0.5"
              >
                Get in Touch
              </Link>
              <a
                href="tel:+17175550000"
                className="inline-flex items-center justify-center px-10 py-4 border-2 border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-display text-xl uppercase tracking-wider rounded-lg transition-all hover:-translate-y-0.5"
              >
                Call Now
              </a>
            </div>
            <p className="text-zinc-600 text-sm mt-6">
              Also serving <Link href={`/service-areas/${hubSlug}`} className="text-[#FF2436] hover:text-[#ff4d5c] transition-colors">{hub.name}</Link> and surrounding areas.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
