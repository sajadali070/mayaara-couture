'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/context';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { siteConfig } from '@/site.config';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
} from 'lucide-react';
import SearchModal from '@/components/common/SearchModal';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export default function Header({ onOpenMobileMenu }: HeaderProps) {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Zustand counters (hydration-safe)
  const cartItemsCount = useCartStore((s) => s.getTotalItems());
  const openCartDrawer = useCartStore((s) => s.openDrawer);
  const wishlistItems = useWishlistStore((s) => s.items);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/shop?category=sarees', label: t.nav.sarees },
    { href: '/shop?category=kurtis', label: t.nav.kurtis },
    { href: '/shop?category=indo-western', label: t.nav.indoWestern },
    { href: '/shop?category=lehengas', label: t.nav.lehengas },
    { href: '/lookbook', label: t.nav.lookbook },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-ivory-50/95 backdrop-blur-md shadow-card border-b border-ivory-200/80 py-3'
            : 'bg-ivory-50 border-b border-ivory-200/50 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={onOpenMobileMenu}
                className="p-2 -ml-2 text-charcoal-800 hover:text-maroon-800 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <Link href="/" className="group text-left">
                <span className="block font-serif text-2xl sm:text-3xl font-bold tracking-tight text-maroon-900 group-hover:text-maroon-700 transition-colors">
                  {siteConfig.name.split(' ')[0]}
                  <span className="text-gold-600 font-normal ml-1">
                    {siteConfig.name.split(' ')[1] || 'Couture'}
                  </span>
                </span>
                <span className="hidden sm:block text-[10px] tracking-[0.25em] text-charcoal-500 uppercase -mt-1 font-medium">
                  Chennai • Est. 2018
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href.includes('?') && pathname === '/shop');
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium tracking-wide transition-colors relative py-1 hover:text-maroon-800 ${
                      isActive ? 'text-maroon-800 font-semibold' : 'text-charcoal-700'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons: Search, Wishlist, Cart */}
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-charcoal-700 hover:text-maroon-800 transition-colors rounded-full hover:bg-ivory-100"
                aria-label="Search catalog"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                className="p-2 text-charcoal-700 hover:text-maroon-800 transition-colors rounded-full hover:bg-ivory-100 relative"
                aria-label="View Wishlist"
              >
                <Heart className="w-5 h-5" />
                {mounted && wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-1 bg-gold-500 text-maroon-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-fade-in">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={openCartDrawer}
                className="p-2 text-maroon-800 hover:text-maroon-900 transition-colors rounded-full hover:bg-ivory-100 relative"
                aria-label="Open Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {mounted && cartItemsCount > 0 && (
                  <span className="absolute top-1 right-1 bg-maroon-800 text-ivory-50 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-fade-in">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
