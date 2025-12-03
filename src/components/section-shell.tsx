'use client';

interface SectionShellProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionShell({ children, className = '' }: SectionShellProps) {
  return (
    <section className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ${className}`}>
      {children}
    </section>
  );
}

