'use client';

import React from 'react';
import { siteConfig } from '@/site.config';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const message = 'Hello Mayaara Couture! I would like to explore your collection and need styling advice.';
  const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <aside
      aria-label="WhatsApp Concierge"
      className="fixed bottom-6 right-6 z-40 flex items-center group"
    >
      <span className="hidden md:inline-block mr-3 px-3.5 py-1.5 rounded-full bg-charcoal-900/90 text-ivory-50 text-xs font-medium tracking-wide shadow-lg border border-gold-500/30 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap">
        Chat with Boutique Stylist
      </span>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Mayaara Couture on WhatsApp"
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 active:scale-95 animate-pulse-subtle border-2 border-ivory-50"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </aside>
  );
}
