'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/music', label: 'Music' },
  { href: '/epk', label: 'EPK' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#050509]/95 backdrop-blur-sm border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Wordmark */}
          <Link 
            href="/" 
            className="font-display text-2xl sm:text-3xl text-[#F5F5F5] hover:text-[#FF2436] transition-colors tracking-wider"
          >
            MILES MORALES
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  px-4 py-2 text-sm font-medium transition-all relative
                  ${pathname === link.href 
                    ? 'text-[#FF2436]' 
                    : 'text-zinc-400 hover:text-[#F5F5F5]'
                  }
                  after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                  after:h-0.5 after:bg-[#FF2436] after:transition-all after:duration-300
                  ${pathname === link.href 
                    ? 'after:w-6' 
                    : 'after:w-0 hover:after:w-4'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-[#F5F5F5] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-[#050509]">
          <nav className="flex flex-col px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  py-3 px-4 text-lg font-medium border-l-2 transition-all
                  ${pathname === link.href 
                    ? 'text-[#FF2436] border-[#FF2436] bg-zinc-900/50' 
                    : 'text-zinc-400 border-transparent hover:text-[#F5F5F5] hover:border-zinc-600'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

