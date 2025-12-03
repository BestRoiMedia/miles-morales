import Link from 'next/link';

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
            <p className="text-zinc-500 text-sm">
              Chambersburg, PA · Available Nationwide
            </p>
          </div>

          {/* Right: Copyright & Contact Link */}
          <div className="text-center sm:text-right">
            <Link 
              href="/contact" 
              className="text-[#FF2436] hover:text-[#ff4d5c] text-sm font-medium transition-colors"
            >
              Book Now →
            </Link>
            <p className="text-zinc-600 text-xs mt-2">
              © {new Date().getFullYear()} DJ Miles Morales. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

