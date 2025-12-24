import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-800 bg-[#050509]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Branding & Location */}
          <div className="text-center sm:text-left">
            <p className="font-display text-xl text-[#F5F5F5] tracking-wider mb-1">
              DJ MILES MORALES
            </p>
            <p className="text-zinc-500 text-sm mb-1">
              Chambersburg, PA · Available Nationwide
            </p>
            <a 
              href={`tel:${siteConfig.author.phone}`}
              className="text-[#FF2436] hover:text-[#ff4d5c] text-sm font-medium transition-colors"
            >
              {siteConfig.author.phone}
            </a>
          </div>

          {/* Right: Links & Copyright */}
          <div className="text-center sm:text-right">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-2">
              <Link 
                href="/service-areas" 
                className="text-zinc-400 hover:text-[#FF2436] text-sm font-medium transition-colors"
              >
                Service Areas
              </Link>
              <Link 
                href="/contact" 
                className="text-[#FF2436] hover:text-[#ff4d5c] text-sm font-medium transition-colors"
              >
                Book Now →
              </Link>
            </div>
            <p className="text-zinc-600 text-xs mt-2">
              © {new Date().getFullYear()} DJ Miles Morales. All rights reserved.
            </p>
          </div>
        </div>
        {/* Built by credit */}
        <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
          <p className="text-zinc-600 text-xs">
            Built by{' '}
            <a 
              href="https://bestroi.media" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-[#FF2436] transition-colors"
            >
              Best ROI Media
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

