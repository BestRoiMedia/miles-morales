import Image from 'next/image';
import type { Metadata } from 'next';
import { SectionShell } from '@/components/section-shell';
import { ComicCard } from '@/components/comic-card';
import { siteConfig } from '@/config/site';
import { SeoJsonLd } from '@/components/seo-json-ld';
import { generatePersonSchema } from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: 'About – Open-Format DJ for Corporate, Fashion & Luxury Events',
  description: 'Learn about DJ Miles Morales — a skillful, experienced, and versatile open-format DJ based in Chambersburg, PA. From corporate galas to weddings, Miles brings the perfect energy to every event.',
  openGraph: {
    title: 'About DJ Miles Morales',
    description: 'Skillful, experienced, and versatile. Learn about one of the premier open-format DJs in the country.',
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    type: 'website',
  },
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  // Generate extended Person schema for about page
  const personSchema = generatePersonSchema({ extended: true });

  return (
    <>
      {/* JSON-LD Structured Data */}
      <SeoJsonLd schema={personSchema} />

      {/* Page Header */}
      <section className="pt-12 pb-8 border-b border-zinc-800">
        <SectionShell>
          <span className="inline-block px-3 py-1 bg-[#FF2436]/10 border border-[#FF2436]/30 rounded-full text-[#FF2436] text-xs font-bold uppercase tracking-widest mb-4">
            About
          </span>
          <h1 className="font-[family-name:var(--font-bebas-neue)] text-5xl sm:text-6xl lg:text-7xl text-[#F5F5F5] uppercase tracking-tight">
            About Miles Morales
          </h1>
        </SectionShell>
      </section>

      {/* Main Content */}
      <SectionShell>
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: Text Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Intro */}
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-xl text-zinc-300 leading-relaxed">
                Skillful, experienced, and versatile in his turntable style, <strong className="text-[#F5F5F5]">DJ Miles Morales</strong> can rock any occasion. Defining his genre as <em>&quot;everything you love to hear,&quot;</em> Miles is quickly becoming one of the premier open-format DJs in the country.
              </p>
            </div>

            {/* What He's Known For */}
            <ComicCard title="What He's Known For" headingLevel="h2">
              <ul className="mt-4 space-y-3 text-zinc-400">
                <li className="flex items-start gap-3">
                  <span className="text-[#FF2436] mt-1">◆</span>
                  <span>Corporate events, red carpets, and fashion shows</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF2436] mt-1">◆</span>
                  <span>Weddings that range from conservative to youthful crowds</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF2436] mt-1">◆</span>
                  <span>Musical diversity and exceptional turntable skills</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF2436] mt-1">◆</span>
                  <span>Reading the room and understanding what the crowd needs</span>
                </li>
              </ul>
            </ComicCard>

            {/* Genres He Blends */}
            <ComicCard title="Genres He Blends" headingLevel="h2">
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  'Current Top 40',
                  'House & Techno',
                  'Hip Hop',
                  'Reggae',
                  'Rock',
                  'Salsa',
                  'Neo Soul',
                  "70s Guilty Pleasures",
                  "80s Classics",
                  "90s Hits",
                  'Big Band',
                  'Motown',
                  'Disco',
                ].map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-300 text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </ComicCard>

            {/* The Music Collection */}
            <ComicCard title="The Music Collection" headingLevel="h2">
              <p className="mt-4 text-zinc-400 leading-relaxed">
                Miles has built an extensive and eclectic music collection over his years behind the decks. This vast library allows him to create the perfect atmosphere at any event — whether you need sophisticated background music for a cocktail hour or high-energy bangers to pack the dance floor.
              </p>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                With music spanning decades and genres, Miles can seamlessly transition between styles, keeping every generation entertained and engaged throughout your event.
              </p>
            </ComicCard>
          </div>

          {/* Right: Photo Gallery */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Photo - B&W Portrait */}
            <div className="comic-panel aspect-[4/5] overflow-hidden rotate-2 hover:rotate-0 transition-transform">
              <Image
                src="https://images.bestroi.media/miles-morales/image11.avif"
                alt="DJ Miles Morales - Portrait"
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Secondary Photo - Wedding Setup */}
            <div className="comic-panel aspect-square overflow-hidden -rotate-1 hover:rotate-0 transition-transform">
              <Image
                src="https://images.bestroi.media/miles-morales/image7.avif"
                alt="DJ Miles Morales at a wedding"
                fill
                className="object-cover object-center"
              />
            </div>

            {/* Third Photo - Club Performance */}
            <div className="comic-panel aspect-video overflow-hidden rotate-1 hover:rotate-0 transition-transform">
              <Image
                src="https://images.bestroi.media/miles-morales/image9.avif"
                alt="DJ Miles Morales performing at a club"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </SectionShell>

      {/* Quote Section */}
      <section className="py-16 border-t border-zinc-800 bg-zinc-900/20">
        <SectionShell>
          <blockquote className="text-center">
            <p className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F5] uppercase tracking-wide leading-tight mb-6">
              &quot;I play everything you love to hear — because music should bring people together.&quot;
            </p>
            <cite className="text-[#FF2436] font-medium not-italic">— DJ Miles Morales</cite>
          </blockquote>
        </SectionShell>
      </section>
    </>
  );
}
