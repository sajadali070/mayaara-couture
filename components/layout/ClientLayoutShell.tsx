'use client';

import React, { useState, useCallback } from 'react';
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

  const handleOpenMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
  }, []);

  const handleCloseMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <AnnouncementBar />
      <Header onOpenMobileMenu={handleOpenMobileMenu} />
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={handleCloseMobileMenu}
      />
      <CartDrawer />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
