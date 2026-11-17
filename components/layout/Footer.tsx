'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/context';
import { siteConfig } from '@/site.config';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  ShieldCheck,
  Award,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
} from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-charcoal-900 text-ivory-100 border-t border-maroon-900/40">
      {/* Upper Boutique Highlights Strip */}
      <div className="border-b border-charcoal-800 py-8 bg-charcoal-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-serif text-sm font-semibold text-ivory-50">100% Certified Silk</h5>
                <p className="text-xs text-charcoal-400">Authentic handloom weaves</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-serif text-sm font-semibold text-ivory-50">WhatsApp Concierge</h5>
                <p className="text-xs text-charcoal-400">Live video shopping & assistance</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-serif text-sm font-semibold text-ivory-50">Custom Tailoring</h5>
                <p className="text-xs text-charcoal-400">Perfect blouse & fit service</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-serif text-sm font-semibold text-ivory-50">Global Express Delivery</h5>
                <p className="text-xs text-charcoal-400">Carefully boxed & insured</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1 & 2: Brand Story */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ivory-50 group-hover:text-gold-400 transition-colors">
                {siteConfig.name.split(' ')[0]}
                <span className="text-gold-500 font-normal ml-1">
                  {siteConfig.name.split(' ')[1] || 'Couture'}
                </span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-charcoal-400 leading-relaxed max-w-sm">
              Rooted in the sacred temple weave traditions of South India. Each saree, kurti, and bridal silhouette is lovingly handcrafted by generational master artisans to drape you in timeless magnificence.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-charcoal-800 hover:bg-gold-500 hover:text-charcoal-900 flex items-center justify-center text-ivory-200 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-charcoal-800 hover:bg-gold-500 hover:text-charcoal-900 flex items-center justify-center text-ivory-200 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-charcoal-800 hover:bg-gold-500 hover:text-charcoal-900 flex items-center justify-center text-ivory-200 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Collections */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold-400 tracking-wider uppercase mb-4">
              Collections
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-charcoal-400">
              <li>
                <Link href="/shop?category=sarees" className="hover:text-ivory-50 transition-colors">
                  Kanchipuram Silk Sarees
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sarees" className="hover:text-ivory-50 transition-colors">
                  Banarasi Brocades
                </Link>
              </li>
              <li>
                <Link href="/shop?category=kurtis" className="hover:text-ivory-50 transition-colors">
                  Chikankari Kurtis & Sets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=indo-western" className="hover:text-ivory-50 transition-colors">
                  Pre-Draped Gowns & Fusion
                </Link>
              </li>
              <li>
                <Link href="/shop?category=lehengas" className="hover:text-ivory-50 transition-colors">
                  Bridal & Festive Lehengas
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="hover:text-ivory-50 transition-colors">
                  The Royal Lookbook
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Boutique & Help */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold-400 tracking-wider uppercase mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-charcoal-400">
              <li>
                <Link href="/size-guide" className="hover:text-ivory-50 transition-colors">
                  {t.common.sizeGuide}
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-ivory-50 transition-colors">
                  Shipping & Exchange Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-ivory-50 transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ivory-50 transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-ivory-50 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Boutique Atelier Details */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold-400 tracking-wider uppercase mb-4">
              Visit The Atelier
            </h4>
            <div className="space-y-3 text-xs text-charcoal-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>
                  {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state} - {siteConfig.address.postalCode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold-500 shrink-0" />
                <span>{siteConfig.openingHours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-gold-400 transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-gold-400 transition-colors">
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-8 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. {t.common.allRightsReserved}</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Chennai, India</span>
            <span>•</span>
            <span>Orders Confirmed on WhatsApp</span>
            <span>•</span>
            <span>Worldwide Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
