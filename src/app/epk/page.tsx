import Image from 'next/image';
import { SectionShell } from '@/components/section-shell';
import { ComicCard } from '@/components/comic-card';
import { ComicMusicPlayer } from '@/components/comic-music-player';
import { epkTracks } from '@/data/tracks';
import Link from 'next/link';

export const metadata = {
  title: 'EPK - Electronic Press Kit | DJ Miles Morales',
  description: 'DJ Miles Morales Electronic Press Kit. Background, experience, and signature mixes for promoters and corporate clients.',
};

export default function EPKPage() {
  return (
    <>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="comic-panel aspect-square overflow-hidden group relative">
              <Image
                src="/images/dj-miles-morales.jpg"
                alt="DJ Miles Morales - Portrait"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="comic-panel aspect-square overflow-hidden group relative">
              <Image
                src="/images/miles-morales-bw.jpg"
                alt="DJ Miles Morales - B&W Portrait"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="comic-panel aspect-square overflow-hidden group relative">
              <Image
                src="/images/djing-at-a-wedding.jpg"
                alt="DJ Miles Morales - Wedding Setup"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="comic-panel aspect-square overflow-hidden group relative">
              <Image
                src="/images/dj-miles-djing.jpg"
                alt="DJ Miles Morales - Pool Party"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
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
            <ComicCard title="Background & Radio">
              <div className="mt-4 space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  Miles Morales is the owner of <strong className="text-[#F5F5F5]">&quot;Not Your Average DJ&apos;s&quot;</strong>, a premier DJ entertainment company. He&apos;s also a proud member of <strong className="text-[#F5F5F5]">&quot;The Beat Committee&quot;</strong> on Now 92.1, where he regularly showcases his signature sound to listeners across the region.
                </p>
                <p>
                  As a resident DJ, Miles has built a reputation for reliability, energy, and the ability to read any room — skills honed over years of performing at diverse venues and events.
                </p>
              </div>
            </ComicCard>

            <ComicCard title="Experience & Versatility">
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
          <ComicCard title="Events & Venues" className="max-w-none">
            <div className="mt-4 grid sm:grid-cols-2 gap-4 text-zinc-400">
              <div>
                <h4 className="text-[#F5F5F5] font-medium mb-2">Event Types</h4>
                <ul className="space-y-1 text-sm">
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
                <h4 className="text-[#F5F5F5] font-medium mb-2">Geographic Range</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Based in Chambersburg, PA</li>
                  <li>• Available nationwide</li>
                  <li>• New York City</li>
                  <li>• Los Angeles</li>
                  <li>• Miami</li>
                  <li>• And everywhere in between</li>
                </ul>
              </div>
            </div>
          </ComicCard>
        </SectionShell>
      </section>

      {/* Musical Diversity */}
      <section className="border-t border-zinc-800">
        <SectionShell>
          <ComicCard title="Musical Diversity" accentBorder glowEffect>
            <div className="mt-4">
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
          </ComicCard>
        </SectionShell>
      </section>

      {/* Professionalism & Service */}
      <section className="border-t border-zinc-800">
        <SectionShell>
          <ComicCard title="Professionalism & Service">
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

