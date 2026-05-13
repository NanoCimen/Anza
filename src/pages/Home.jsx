import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import PlatformMarquee from '../components/landing/PlatformMarquee';
import ComoFuncionaSection from '../components/landing/ComoFuncionaSection';
import SectionReveal from '../components/landing/SectionReveal';
import PlatformIntroSection from '../components/landing/PlatformIntroSection';
import PlatformSection from '../components/landing/PlatformSection';
import CreatorGrid from '../components/landing/CreatorGrid';
import ComparisonSection from '../components/landing/ComparisonSection';
import AboutSection from '../components/landing/AboutSection';
import FAQSection from '../components/landing/FAQSection';
import ContactForm from '../components/landing/ContactForm';
import Footer from '../components/landing/Footer';
import ScrollExploreHint from '../components/landing/ScrollExploreHint';

export default function Home() {
  return (
    <div className="relative bg-ink min-h-screen font-display">
      {/* Main content stack — solid bg, layered above the footer reveal */}
      <div className="relative z-10 bg-ink">
        <div className="bg-black">
          <SectionReveal>
            <HeroSection />
          </SectionReveal>
          <PlatformMarquee />
        </div>
        <SectionReveal delay={0.06}>
          <AboutSection />
        </SectionReveal>
        <div className="relative h-16 bg-ink md:h-18">
          <ScrollExploreHint align="center" hideOnHash="#como-funciona" />
        </div>
        <SectionReveal delay={0.08}>
          <ComoFuncionaSection />
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <CreatorGrid />
        </SectionReveal>
        <div className="hidden">
          <PlatformIntroSection />
        </div>
        <div className="hidden">
          <PlatformSection />
        </div>
        <SectionReveal delay={0.14}>
          <ComparisonSection />
        </SectionReveal>
        <SectionReveal delay={0.16}>
          <FAQSection />
        </SectionReveal>
        <SectionReveal delay={0.18}>
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
