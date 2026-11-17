import type { Metadata } from 'next';
import SectionHeading from '@/components/common/SectionHeading';
import { siteConfig } from '@/site.config';

export const metadata: Metadata = {
  title: 'Privacy Policy | Mayaara Couture',
  description:
    'Our commitment to safeguarding your personal data, contact details, and boutique inquiry privacy.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeading
          badge="Terms & Privacy"
          title="Privacy Policy"
          subtitle="How Mayaara Couture collects, protects, and respects your personal information"
        />

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ivory-200/80 shadow-subtle space-y-6 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-charcoal-900">
              1. Information We Collect
            </h3>
            <p>
              When you browse our catalog, submit an appointment request, or place an order via WhatsApp, we may collect your name, phone number, email address, and delivery location. We do not store or process credit card numbers on this website, as all checkout payments are handled securely via authorized UPI/banking rails directly with our boutique concierge.
            </p>
          </section>

          <section className="space-y-2 border-t border-ivory-200 pt-4">
            <h3 className="font-serif text-lg font-bold text-charcoal-900">
              2. How We Use Your Data
            </h3>
            <p>
              Your contact details are solely used to verify garment availability, provide video call previews, coordinate custom blouse stitching, dispatch your parcel with verified courier partners, and provide order delivery updates.
            </p>
          </section>

          <section className="space-y-2 border-t border-ivory-200 pt-4">
            <h3 className="font-serif text-lg font-bold text-charcoal-900">
              3. Protection & No-Spam Guarantee
            </h3>
            <p>
              We honor your privacy and never sell, rent, or lease your personal information or phone number to any third-party marketing companies. You may request deletion of your consultation history at any time by contacting {siteConfig.email}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
