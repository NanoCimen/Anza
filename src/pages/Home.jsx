import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import PlatformMarquee from '../components/landing/PlatformMarquee';
import PlatformIntroSection from '../components/landing/PlatformIntroSection';
import PlatformSection from '../components/landing/PlatformSection';
import CreatorGrid from '../components/landing/CreatorGrid';
import ComparisonSection from '../components/landing/ComparisonSection';
import AboutSection from '../components/landing/AboutSection';
import FAQSection from '../components/landing/FAQSection';
import ContactForm from '../components/landing/ContactForm';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <div className="bg-canvas min-h-screen font-display">
      <Navbar />
      <HeroSection />
      <PlatformMarquee />
      <CreatorGrid />
      <AboutSection />
      <PlatformIntroSection />
      <PlatformSection />
      <ComparisonSection />
      <FAQSection />
      <ContactForm />
      <Footer />
    </div>
  );
}
