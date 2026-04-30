import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroCreatorsSection from '../components/landing/HeroCreatorsSection';
import PlatformMarquee from '../components/landing/PlatformMarquee';
import CreatorGrid from '../components/landing/CreatorGrid';
import AboutSection from '../components/landing/AboutSection';
import PlatformIntroSection from '../components/landing/PlatformIntroSection';
import PlatformSection from '../components/landing/PlatformSection';
import ComparisonSection from '../components/landing/ComparisonSection';
import FAQSection from '../components/landing/FAQSection';
import ContactForm from '../components/landing/ContactForm';
import Footer from '../components/landing/Footer';

export default function Creators() {
  return (
    <div className="bg-canvas min-h-screen font-display">
      <Navbar />
      <HeroCreatorsSection />
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
