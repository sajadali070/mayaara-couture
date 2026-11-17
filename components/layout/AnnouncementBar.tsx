'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n/context';
import { siteConfig } from '@/site.config';
import { Globe, Phone, Sparkles } from 'lucide-react';

export default function AnnouncementBar() {
  const { locale, toggleLocale } = useTranslation();

  return (
    <div className="bg-maroon-900 text-ivory-100 text-xs py-2 px-4 border-b border-maroon-800 tracking-wide">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Contact or boutique note */}
        <div className="hidden md:flex items-center gap-3 text-gold-300">
          <span className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
          </span>
          <span className="text-maroon-700">|</span>
          <span className="text-ivory-200">{siteConfig.address.city}, Tamil Nadu</span>
        </div>

        {/* Center: Dynamic Announcement text */}
        <div className="flex-1 text-center font-medium flex items-center justify-center gap-1.5 truncate">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0 animate-pulse" />
          <span className="truncate">
            {locale === 'ta'
              ? siteConfig.announcement.textTa
              : siteConfig.announcement.textEn}
          </span>
        </div>

        {/* Right: Language Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-gold-500/30 hover:border-gold-400 text-gold-300 hover:text-white transition-all text-[11px] font-semibold"
            aria-label="Switch Language"
          >
            <Globe className="w-3 h-3 text-gold-400" />
            <span>{locale === 'en' ? 'தமிழ்' : 'English'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
