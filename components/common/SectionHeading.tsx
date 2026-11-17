import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  badge,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 sm:mb-12 ${centered ? 'text-center' : 'text-left'}`}>
      {badge && (
        <span className="inline-block px-3 py-1 mb-3 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-700 text-xs font-semibold uppercase tracking-widest">
          {badge}
        </span>
      )}
      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal-900 tracking-tight">
        {title}
      </h2>
      <div className={`flex items-center gap-3 my-3 ${centered ? 'justify-center' : 'justify-start'}`}>
        <span className="w-10 h-[1px] bg-gold-500/40" />
        <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
        <span className="w-10 h-[1px] bg-gold-500/40" />
      </div>
      {subtitle && (
        <p className="text-charcoal-500 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
