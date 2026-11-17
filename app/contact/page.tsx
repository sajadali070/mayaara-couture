'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/site.config';
import { useTranslation } from '@/lib/i18n/context';
import { generateEnquiryWhatsAppUrl } from '@/lib/whatsapp';
import SectionHeading from '@/components/common/SectionHeading';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default function ContactPage() {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: 'Bridal Trousseau Consultation',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setError('Please fill in all required fields (Name, Phone & Message).');
      return;
    }
    setError('');

    // Generate WhatsApp direct URL
    const url = generateEnquiryWhatsAppUrl(
      form.name,
      form.phone,
      form.service,
      form.message
    );

    setIsSubmitted(true);
    window.open(url, '_blank');
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Boutique Atelier"
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Contact details, hours, map */}
          <div className="lg:col-span-5 space-y-6">
            {/* Atelier Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-200/80 shadow-subtle space-y-6">
              <h3 className="font-serif text-xl font-bold text-charcoal-900 border-b border-ivory-200 pb-4">
                {t.contact.addressTitle}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-charcoal-700">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/10 text-gold-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-charcoal-900 block font-serif">
                      {siteConfig.name} Atelier
                    </strong>
                    <p className="text-charcoal-500 mt-0.5 leading-relaxed">
                      {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state} - {siteConfig.address.postalCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/10 text-gold-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-charcoal-900 block font-serif">
                      {t.contact.hoursTitle}
                    </strong>
                    <p className="text-charcoal-500">{siteConfig.openingHours}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/10 text-gold-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-charcoal-900 block font-serif">
                      Telephone
                    </strong>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="text-maroon-800 hover:underline font-semibold"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/10 text-gold-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-charcoal-900 block font-serif">
                      Concierge Email
                    </strong>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-maroon-800 hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                    'Hello Mayaara Couture! I would like to inquire about visiting your boutique.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{t.common.whatsappUs}</span>
                </a>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex-1 py-3 px-4 rounded-xl border border-maroon-900 text-maroon-900 hover:bg-maroon-50 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t.common.callUs}</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="bg-white rounded-3xl overflow-hidden border border-ivory-200/80 shadow-subtle p-2">
              <iframe
                title="Mayaara Couture Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.6432658828876!2d80.24835617507797!3d13.047587787274945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52664765955555%3A0xbc4e57e937d3fa!2sCathedral%20Rd%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="240"
                style={{ border: 0, borderRadius: '1rem' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Interactive Consultation & Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ivory-200/80 shadow-subtle space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gold-700">
                  Concierge Service
                </span>
                <h3 className="font-serif text-2xl font-bold text-charcoal-900 mt-1">
                  {t.contact.inquiryTitle}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
                  Share your preferred occasion, design requirements, or wedding date. Submitting this form directly opens your WhatsApp with the details pre-filled.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs">
                  {error}
                </div>
              )}

              {isSubmitted && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-700" />
                  <span>
                    Thank you! Your WhatsApp window has opened with your inquiry. Our stylist will respond promptly.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t.contact.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-ivory-300 bg-ivory-50 text-xs sm:text-sm text-charcoal-800 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1.5">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder={t.contact.phonePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-ivory-300 bg-ivory-50 text-xs sm:text-sm text-charcoal-800 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1.5">
                    Service / Consultation Type
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-ivory-300 bg-ivory-50 text-xs sm:text-sm text-charcoal-800 focus:outline-none focus:border-gold-500 cursor-pointer"
                  >
                    <option value="Bridal Trousseau Consultation">
                      Bridal Trousseau Consultation (In-Store / Video Call)
                    </option>
                    <option value="Custom Saree & Blouse Stitching">
                      Custom Saree & Blouse Stitching
                    </option>
                    <option value="Indo-Western & Gown Customization">
                      Indo-Western & Gown Customization
                    </option>
                    <option value="International Order & Shipping Inquiry">
                      International Order & Shipping Inquiry
                    </option>
                    <option value="General Boutique Question">
                      General Boutique Question
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-1.5">
                    Your Message / Styling Request *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-ivory-300 bg-ivory-50 text-xs sm:text-sm text-charcoal-800 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-gold transition-colors"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>{t.contact.submitButton}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
