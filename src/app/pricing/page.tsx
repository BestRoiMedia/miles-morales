import Link from 'next/link';
import type { Metadata } from 'next';
import { SectionShell } from '@/components/section-shell';
import { siteConfig } from '@/config/site';
import { SeoJsonLd } from '@/components/seo-json-ld';
import { generatePricingServiceSchemas } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'Pricing & Packages – Open-Format DJ for Corporate, Fashion & Luxury Events',
  description: 'DJ Miles Morales pricing packages for weddings, corporate events, and private parties. Starting at $1,999 for Essential Events, $3,499 for Signature Events, and $4,999 for Premier & Corporate.',
  openGraph: {
    title: 'Pricing & Packages | DJ Miles Morales',
    description: 'Professional DJ packages for weddings, corporate events, and private parties. Customized packages available.',
    url: `${siteConfig.url}/pricing`,
    siteName: siteConfig.name,
    type: 'website',
  },
  alternates: {
    canonical: `${siteConfig.url}/pricing`,
  },
};

const pricingTiers = [
  {
    name: 'Essential Events',
    price: 'Starting at $1,999',
    description: 'Perfect for intimate gatherings, birthday parties, and smaller celebrations.',
    features: [
      'Up to 4 hours of DJ services',
      'Professional sound system (up to 100 guests)',
      'Music consultation & planning',
      'Custom playlist curation',
      'Standard lighting package',
      'Setup & breakdown included',
    ],
    highlight: false,
  },
  {
    name: 'Signature Events',
    price: 'Starting at $3,499',
    description: 'Ideal for weddings, milestone celebrations, and mid-size corporate events.',
    features: [
      'Up to 6 hours of DJ services',
      'Premium sound system (up to 250 guests)',
      'Full music consultation & planning',
      'Custom playlist curation',
      'Enhanced lighting & effects',
      'MC services included',
      'Wireless microphone for speeches',
      'Early setup & sound check',
    ],
    highlight: true,
  },
  {
    name: 'Premier & Corporate',
    price: 'Starting at $4,999',
    description: 'For large-scale galas, corporate events, fashion shows, and luxury celebrations.',
    features: [
      'Up to 8+ hours of DJ services',
      'Concert-grade sound system',
      'Dedicated event coordinator',
      'Multi-room capability',
      'Professional lighting design',
      'Full MC & hosting services',
      'Backup equipment on-site',
      'Travel available nationwide',
      'Additional musicians/performers on request',
    ],
    highlight: false,
  },
];

export default function PricingPage() {
  // Generate pricing service schemas
  const serviceSchemas = generatePricingServiceSchemas();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <SeoJsonLd schema={serviceSchemas} />

      {/* Page Header */}
      <section className="pt-12 pb-8 border-b border-zinc-800">
        <SectionShell>
          <span className="inline-block px-3 py-1 bg-[#FF2436]/10 border border-[#FF2436]/30 rounded-full text-[#FF2436] text-xs font-bold uppercase tracking-widest mb-4">
            Packages
          </span>
          <h1 className="font-[family-name:var(--font-bebas-neue)] text-5xl sm:text-6xl lg:text-7xl text-[#F5F5F5] uppercase tracking-tight mb-4">
            Pricing
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Every event is unique. These packages are starting points — let&apos;s discuss your specific needs and create the perfect experience for your occasion.
          </p>
        </SectionShell>
      </section>

      {/* Pricing Cards */}
      <SectionShell>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`
                comic-panel p-6 sm:p-8 flex flex-col
                ${tier.highlight 
                  ? 'border-[#FF2436] shadow-[0_0_30px_rgba(255,36,54,0.2)] scale-[1.02] relative z-10' 
                  : 'border-zinc-800'
                }
              `}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FF2436] text-white text-xs font-bold uppercase tracking-wider rounded-full">
                  Most Popular
                </span>
              )}

              <div className="mb-6">
                <h2 className="font-[family-name:var(--font-bebas-neue)] text-2xl sm:text-3xl text-[#F5F5F5] uppercase tracking-wide mb-2">
                  {tier.name}
                </h2>
                <p className="text-zinc-500 text-sm mb-4">
                  {tier.description}
                </p>
                <p className={`font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl ${tier.highlight ? 'text-[#FF2436]' : 'text-zinc-300'}`}>
                  {tier.price}
                </p>
              </div>

              <ul className="space-y-3 flex-grow">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-zinc-400 text-sm">
                    <svg className={`w-5 h-5 flex-shrink-0 ${tier.highlight ? 'text-[#FF2436]' : 'text-zinc-600'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`
                  mt-8 w-full py-3 px-6 rounded-lg font-display text-lg uppercase tracking-wider text-center transition-all
                  ${tier.highlight 
                    ? 'bg-[#FF2436] hover:bg-[#ff4d5c] text-white shadow-lg shadow-red-500/20' 
                    : 'border-2 border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white'
                  }
                `}
              >
                Get Quote
              </Link>
              <p className="text-zinc-600 text-xs text-center mt-3">
                Travel fees may apply for events outside PA/MD/VA/WV
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* Additional Info */}
      <section className="border-t border-zinc-800">
        <SectionShell>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="comic-panel bg-zinc-900/30 p-6">
              <h2 className="font-[family-name:var(--font-bebas-neue)] text-2xl text-[#F5F5F5] uppercase tracking-wide mb-4">
                What&apos;s Always Included
              </h2>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[#FF2436]">◆</span>
                  Pre-event consultation and planning
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF2436]">◆</span>
                  Professional-grade equipment
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF2436]">◆</span>
                  Liability insurance
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF2436]">◆</span>
                  Backup equipment on-site
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF2436]">◆</span>
                  Setup and breakdown
                </li>
              </ul>
            </div>

            <div className="comic-panel bg-zinc-900/30 p-6">
              <h2 className="font-[family-name:var(--font-bebas-neue)] text-2xl text-[#F5F5F5] uppercase tracking-wide mb-4">
                Custom &amp; Add-Ons
              </h2>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[#FF2436]">◆</span>
                  Extended hours available
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF2436]">◆</span>
                  Additional sound for cocktail hour
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF2436]">◆</span>
                  Uplighting & specialty lighting
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF2436]">◆</span>
                  Photo booth integration
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF2436]">◆</span>
                  Live musicians collaboration
                </li>
              </ul>
            </div>
          </div>
        </SectionShell>
      </section>

      {/* Travel Note */}
      <section className="border-t border-zinc-800 bg-zinc-900/20">
        <SectionShell>
          <div className="text-center">
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-2xl text-[#F5F5F5] uppercase tracking-wide mb-3">
              Travel Information
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Based in Chambersburg, PA and available nationwide. Travel fees may apply for events outside the local area. Contact for a custom quote that includes all travel arrangements.
            </p>
          </div>
        </SectionShell>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-zinc-800">
        <SectionShell className="text-center">
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl text-[#F5F5F5] uppercase tracking-wide mb-4">
            Let&apos;s Talk About Your Event
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Every event is unique, and pricing is tailored to your specific needs. Reach out for a custom quote.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#FF2436] hover:bg-[#ff4d5c] text-white font-display text-xl uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-red-500/20 hover:shadow-red-500/30 hover:-translate-y-0.5"
          >
            Request a Quote
          </Link>
        </SectionShell>
      </section>
    </>
  );
}
