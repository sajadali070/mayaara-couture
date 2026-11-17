import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/site.config';
import { I18nProvider } from '@/lib/i18n/context';
import ClientLayoutShell from '@/components/layout/ClientLayoutShell';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Luxury Handloom Sarees & Bridal Couture`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Kanchipuram Silk Sarees',
    'Bridal Lehengas Chennai',
    'Chikankari Kurtis',
    'Indo-Western Pre-draped Gowns',
    'Tamil Nadu Silk Shop',
    'Designer Sarees Online',
    'WhatsApp Dress Shopping',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    title: `${siteConfig.name} | Luxury Handloom Sarees & Festive Couture`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Bridal & Handloom Collection`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    openingHours: siteConfig.openingHours,
    priceRange: '₹₹₹',
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-ivory-50 text-charcoal-800">
        <I18nProvider>
          <ClientLayoutShell>{children}</ClientLayoutShell>
        </I18nProvider>
      </body>
    </html>
  );
}
