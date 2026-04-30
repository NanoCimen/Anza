import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import PlatformMarquee from '../components/landing/PlatformMarquee';
import EditorialAudienceSection from '../components/landing/EditorialAudienceSection';
import SectionReveal from '../components/landing/SectionReveal';
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
      <SectionReveal>
        <HeroSection />
      </SectionReveal>
      <SectionReveal delay={0.04}>
        <PlatformMarquee />
      </SectionReveal>
      <SectionReveal delay={0.06}>
        <EditorialAudienceSection />
      </SectionReveal>
      <SectionReveal delay={0.08}>
        <CreatorGrid />
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <AboutSection />
      </SectionReveal>
      <div className="hidden">
        <PlatformIntroSection />
      </div>
      <div className="hidden">
        <PlatformSection />
      </div>
      <SectionReveal delay={0.12}>
        <ComparisonSection />
      </SectionReveal>
      <SectionReveal delay={0.14}>
        <FAQSection />
      </SectionReveal>
      <SectionReveal delay={0.16}>
        <ContactForm />
      </SectionReveal>
      <SectionReveal delay={0.18}>
        <Footer />
      </SectionReveal>
    </div>
  );
}
