import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { getHubBySlug, getCitiesByHub, getAllHubSlugs } from '@/data/serviceAreas';
import { SeoJsonLd } from '@/components/seo-json-ld';
import { buildEntertainmentBusinessSchema, buildServiceSchema, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/schema';
import { pickImageForSlug } from '@/lib/pickImage';

export const dynamic = 'force-static';
export const revalidate = false;

interface HubPageProps {
  params: Promise<{ hubSlug: string }>;
}

export async function generateStaticParams() {
  const hubSlugs = getAllHubSlugs();
  return hubSlugs.map((slug) => ({
    hubSlug: slug,
  }));
}

export async function generateMetadata({ params }: HubPageProps): Promise<Metadata> {
  const { hubSlug } = await params;
  const hub = getHubBySlug(hubSlug);
  
  if (!hub) {
    return {
      title: 'Service Area Not Found',
    };
  }

  const title = `DJ Services in ${hub.name}, ${hub.state} | DJ Miles Morales`;
  const description = `Professional DJ services for weddings, corporate events, and parties in ${hub.name}, ${hub.state} and surrounding areas within 20 miles.`;

  return {
    title: title.length <= 60 ? title : `DJ Services in ${hub.name} | DJ Miles Morales`,
    description: description.length <= 155 ? description : description.substring(0, 152) + '...',
    openGraph: {
      title: title.length <= 60 ? title : `DJ Services in ${hub.name} | DJ Miles Morales`,
      description: description.length <= 155 ? description : description.substring(0, 152) + '...',
      url: `${siteConfig.url}/service-areas/${hubSlug}`,
    },
    alternates: {
      canonical: `${siteConfig.url}/service-areas/${hubSlug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function HubPage({ params }: HubPageProps) {
  const { hubSlug } = await params;
  const hub = getHubBySlug(hubSlug);
  
  if (!hub) {
    notFound();
  }

  const cities = getCitiesByHub(hubSlug);
  const hubImage = pickImageForSlug(hubSlug);
  const canonicalUrl = `${siteConfig.url}/service-areas/${hubSlug}`;
  const imageUrl = hubImage.src.startsWith('http') ? hubImage.src : `${siteConfig.url}${hubImage.src}`;
  
  // Get nearby city names for areaServed
  const nearbyCities = cities.slice(0, 5).map(c => c.name);
  
  const businessSchema = buildEntertainmentBusinessSchema({
    url: canonicalUrl,
    image: imageUrl,
    areaName: hub.name,
    state: hub.state,
    nearbyCities,
  });
  
  const serviceSchema = buildServiceSchema({
    url: canonicalUrl,
    areaName: hub.name,
    state: hub.state,
  });
  
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'Service Areas', url: `${siteConfig.url}/service-areas` },
    { name: `${hub.name}, ${hub.state}`, url: canonicalUrl },
  ]);

  // FAQ data - same questions, but allow hub-specific customization
  const faqItems = [
    {
      question: 'Do you provide speakers and microphones?',
      answer: 'Yes! We provide a professional sound system including speakers, wireless microphones, and all necessary equipment. Our setup is designed to handle events of all sizes, from intimate gatherings to large venues.',
    },
    {
      question: 'How long does setup take?',
      answer: hub.hubSpecificNotes?.travelNote 
        ? `Setup typically takes 60-90 minutes before your event. ${hub.hubSpecificNotes.travelNote.split('.')[0]}.`
        : 'Setup typically takes 60-90 minutes before your event. We arrive early to ensure everything is perfect before your guests arrive.',
    },
    {
      question: 'Do you take song requests?',
      answer: 'Absolutely! We encourage song requests and can work with you to create a custom playlist. You can provide a "must-play" list, a "do-not-play" list, and we\'ll take requests from your guests during the event.',
    },
    {
      question: 'Do you travel outside 20 miles?',
      answer: hub.hubSpecificNotes?.travelNote
        ? `We primarily serve events within approximately 20 miles of ${hub.name}. ${hub.hubSpecificNotes.travelNote} For events beyond this radius, please contact us to discuss travel arrangements and any additional fees.`
        : `We primarily serve events within approximately 20 miles of ${hub.name}. For events beyond this radius, please contact us to discuss travel arrangements and any additional fees.`,
    },
    {
      question: 'Do you provide lighting?',
      answer: 'Yes! We offer professional lighting packages including uplighting, dance floor lighting, and special effects. Lighting can be customized to match your event theme and venue.',
    },
    {
      question: 'How do deposits work?',
      answer: 'We typically require a deposit to secure your date, with the remaining balance due closer to your event. Specific terms and amounts can be discussed during your consultation. We accept various payment methods for your convenience.',
    },
    {
      question: 'What types of events do you DJ?',
      answer: 'We DJ a wide variety of events including weddings, corporate events, birthday parties, anniversaries, school dances, and private celebrations. No event is too big or too small!',
    },
    {
      question: 'Can you help with event planning?',
      answer: 'While we focus on DJ services, we\'re happy to provide guidance on timing, music selection, and event flow. We work closely with event planners and coordinators to ensure everything runs smoothly.',
    },
  ];

  const faqSchema = buildFaqSchema(faqItems);

  return (
    <>
      <SeoJsonLd schema={[businessSchema, serviceSchema, breadcrumbSchema, faqSchema]} />
      
      <div className="min-h-screen bg-[#050509]">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-28 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="mb-6">
              <Link 
                href="/service-areas" 
                className="text-zinc-500 hover:text-[#FF2436] text-sm transition-colors"
              >
                ← Service Areas
              </Link>
            </nav>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="font-[family-name:var(--font-bebas-neue)] text-5xl sm:text-6xl lg:text-7xl text-[#F5F5F5] uppercase tracking-wide mb-6">
                  DJ Services in {hub.name}, {hub.state}
                </h1>
                <p className="text-xl text-zinc-400 max-w-3xl mb-4">
                  {hub.introCopy}
                </p>
                <p className="text-zinc-500 max-w-3xl">
                  We serve events within approximately 20 miles of {hub.name}, including the surrounding communities listed below.
                </p>
              </div>
              <div className="relative aspect-[4/3] comic-panel overflow-hidden">
                <Image
                  src={hubImage.src}
                  alt={`${hubImage.altBase} in ${hub.name}, ${hub.state}`}
                  fill
                  className={`object-cover ${hubSlug === 'pittsburgh-pa' ? 'object-center' : 'object-top'}`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Travel & Setup Section */}
        <section className="py-16 sm:py-24 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl text-[#F5F5F5] uppercase tracking-wide mb-8">
              Travel & Setup
            </h2>
            <div className="prose prose-invert max-w-3xl">
              <p className="text-zinc-400 text-lg leading-relaxed">
                {hub.hubSpecificNotes?.travelNote || `We typically travel within approximately 20 miles of ${hub.name} for events. Setup time is usually 60-90 minutes before your event, ensuring everything is perfect before your guests arrive.`}
              </p>
              {hub.hubSpecificNotes?.venueNote && (
                <p className="text-zinc-400 text-lg leading-relaxed mt-4">
                  {hub.hubSpecificNotes.venueNote}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Popular Events Section */}
        <section className="py-16 sm:py-24 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl text-[#F5F5F5] uppercase tracking-wide mb-8">
              Popular Events We DJ
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

        {/* Packages Section */}
        <section className="py-16 sm:py-24 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl text-[#F5F5F5] uppercase tracking-wide mb-8 text-center">
              Packages
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Essential Package */}
              <div className="comic-panel p-6 bg-zinc-900/50 border border-zinc-800">
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl text-[#F5F5F5] uppercase tracking-wide mb-4">
                  Essential
                </h3>
                <ul className="space-y-2 text-zinc-400 text-sm mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF2436] mt-1">◆</span>
                    <span>Up to 4 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF2436] mt-1">◆</span>
                    <span>Professional sound system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF2436] mt-1">◆</span>
                    <span>Wireless microphone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF2436] mt-1">◆</span>
                    <span>Basic lighting</span>
                  </li>
                </ul>
                <p className="text-zinc-500 text-xs">Perfect for intimate gatherings and smaller celebrations</p>
              </div>

              {/* Signature Package */}
              <div className="comic-panel p-6 bg-zinc-900/50 border-2 border-[#FF2436] shadow-[0_0_20px_rgba(255,36,54,0.2)]">
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl text-[#FF2436] uppercase tracking-wide mb-4">
                  Signature
                </h3>
                <ul className="space-y-2 text-zinc-400 text-sm mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF2436] mt-1">◆</span>
                    <span>Up to 6 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF2436] mt-1">◆</span>
                    <span>Premium sound system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF2436] mt-1">◆</span>
                    <span>MC services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF2436] mt-1">◆</span>
                    <span>Professional lighting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF2436] mt-1">◆</span>
                    <span>Custom playlist planning</span>
                  </li>
                </ul>
                <p className="text-zinc-500 text-xs">Ideal for weddings and milestone celebrations</p>
              </div>

              {/* Premier Package */}
              <div className="comic-panel p-6 bg-zinc-900/50 border border-zinc-800">
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl text-[#F5F5F5] uppercase tracking-wide mb-4">
                  Premier
                </h3>
                <ul className="space-y-2 text-zinc-400 text-sm mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF2436] mt-1">◆</span>
                    <span>8+ hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF2436] mt-1">◆</span>
                    <span>Concert-grade sound</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF2436] mt-1">◆</span>
                    <span>Full hosting services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF2436] mt-1">◆</span>
                    <span>Advanced lighting effects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF2436] mt-1">◆</span>
                    <span>Dedicated event coordination</span>
                  </li>
                </ul>
                <p className="text-zinc-500 text-xs">For large-scale galas and corporate events</p>
              </div>
            </div>
          </div>
        </section>

        {/* How Booking Works Section */}
        <section className="py-16 sm:py-24 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl text-[#F5F5F5] uppercase tracking-wide mb-8 text-center">
              How Booking Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#FF2436]/20 border-2 border-[#FF2436] flex items-center justify-center mx-auto mb-4">
                  <span className="font-[family-name:var(--font-bebas-neue)] text-3xl text-[#FF2436]">1</span>
                </div>
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-xl text-[#F5F5F5] uppercase tracking-wide mb-3">
                  Contact Us
                </h3>
                <p className="text-zinc-400 text-sm">
                  Reach out via our contact form or phone to discuss your event details, date, and requirements.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#FF2436]/20 border-2 border-[#FF2436] flex items-center justify-center mx-auto mb-4">
                  <span className="font-[family-name:var(--font-bebas-neue)] text-3xl text-[#FF2436]">2</span>
                </div>
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-xl text-[#F5F5F5] uppercase tracking-wide mb-3">
                  Consultation
                </h3>
                <p className="text-zinc-400 text-sm">
                  We&apos;ll review your vision, answer questions, and provide a customized quote for your event.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#FF2436]/20 border-2 border-[#FF2436] flex items-center justify-center mx-auto mb-4">
                  <span className="font-[family-name:var(--font-bebas-neue)] text-3xl text-[#FF2436]">3</span>
                </div>
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-xl text-[#F5F5F5] uppercase tracking-wide mb-3">
                  Confirm & Plan
                </h3>
                <p className="text-zinc-400 text-sm">
                  Secure your date with a deposit, then we&apos;ll work together to plan the perfect soundtrack for your event.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-24 border-b border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl text-[#F5F5F5] uppercase tracking-wide mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqItems.map((faq, index) => (
                <div key={index} className="comic-panel p-6 bg-zinc-900/50 border border-zinc-800">
                  <h3 className="font-[family-name:var(--font-bebas-neue)] text-xl text-[#F5F5F5] uppercase tracking-wide mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cities Section */}
        <section className="py-16 sm:py-24 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl text-[#F5F5F5] uppercase tracking-wide mb-8">
              Cities We Serve Near {hub.name}
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/service-areas/${hubSlug}/${city.slug}`}
                  className="comic-panel p-4 bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800 hover:border-[#FF2436]/50 transition-all group"
                >
                  <span className="text-zinc-400 group-hover:text-[#FF2436] transition-colors text-sm">
                    {city.name}, {city.state}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl text-[#F5F5F5] uppercase tracking-wide mb-6">
              Ready to Book Your Event in {hub.name}?
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can make your {hub.name} event unforgettable. 
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
          </div>
        </section>
      </div>
    </>
  );
}
