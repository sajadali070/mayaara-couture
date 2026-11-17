import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/site.config';
import SectionHeading from '@/components/common/SectionHeading';
import { Award, Heart, Sparkles, Scissors, Users, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Heritage & Story | Mayaara Couture Chennai',
  description:
    'Learn about Mayaara Couture, our master weavers in Kanchipuram and Varanasi, and our mission to preserve timeless Indian handloom artistry through modern boutique design.',
};

export default function AboutPage() {
  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Since 2018"
          title="The Mayaara Heritage"
          subtitle="A sacred dedication to handlooms, master weavers, and the immortal beauty of South Indian silk"
        />

        {/* Hero Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 sm:mb-24">
          <div className="lg:col-span-6 space-y-5 text-charcoal-700 leading-relaxed text-sm sm:text-base">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-900 leading-tight">
              Crafted by Generational Artisans in Cathedral Road, Chennai
            </h3>
            <p>
              Founded with the belief that true luxury lies in patience, provenance, and the human hand, <strong>{siteConfig.name}</strong> was born in Chennai to champion the master weavers of Kanchipuram, Arani, and Banaras.
            </p>
            <p>
              In an era dominated by synthetic fast fashion, every piece in our boutique is an intentional heir of sacred Indian weaving traditions. From our pure mulberry silk threads certified by the Silk Mark Organization to the solid silver-gold zari that reflects temple sunlight, we take pride in dressing brides and connoisseurs around the world.
            </p>
            <div className="p-4 bg-white rounded-2xl border-l-4 border-gold-500 shadow-subtle italic font-serif text-charcoal-600 text-sm">
              &quot;When a bride drapes a Mayaara saree, she wraps herself in the blessings, songs, and dedication of three generations of master weavers.&quot;
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80"
                alt="Mayaara Master Artisan Weaving Silk Saree"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-ivory-200/80 shadow-subtle mb-16 sm:mb-24">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-center text-charcoal-900 mb-10">
            Our Guiding Boutique Principles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-700 flex items-center justify-center mx-auto sm:mx-0">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-maroon-900">
                100% Certified Purity
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
                Zero synthetic fibers. Every saree carries authenticated Silk Mark certification, pure silver zari threads, and natural vegetable or AZO-free dyes.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-maroon-500/10 text-maroon-800 flex items-center justify-center mx-auto sm:mx-0">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-maroon-900">
                Direct Weaver Guild Support
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
                We bypass all middlemen, ensuring 100% fair artisan compensation and funding healthcare for over 85 weaver families across Tamil Nadu and Uttar Pradesh.
              </p>
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-700 flex items-center justify-center mx-auto sm:mx-0">
                <Scissors className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-maroon-900">
                Bespoke Tailoring Concierge
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
                Our in-house master tailors customize every blouse, neckline, fall-pico, and waist cinch, providing personal trial sessions and video consultations.
              </p>
            </div>
          </div>
        </div>

        {/* Atelier Invitation Strip */}
        <div className="bg-maroon-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">
              Visit Cathedral Road Atelier
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold">
              Experience the Silk First-Hand
            </h3>
            <p className="text-xs sm:text-sm text-ivory-200/90 leading-relaxed font-light">
              We welcome you to our Chennai studio for private bridal trousseau consultations, tactile weave explorations, and custom stitching measurements.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Mayaara Couture! I would like to schedule a visit to your Chennai atelier.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-gold transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-charcoal-950" />
                <span>Book Appointment on WhatsApp</span>
              </a>
              <Link
                href="/contact"
                className="px-7 py-3 rounded-full border border-ivory-200/40 hover:bg-white/10 text-ivory-100 font-semibold text-xs sm:text-sm transition-colors"
              >
                Atelier Location & Hours
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
