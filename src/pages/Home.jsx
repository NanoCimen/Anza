import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import PlatformMarquee from '../components/landing/PlatformMarquee';
import ComoFuncionaSection from '../components/landing/ComoFuncionaSection';
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
    <div className="relative bg-ink min-h-screen font-display">
      {/* Main content stack — solid bg, layered above the footer reveal */}
      <div className="relative z-10 bg-ink">
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
          <ComoFuncionaSection />
        </SectionReveal>
        <SectionReveal delay={0.09}>
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
      </div>

      {/* Spacer — provides the scroll room used to reveal the fixed footer beneath */}
      <div className="h-screen relative z-0 pointer-events-none" aria-hidden />

      {/* Footer pinned to viewport bottom, sits behind the main stack and is revealed as it scrolls past */}
      <div className="fixed inset-x-0 bottom-0 z-0 pointer-events-none">
        <div className="pointer-events-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
