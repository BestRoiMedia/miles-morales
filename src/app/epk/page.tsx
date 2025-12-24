import Link from 'next/link';
import type { Metadata } from 'next';
import { SectionShell } from '@/components/section-shell';
import { ComicCard } from '@/components/comic-card';
import { ComicMusicPlayer } from '@/components/comic-music-player';
import { RotatingVinylGallery } from '@/components/rotating-vinyl-gallery';
import { epkTracks } from '@/data/tracks';
import { siteConfig } from '@/config/site';
import { SeoJsonLd } from '@/components/seo-json-ld';
import { generatePersonSchema, generateAllServicesSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'EPK – Electronic Press Kit | Open-Format DJ for Corporate, Fashion & Luxury Events',
  description: 'DJ Miles Morales Electronic Press Kit. 15+ years of experience, 500+ events performed, serving 50+ cities nationwide. Background, experience, and signature mixes for promoters and corporate clients.',
  openGraph: {
    title: 'Electronic Press Kit | DJ Miles Morales',
    description: 'Professional DJ with 15+ years experience. Press photos, signature mixes, and booking information for promoters and corporate clients.',
    url: `${siteConfig.url}/epk`,
    siteName: siteConfig.name,
    type: 'website',
  },
  alternates: {
    canonical: `${siteConfig.url}/epk`,
  },
};

