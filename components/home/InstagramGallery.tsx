'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n/context';
import { siteConfig } from '@/site.config';
import SectionHeading from '@/components/common/SectionHeading';
import { Instagram, Heart } from 'lucide-react';

export default function InstagramGallery() {
  const { t } = useTranslation();

  const posts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      likes: '1.2k',
      tag: '#MayaaraBride',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      likes: '954',
      tag: '#HandloomSaree',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80',
      likes: '2.4k',
      tag: '#VelvetCouture',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      likes: '887',
      tag: '#FusionSareeGown',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      likes: '1.8k',
      tag: '#BanarasiHeritage',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
      likes: '1.5k',
      tag: '#KanchiSilkLove',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-ivory-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Social Gallery"
          title={t.home.instagramTitle}
          subtitle={t.home.instagramSubtitle}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-subtle bg-ivory-200 block"
            >
              <Image
                src={post.image}
                alt="Mayaara Instagram Snapshot"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-maroon-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-3 text-center">
                <Instagram className="w-6 h-6 text-gold-400 mb-1" />
                <span className="text-[11px] font-semibold tracking-wide">{post.tag}</span>
                <span className="text-[10px] text-ivory-200 flex items-center gap-1 mt-1">
                  <Heart className="w-3 h-3 fill-gold-400 text-gold-400" />
                  {post.likes}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-maroon-900 hover:text-maroon-700 uppercase tracking-widest transition-colors"
          >
            <Instagram className="w-4 h-4 text-gold-600" />
            <span>Follow @MayaaraCouture on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}
