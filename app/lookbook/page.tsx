import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '@/components/common/SectionHeading';
import { Sparkles, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Royal Trousseau Lookbook | Mayaara Couture',
  description:
    'An editorial showcase of handwoven South Indian silk sarees, bespoke bridal lehengas, and contemporary fusion silhouettes captured in atmospheric luxury.',
};

export default function LookbookPage() {
  const chapters = [
    {
      number: 'Chapter 01',
      title: 'The Sacred Kanchipuram Weaves',
      subtitle: 'Where Pure Mulberry Silk Meets Generational Gold Zari',
      description:
        'Conceived in the temple city of Kanchipuram, this chapter celebrates the unhurried grace of the Korvai technique. The interlocked borders, contrasting pallus, and sacred motifs of the Annapakshi and Mayil reflect centuries of South Indian devotion.',
      quote:
        '“A silk saree is not merely woven; it is sung into existence across seventy thousand shuttle beats.”',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
          title: 'Kanchipuram Crimson Zari Korvai Saree',
          slug: 'kanchipuram-pure-zari-silk-saree',
          caption: 'Draped in pure crimson red with solid temple gold borders',
        },
        {
          src: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
          title: 'Chanderi Gold Tissue Silk',
          slug: 'chanderi-handloom-tissue-saree',
          caption: 'Ethereal metallic glow in gossamer sage and rose gold',
        },
      ],
    },
    {
      number: 'Chapter 02',
      title: 'The Royal Velvet & Zardozi Trousseau',
      subtitle: 'Heirloom Ensembles for the Discerning Indian Bride',
      description:
        'Crafted on deep heritage velvets with metallic bullion wire (dabka), sequins, and micro-pearls. Each lehenga skirt is crafted over 350 artisan hours to create a silhouette that commands timeless royalty.',
      quote:
        '“For the bride whose wedding day is an epoch, crafted to be treasured for generations.”',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80',
          title: 'Royal Velvet Bridal Lehenga with Zardozi',
          slug: 'royal-velvet-bridal-lehenga-zardozi',
          caption: 'Voluminous 16-kali flare in deep heritage crimson wine',
        },
        {
          src: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
          title: 'Banarasi Brocade Panel Lehenga',
          slug: 'banarasi-brocade-panel-lehenga-gotta-patti',
          caption: 'Multi-hue brocade panels with Rajasthani gotta patti borders',
        },
      ],
    },
    {
      number: 'Chapter 03',
      title: 'Contemporary Festive & Indo-Western Fusion',
      subtitle: 'Architectural Drapes Engineered for Modern Celebrations',
      description:
        'Fluid silk crepes, asymmetric organza capes, and pre-draped saree gowns that slip on in seconds. Effortless high glamour designed for cocktail evenings, sangeet dancing, and destination celebrations.',
      quote:
        '“Tradition reimagined: no pleating struggles, only pure fluid movement and radiant confidence.”',
      images: [
        {
          src: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80',
          title: 'Pre-Draped Silk Crepe Saree Gown',
          slug: 'predraped-crepe-saree-gown-crystal-belt',
          caption: 'Fitted gown with cascading pleats and Swarovski crystal belt',
        },
      ],
    },
  ];

  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Editorial Visuals"
          title="The Royal Trousseau Lookbook"
          subtitle="A cinematic anthology capturing the movement, texture, and luminescence of our bespoke creations"
        />

        <div className="space-y-24 sm:space-y-32">
          {chapters.map((chap, idx) => (
            <div key={idx} className="space-y-10">
              {/* Chapter Header */}
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="font-mono text-xs uppercase tracking-widest text-gold-700 font-bold">
                  {chap.number}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 tracking-tight">
                  {chap.title}
                </h2>
                <p className="text-sm sm:text-base font-serif italic text-gold-800">
                  {chap.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed max-w-2xl mx-auto pt-2">
                  {chap.description}
                </p>
                <div className="pt-3">
                  <p className="font-serif italic text-xs sm:text-sm text-charcoal-500 bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-ivory-200/80 inline-block">
                    {chap.quote}
                  </p>
                </div>
              </div>

              {/* Chapter Visual Gallery */}
              <div
                className={`grid grid-cols-1 ${
                  chap.images.length > 1 ? 'md:grid-cols-2' : 'max-w-4xl mx-auto'
                } gap-8 sm:gap-10`}
              >
                {chap.images.map((img, i) => (
                  <div
                    key={i}
                    className="group bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover border border-ivory-200/80 transition-all duration-500 flex flex-col justify-between"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-ivory-100">
                      <Image
                        src={img.src}
                        alt={img.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6 flex items-center justify-between gap-4 bg-white">
                      <div>
                        <h4 className="font-serif text-base font-bold text-charcoal-900 group-hover:text-maroon-800 transition-colors">
                          {img.title}
                        </h4>
                        <p className="text-xs text-charcoal-500 mt-0.5">
                          {img.caption}
                        </p>
                      </div>
                      <Link
                        href={`/shop/${img.slug}`}
                        className="px-4 py-2 rounded-xl bg-maroon-900 hover:bg-maroon-800 text-ivory-50 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
                      >
                        <span>Shop Look</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