export default function EPKPage() {
  // Generate schemas for EPK page
  const personSchema = generatePersonSchema({ extended: true });
  const serviceSchemas = generateAllServicesSchema();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <SeoJsonLd schema={[personSchema, ...serviceSchemas]} />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 border-b border-zinc-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#050509] to-[#1a0004]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FF2436]/5 blur-3xl" />
        
        <SectionShell className="relative z-10">
          <span className="inline-block px-3 py-1 bg-[#FF2436]/10 border border-[#FF2436]/30 rounded-full text-[#FF2436] text-xs font-bold uppercase tracking-widest mb-4">
            Electronic Press Kit
          </span>
          <h1 className="font-[family-name:var(--font-bebas-neue)] text-5xl sm:text-6xl lg:text-7xl text-[#F5F5F5] uppercase tracking-tight mb-4">
            EPK — DJ Miles Morales
          </h1>
          <p className="text-zinc-400 text-xl max-w-3xl">
            Not your average DJ. From corporate galas to national radio, Miles Morales brings unmatched versatility and professionalism to every performance.
          </p>
        </SectionShell>
      </section>

      {/* Photo Gallery */}
      <section className="py-12 border-b border-zinc-800 bg-zinc-900/30">
        <SectionShell>
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-2xl text-[#F5F5F5] uppercase tracking-wide mb-6">
            Press Photos
          </h2>
          <RotatingVinylGallery
            images={[
              {
                id: 1,
                title: "DJ Miles Morales",
                image: "https://images.bestroi.media/miles-morales/DSC_0464%202.avif",
              },
              {
                id: 2,
                title: "Live Performance",
                image: "https://images.bestroi.media/miles-morales/Facetune_14-12-2025-10-45-12.avif",
              },
              {
                id: 3,
                title: "Behind the Decks",
                image: "https://images.bestroi.media/miles-morales/IMG_1338.avif",
              },
              {
                id: 4,
                title: "Event Setup",
                image: "https://images.bestroi.media/miles-morales/IMG_4879.avif",
              },
              {
                id: 5,
                title: "Club Performance",
                image: "https://images.bestroi.media/miles-morales/IMG_5089.avif",
              },
              {
                id: 6,
                title: "Live Mix",
                image: "https://images.bestroi.media/miles-morales/IMG_6309.avif",
              },
              {
                id: 7,
                title: "DJ Session",
                image: "https://images.bestroi.media/miles-morales/IMG_6352.avif",
              },
              {
                id: 8,
                title: "Professional Setup",
                image: "https://images.bestroi.media/miles-morales/Koran%20%281%29.avif",
              },
              {
                id: 9,
                title: "Event Performance",
                image: "https://images.bestroi.media/miles-morales/image0.avif",
              },
              {
                id: 10,
                title: "Live DJ Set",
                image: "https://images.bestroi.media/miles-morales/image1.avif",
              },
              {
                id: 11,
                title: "Club Night",
                image: "https://images.bestroi.media/miles-morales/image10.avif",
              },
              {
                id: 12,
                title: "Mixing Session",
                image: "https://images.bestroi.media/miles-morales/image11.avif",
              },
              {
                id: 13,
                title: "Event DJ",
                image: "https://images.bestroi.media/miles-morales/image12.avif",
              },
              {
                id: 14,
                title: "Live Performance",
                image: "https://images.bestroi.media/miles-morales/image13.avif",
              },
              {
                id: 15,
                title: "Professional DJ",
                image: "https://images.bestroi.media/miles-morales/image16.avif",
              },
              {
                id: 16,
                title: "Club Performance",
                image: "https://images.bestroi.media/miles-morales/image17.avif",
              },
              {
                id: 17,
                title: "DJ Miles Morales",
                image: "https://images.bestroi.media/miles-morales/image2.avif",
              },
              {
                id: 18,
                title: "Event Setup",
                image: "https://images.bestroi.media/miles-morales/image20.avif",
              },
              {
                id: 19,
                title: "Live Mix",
                image: "https://images.bestroi.media/miles-morales/image21.avif",
              },
              {
                id: 20,
                title: "Behind the Decks",
                image: "https://images.bestroi.media/miles-morales/image22.avif",
              },
              {
                id: 21,
                title: "DJ Session",
                image: "https://images.bestroi.media/miles-morales/image4.avif",
              },
              {
                id: 22,
                title: "Professional Setup",
                image: "https://images.bestroi.media/miles-morales/image5.avif",
              },
              {
                id: 23,
                title: "Event Performance",
                image: "https://images.bestroi.media/miles-morales/image6.avif",
              },
              {
                id: 24,
                title: "Live DJ Set",
                image: "https://images.bestroi.media/miles-morales/image7.avif",
              },
              {
                id: 25,
                title: "Club Night",
                image: "https://images.bestroi.media/miles-morales/image8.avif",
              },
              {
                id: 26,
                title: "Mixing Session",
                image: "https://images.bestroi.media/miles-morales/image9.avif",
              },
            ]}
          />
        </SectionShell>
      </section>

      {/* Quick Stats */}
      <section className="py-12 border-b border-zinc-800 bg-zinc-900/20">
        <SectionShell>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Years Experience', value: '15+' },
              { label: 'Events Performed', value: '500+' },
              { label: 'Cities Nationwide', value: '50+' },
              { label: 'Radio Show', value: 'Now 92.1' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl text-[#FF2436]">
                  {stat.value}
                </p>
                <p className="text-zinc-500 text-sm uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </SectionShell>
      </section>

      {/* Signature Mixes */}
      <SectionShell>
        <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl text-[#F5F5F5] uppercase tracking-wide mb-6">
          Signature Mixes
        </h2>
        <ComicMusicPlayer tracks={epkTracks} />
      </SectionShell>

      {/* Background & Radio */}
      <section className="border-t border-zinc-800">
        <SectionShell>
          <div className="grid lg:grid-cols-2 gap-8">
            <ComicCard title="Background & Radio" headingLevel="h2">
              <div className="mt-4 space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  Miles Morales is the owner of <strong className="text-[#F5F5F5]">&quot;Not Your Average DJ&apos;s&quot;</strong>, a premier DJ entertainment company. He&apos;s also a proud member of <strong className="text-[#F5F5F5]">&quot;The Beat Committee&quot;</strong> on Now 92.1, where he regularly showcases his signature sound to listeners across the region.
                </p>
                <p>
                  As a resident DJ, Miles has built a reputation for reliability, energy, and the ability to read any room — skills honed over years of performing at diverse venues and events.
                </p>
              </div>
            </ComicCard>

            <ComicCard title="Experience & Versatility" headingLevel="h2">
              <div className="mt-4 space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  Raised by his grandparents, Miles grew up surrounded by music. From Big Band and Rock to Motown and Disco, the house was never quiet. This early exposure shaped his eclectic taste and deep appreciation for all genres.
                </p>
                <p>
                  Miles started DJing at <strong className="text-[#F5F5F5]">15 years old</strong>, filling in as an assistant at a wedding when the main DJ needed help. That night, he discovered his gift for understanding crowds and playing exactly what they need to hear.
                </p>
              </div>
            </ComicCard>
          </div>
        </SectionShell>
      </section>

      {/* Events & Venues */}
      <section className="border-t border-zinc-800">
        <SectionShell>
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl text-[#F5F5F5] uppercase tracking-wide mb-6">
            Events &amp; Venues
          </h2>
          <div className="comic-panel bg-zinc-900/50 p-6 border-zinc-800">
            <div className="grid sm:grid-cols-2 gap-6 text-zinc-400">
              <div>
                <h3 className="text-[#F5F5F5] font-medium mb-3 text-lg">Event Types</h3>
                <ul className="space-y-1.5 text-sm">
                  <li>• Weddings (conservative to youthful)</li>
                  <li>• Corporate events & conferences</li>
                  <li>• Red carpet premieres</li>
                  <li>• Fashion shows</li>
                  <li>• Birthday celebrations</li>
                  <li>• Nightclub residencies</li>
                  <li>• Restaurant & lounge sets</li>
                </ul>
              </div>
              <div>
                <h3 className="text-[#F5F5F5] font-medium mb-3 text-lg">Geographic Range</h3>
                <ul className="space-y-1.5 text-sm">
                  <li>• Based in Chambersburg, PA</li>
                  <li>• Available nationwide</li>
                  <li>• New York City</li>
                  <li>• Los Angeles</li>
                  <li>• Miami</li>
                  <li>• And everywhere in between</li>
                </ul>
              </div>
            </div>
          </div>
        </SectionShell>
      </section>

      {/* Musical Diversity */}
      <section className="border-t border-zinc-800">
        <SectionShell>
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl text-[#F5F5F5] uppercase tracking-wide mb-6">
            Musical Diversity
          </h2>
          <div className="comic-panel bg-zinc-900/50 p-6 border-[#FF2436] shadow-[0_0_20px_rgba(255,36,54,0.2)]">
            <p className="text-zinc-400 leading-relaxed mb-4">
              Miles&apos; genre is best described as <em>&quot;everything you love to hear.&quot;</em> His extensive collection spans decades and styles, allowing him to create the perfect atmosphere for any event.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'Current Top 40',
                'House & Techno',
                'Hip Hop',
                'Reggae',
                'Rock',
                'Salsa',
                'Neo Soul',
                "70s Disco",
                "80s Classics",
                "90s Hits",
                'Big Band',
                'Motown',
                'R&B',
                'EDM',
                'Latin',
              ].map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1.5 bg-[#FF2436]/10 border border-[#FF2436]/30 rounded-lg text-zinc-300 text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </SectionShell>
      </section>

      {/* Professionalism & Service */}
      <section className="border-t border-zinc-800">
        <SectionShell>
          <ComicCard title="Professionalism & Service" headingLevel="h2">
            <div className="mt-4 space-y-4 text-zinc-400 leading-relaxed">
              <p>
                When you book Miles Morales, you&apos;re getting more than a DJ — you&apos;re getting a true professional who takes pride in every performance. His skills include:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-[#FF2436] mt-1">◆</span>
                  <span><strong className="text-[#F5F5F5]">Beat-Mixing Excellence</strong> — Seamless transitions that keep the energy flowing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF2436] mt-1">◆</span>
                  <span><strong className="text-[#F5F5F5]">MC Ability</strong> — Professional announcements and crowd engagement when needed</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF2436] mt-1">◆</span>
                  <span><strong className="text-[#F5F5F5]">Reliability</strong> — Always on time, always prepared, always professional</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF2436] mt-1">◆</span>
                  <span><strong className="text-[#F5F5F5]">Crowd Reading</strong> — The ability to sense what the room needs and deliver</span>
                </li>
              </ul>
              <p className="pt-4 border-t border-zinc-800 text-[#F5F5F5]">
                <strong>Bottom line:</strong> Miles Morales is a DJ you can rely on to deliver first-class service and get the job done right, every time.
              </p>
            </div>
          </ComicCard>
        </SectionShell>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-zinc-800 bg-gradient-to-b from-zinc-900/50 to-transparent">
        <SectionShell className="text-center">
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl text-[#F5F5F5] uppercase tracking-wide mb-4">
            Book DJ Miles Morales
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Ready to elevate your event? Get in touch to discuss availability and packages.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#FF2436] hover:bg-[#ff4d5c] text-white font-display text-xl uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-red-500/20 hover:shadow-red-500/30 hover:-translate-y-0.5"
          >
            Contact for Booking
          </Link>
        </SectionShell>
      </section>
    </>
  );
}
