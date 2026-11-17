'use client';

import React, { useState } from 'react';
import AnnouncementBar from './AnnouncementBar';
import Header from './Header';
import MobileNavDrawer from './MobileNavDrawer';
import CartDrawer from '@/components/cart/CartDrawer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import Footer from './Footer';

export default function ClientLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <AnnouncementBar />
      <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <CartDrawer />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
