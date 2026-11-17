'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/lib/i18n/context';
import { siteConfig } from '@/site.config';
import SectionHeading from '@/components/common/SectionHeading';
import { ArrowUpRight } from 'lucide-react';

export default function FeaturedCategories() {
  const { t, locale } = useTranslation();

  return (
    <section className="py-16 sm:py-20 bg-ivory-50 border-b border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Curated Weaves"
          title={t.home.featuredCategoriesTitle}
          subtitle={t.home.featuredCategoriesSubtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {siteConfig.categories.map((category) => {
            const displayName =
              locale === 'ta' && category.nameTa ? category.nameTa : category.name;

            return (
              <Link
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="group relative rounded-3xl overflow-hidden shadow-subtle hover:shadow-card-hover border border-ivory-200/80 bg-white transition-all duration-500 flex flex-col"
              >
                {/* Visual Image container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-ivory-100">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent group-hover:from-maroon-950/90 transition-colors duration-500" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-charcoal-900 group-hover:bg-gold-500 group-hover:text-charcoal-900 flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  {/* Bottom Text Over Image */}
                  <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                    <h3 className="font-serif text-xl font-bold tracking-tight mb-1 text-ivory-50 group-hover:text-gold-300 transition-colors">
                      {displayName}
                    </h3>
                    <p className="text-xs text-ivory-200/80 line-clamp-2 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
