import HeroSection from '@/components/home/HeroSection';
import BrandPillars from '@/components/home/BrandPillars';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import NewArrivalsCarousel from '@/components/home/NewArrivalsCarousel';
import FestivalSpotlight from '@/components/home/FestivalSpotlight';
import BestSellersSection from '@/components/home/BestSellersSection';
import LookbookBanner from '@/components/home/LookbookBanner';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import InstagramGallery from '@/components/home/InstagramGallery';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandPillars />
      <FeaturedCategories />
      <NewArrivalsCarousel />
      <FestivalSpotlight />
      <BestSellersSection />
      <LookbookBanner />
      <TestimonialsSection />
      <InstagramGallery />
    </>
  );
}
