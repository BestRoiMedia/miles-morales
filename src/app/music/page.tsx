import { SectionShell } from '@/components/section-shell';
import { ComicMusicPlayer } from '@/components/comic-music-player';
import { tracks } from '@/data/tracks';

export const metadata = {
  title: 'Music & Mixes | DJ Miles Morales',
  description: 'Listen to DJ Miles Morales mixes and get a taste of what he brings to events. Custom mixes for corporate events, weddings, and nightlife.',
};

export default function MusicPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-12 pb-8 border-b border-zinc-800">
        <SectionShell>
          <span className="inline-block px-3 py-1 bg-[#FF2436]/10 border border-[#FF2436]/30 rounded-full text-[#FF2436] text-xs font-bold uppercase tracking-widest mb-4">
            Listen
          </span>
          <h1 className="font-[family-name:var(--font-bebas-neue)] text-5xl sm:text-6xl lg:text-7xl text-[#F5F5F5] uppercase tracking-tight mb-4">
            Music &amp; Mixes
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            A taste of Miles Morales behind the decks. Custom mixes for events, brands, and nightlife — spanning every genre and energy level.
          </p>
        </SectionShell>
      </section>

      {/* Music Player Section */}
      <SectionShell>
        <ComicMusicPlayer tracks={tracks} />
      </SectionShell>

      {/* Additional Info */}
      <section className="pb-16 border-t border-zinc-800">
        <SectionShell>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="comic-panel bg-zinc-900/30 p-6">
              <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl text-[#F5F5F5] uppercase tracking-wide mb-3">
                Custom Event Mixes
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Need a custom mix for your event, brand activation, or project? Miles creates tailored soundscapes that match your vision and audience perfectly.
              </p>
            </div>
            <div className="comic-panel bg-zinc-900/30 p-6">
              <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl text-[#F5F5F5] uppercase tracking-wide mb-3">
                Live on Now 92.1
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Catch Miles spinning live as part of &quot;The Beat Committee&quot; on Now 92.1. Tune in for the latest mixes and get a taste of his signature sound.
              </p>
            </div>
          </div>
        </SectionShell>
      </section>
    </>
  );
}

