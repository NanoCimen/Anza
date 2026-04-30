import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroBrandsSection from '../components/landing/HeroBrandsSection';
import PlatformMarquee from '../components/landing/PlatformMarquee';
import MarcasBenefitsSection from '../components/landing/MarcasBenefitsSection';
import PlatformIntroSection from '../components/landing/PlatformIntroSection';
import PlatformSection from '../components/landing/PlatformSection';
import ComparisonSection from '../components/landing/ComparisonSection';
import FAQSection from '../components/landing/FAQSection';
import ContactForm from '../components/landing/ContactForm';
import Footer from '../components/landing/Footer';

export default function Marcas() {
  return (
    <div className="bg-canvas min-h-screen font-display">
      <Navbar />
      <HeroBrandsSection />
      <PlatformMarquee />
      <MarcasBenefitsSection />
      <div className="hidden">
        <PlatformIntroSection />
      </div>
      <div className="hidden">
        <PlatformSection />
      </div>
      <ComparisonSection />
      <FAQSection />
      <ContactForm />
      <Footer />
    </div>
  );
}
