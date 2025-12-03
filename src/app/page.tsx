import Link from 'next/link';
import Image from 'next/image';
import { ComicCard } from '@/components/comic-card';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#050509] to-[#1a0004]" />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF2436]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF2436]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 bg-[#FF2436]/10 border border-[#FF2436]/30 rounded-full text-[#FF2436] text-xs font-bold uppercase tracking-widest mb-6">
                Open-Format DJ
              </span>
              
              <h1 className="font-[family-name:var(--font-bebas-neue)] text-6xl sm:text-7xl lg:text-8xl xl:text-9xl text-[#F5F5F5] uppercase leading-[0.85] tracking-tight mb-6">
                DJ Miles
                <span className="block text-[#FF2436]">Morales</span>
              </h1>

              <p className="text-xl sm:text-2xl text-zinc-400 font-light mb-4 max-w-xl mx-auto lg:mx-0">
                Open-Format DJ for Corporate, Fashion, &amp; Luxury Events
              </p>
              
              <p className="text-zinc-500 mb-8 max-w-lg mx-auto lg:mx-0">
                From Chambersburg to LA, spinning everything you love to hear.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#FF2436] hover:bg-[#ff4d5c] text-white font-display text-xl uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-red-500/20 hover:shadow-red-500/30 hover:-translate-y-0.5"
                >
                  Book Miles
                </Link>
                <Link
                  href="/music"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-display text-xl uppercase tracking-wider rounded-lg transition-all hover:-translate-y-0.5"
                >
                  Listen to a Mix
                </Link>
              </div>
            </div>

            {/* Right - Hero Photo */}
            <div className="relative">
              <div className="comic-panel aspect-[3/4] overflow-hidden group">
                <Image
                  src="/images/dj-miles-morales.jpg"
                  alt="DJ Miles Morales"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                
                {/* Decorative corners */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#FF2436] z-10" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#FF2436] z-10" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#FF2436] z-10" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#FF2436] z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Types Strip / Marquee */}
      <section className="relative border-y border-zinc-800 bg-zinc-900/30 py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              {['Corporate Events', 'Red Carpets', 'Fashion Shows', 'Weddings', 'Nightlife', 'Private Parties', 'Radio'].map((item, j) => (
                <span key={j} className="flex items-center">
                  <span className="px-8 text-zinc-400 font-display text-lg sm:text-xl uppercase tracking-widest">
                    {item}
                  </span>
                  <span className="text-[#FF2436]">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl text-[#F5F5F5] uppercase tracking-wide mb-4">
              What I Do
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#FF2436] to-transparent mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Corporate & Brand Events */}
            <div className="comic-panel overflow-hidden group">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/vinylcon.jpg"
                  alt="Corporate Events"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 bg-zinc-900/80">
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl sm:text-3xl text-[#F5F5F5] uppercase tracking-wide mb-3">
                  Corporate &amp; Brand Events
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  From Fortune 500 galas to product launches, I bring the perfect energy to elevate your brand. Professional, polished, and always on-point.
                </p>
              </div>
            </div>

            {/* Weddings & Private Events */}
            <div className="comic-panel overflow-hidden group border-[#FF2436] shadow-[0_0_20px_rgba(255,36,54,0.2)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/djing-at-a-wedding.jpg"
                  alt="Wedding DJ Setup"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 bg-zinc-900/80">
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl sm:text-3xl text-[#F5F5F5] uppercase tracking-wide mb-3">
                  Weddings &amp; Private Events
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Your special day deserves a soundtrack as unique as your love story. I read the room and keep everyone dancing from cocktail hour to last call.
                </p>
              </div>
            </div>

            {/* Clubs, Radio, & Residencies */}
            <div className="comic-panel overflow-hidden group">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/djing-at-a-club.jpg"
                  alt="Club Performance"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 bg-zinc-900/80">
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl sm:text-3xl text-[#F5F5F5] uppercase tracking-wide mb-3">
                  Clubs, Radio, &amp; Residencies
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  From intimate lounges to packed nightclubs, and live on Now 92.1 — I know how to move a crowd and keep the energy climbing all night.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F5] uppercase tracking-wide mb-6">
            Ready to Make Your Event Unforgettable?
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            Let&apos;s talk about your vision. Whether it&apos;s an intimate gathering or a thousand-person gala, I&apos;ll bring the energy and expertise to make it legendary.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#FF2436] hover:bg-[#ff4d5c] text-white font-display text-xl uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-red-500/20 hover:shadow-red-500/30 hover:-translate-y-0.5"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
