'use client';
import ContactSection from '@/components/about/ContactSection';
import HeroSection from '@/components/about/HeroSection';
import MissionsSection from '@/components/about/MissionsSection';
import OffersSection from '@/components/about/OffersSection';
import ServicesSection from '@/components/about/ServicesSection';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <HeroSection />

      <MissionsSection />

      <OffersSection />

      <ServicesSection />

      <ContactSection />
    </main>
  );
}