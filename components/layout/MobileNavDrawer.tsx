'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/context';
import { siteConfig } from '@/site.config';
import {
  X,
  Phone,
  MessageCircle,
  Globe,
  ChevronRight,
  Sparkles,
  Ruler,
  Info,
  BookOpen,
} from 'lucide-react';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const pathname = usePathname();
  const { t, locale, toggleLocale } = useTranslation();
  const prevPathname = useRef(pathname);

  // Manage body scroll locking
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close ONLY when the route actually changes after navigation
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer content */}
      <div className="relative z-10 w-full max-w-xs h-full bg-ivory-50 shadow-2xl flex flex-col justify-between overflow-y-auto border-r border-gold-500/20 animate-slide-up">
        {/* Top Header */}
        <div>
          <div className="p-5 border-b border-ivory-200 flex items-center justify-between">
            <Link href="/" onClick={onClose} className="group">
              <span className="font-serif text-2xl font-bold tracking-tight text-maroon-900">
                {siteConfig.name.split(' ')[0]}
                <span className="text-gold-600 font-normal ml-1">
                  {siteConfig.name.split(' ')[1] || 'Couture'}
                </span>
              </span>
              <span className="block text-[10px] tracking-widest text-charcoal-500 uppercase">
                Boutique • Chennai
              </span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-charcoal-600 hover:text-maroon-900 transition-colors rounded-full hover:bg-ivory-200"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Language Switcher pill in mobile drawer */}
          <div className="px-5 py-3 bg-ivory-100/70 border-b border-ivory-200 flex items-center justify-between text-xs">
            <span className="text-charcoal-600 font-medium">Language / மொழி:</span>
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-maroon-900 text-ivory-50 text-[11px] font-semibold tracking-wide hover:bg-maroon-800 transition-colors shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-gold-400" />
              <span>{locale === 'en' ? 'தமிழ் (Tamil)' : 'English'}</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <Link
              href="/"
              onClick={onClose}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'bg-maroon-900 text-ivory-50 font-semibold'
                  : 'text-charcoal-800 hover:bg-ivory-200/70'
              }`}
            >
              <span>{t.nav.home}</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <Link
              href="/shop"
              onClick={onClose}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                pathname === '/shop' && !pathname.includes('category=')
                  ? 'bg-maroon-900 text-ivory-50 font-semibold'
                  : 'text-charcoal-800 hover:bg-ivory-200/70'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-600" />
                {t.nav.shop}
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            {/* Categories */}
            <div className="pt-2 pb-1">
              <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-charcoal-400">
                Categories
              </span>
            </div>

            <Link
              href="/shop?category=sarees"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-charcoal-800 hover:bg-ivory-200/70 transition-colors"
            >
              <span>{t.nav.sarees}</span>
              <span className="text-xs text-gold-700 bg-gold-100/80 px-2 py-0.5 rounded-full font-serif">
                Silk Weaves
              </span>
            </Link>

            <Link
              href="/shop?category=kurtis"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-charcoal-800 hover:bg-ivory-200/70 transition-colors"
            >
              <span>{t.nav.kurtis}</span>
              <span className="text-xs text-maroon-700 bg-maroon-100/80 px-2 py-0.5 rounded-full">
                Chikankari
              </span>
            </Link>

            <Link
              href="/shop?category=indo-western"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-charcoal-800 hover:bg-ivory-200/70 transition-colors"
            >
              <span>{t.nav.indoWestern}</span>
              <span className="text-xs text-charcoal-600 bg-ivory-200 px-2 py-0.5 rounded-full">
                Fusion Gowns
              </span>
            </Link>

            <Link
              href="/shop?category=lehengas"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-charcoal-800 hover:bg-ivory-200/70 transition-colors"
            >
              <span>{t.nav.lehengas}</span>
              <span className="text-xs text-gold-700 bg-gold-100/80 px-2 py-0.5 rounded-full">
                Bridal
              </span>
            </Link>

            {/* Editorial & Information */}
            <div className="pt-3 pb-1">
              <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-charcoal-400">
                Editorial & Boutique
              </span>
            </div>

            <Link
              href="/lookbook"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-charcoal-800 hover:bg-ivory-200/70 transition-colors"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gold-600" />
                {t.nav.lookbook}
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-charcoal-800 hover:bg-ivory-200/70 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4 text-gold-600" />
                {t.nav.about}
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-charcoal-800 hover:bg-ivory-200/70 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-600" />
                {t.nav.contact}
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>

            <Link
              href="/size-guide"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-charcoal-800 hover:bg-ivory-200/70 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-gold-600" />
                {t.common.sizeGuide}
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>
          </nav>
        </div>

        {/* Bottom Contact Actions */}
        <div className="p-4 border-t border-ivory-200 bg-ivory-100/50 space-y-2">
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
              'Hello Mayaara Couture! I would like to inquire about your collections.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href={`tel:${siteConfig.phone}`}
            className="w-full py-2.5 px-4 rounded-xl border border-charcoal-300 hover:border-maroon-800 text-charcoal-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4 text-maroon-800" />
            <span>{siteConfig.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
