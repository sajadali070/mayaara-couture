import type { Metadata } from 'next';
import SectionHeading from '@/components/common/SectionHeading';
import { Truck, ShieldCheck, RotateCcw, PackageCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping, Delivery & Returns | Mayaara Couture',
  description:
    'Our boutique shipping timeline, insured doorstep delivery, international air freight rates, and 7-day exchange policies.',
};

export default function ShippingReturnsPage() {
  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeading
          badge="Customer Care"
          title="Shipping & Returns Policy"
          subtitle="Transparent, secure, and insured delivery standards for your cherished garments"
        />

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ivory-200/80 shadow-subtle space-y-8 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
          {/* Shipping within India */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-gold-600" />
              <h3 className="font-serif text-lg font-bold text-charcoal-900">
                Domestic Shipping Across India
              </h3>
            </div>
            <p>
              We provide <strong>Complimentary Insured Express Shipping</strong> for all orders delivered within India.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-charcoal-600">
              <li><strong>Dispatch Timeline:</strong> Ready garments are dispatched within 24 to 48 business hours from our Chennai atelier.</li>
              <li><strong>Transit Times:</strong> Metro cities (Chennai, Bangalore, Hyderabad, Mumbai, Delhi) take 2–3 business days. Other regions take 3–5 business days.</li>
              <li><strong>Courier Partners:</strong> Blue Dart, DTDC Prime, and Delhivery with real-time SMS & WhatsApp tracking links.</li>
            </ul>
          </section>

          {/* Packaging */}
          <section className="space-y-3 border-t border-ivory-200 pt-6">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-gold-600" />
              <h3 className="font-serif text-lg font-bold text-charcoal-900">
                Luxury Boutique Packaging
              </h3>
            </div>
            <p>
              Every Kanchipuram saree and bridal ensemble is wrapped in breathable organic cotton muslin cloth, placed inside a rigid Mayaara gold-embossed keepsake trunk, and securely shrink-wrapped to protect against transit humidity.
            </p>
          </section>

          {/* International Shipping */}
          <section className="space-y-3 border-t border-ivory-200 pt-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gold-600" />
              <h3 className="font-serif text-lg font-bold text-charcoal-900">
                International Express Air Freight
              </h3>
            </div>
            <p>
              We ship worldwide to the USA, Canada, UK, Singapore, Malaysia, UAE, and Australia via DHL Express and FedEx. International transit typically takes 4–7 business days. Customs duties, if levied by the destination country, are paid directly by the patron.
            </p>
          </section>

          {/* Exchanges & Returns */}
          <section className="space-y-3 border-t border-ivory-200 pt-6">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-gold-600" />
              <h3 className="font-serif text-lg font-bold text-charcoal-900">
                7-Day Hassle-Free Exchange Policy
              </h3>
            </div>
            <p>
              We want you to be entirely enchanted with your purchase. If a ready garment does not fit as desired or you prefer another colorway:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-charcoal-600">
              <li>Notify our WhatsApp concierge team within <strong>7 days</strong> of delivery.</li>
              <li>Garments must remain unworn, unwashed, with the original Silk Mark tags intact.</li>
              <li>Custom stitched blouses or tailor-altered garments cannot be exchanged.</li>
              <li>We will arrange a reverse pickup from your doorstep or assist with return shipping.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
