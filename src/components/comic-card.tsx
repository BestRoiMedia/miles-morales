'use client';

interface ComicCardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  accentBorder?: boolean;
  glowEffect?: boolean;
}

export function ComicCard({ 
  title, 
  description, 
  children, 
  className = '',
  accentBorder = false,
  glowEffect = false
}: ComicCardProps) {
  return (
    <div 
      className={`
        comic-panel 
        bg-zinc-900/50 
        p-6 
        ${accentBorder ? 'border-[#FF2436]' : 'border-zinc-800'}
        ${glowEffect ? 'shadow-[0_0_20px_rgba(255,36,54,0.2)]' : ''}
        ${className}
      `}
    >
      <h3 className="font-display text-2xl sm:text-3xl text-[#F5F5F5] uppercase tracking-wide mb-3">
        {title}
      </h3>
      {description && (
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

