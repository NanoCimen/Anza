import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroCreatorsSection from '../components/landing/HeroCreatorsSection';
import PlatformMarquee from '../components/landing/PlatformMarquee';
import CreatorsBenefitsSection from '../components/landing/CreatorsBenefitsSection';
import SectionReveal from '../components/landing/SectionReveal';
import PlatformIntroSection from '../components/landing/PlatformIntroSection';
import PlatformSection from '../components/landing/PlatformSection';
import FAQSection from '../components/landing/FAQSection';
import ContactForm from '../components/landing/ContactForm';
import Footer from '../components/landing/Footer';

export default function Creators() {
  return (
    <div className="bg-ink min-h-screen font-display">
      <Navbar showBackLink backHref="/" />
      <SectionReveal>
        <HeroCreatorsSection />
      </SectionReveal>
      <SectionReveal delay={0.04}>
        <PlatformMarquee backgroundClass="border-y border-black bg-white" edgeFadeFrom="from-white" tone="dark" />
      </SectionReveal>
      <SectionReveal delay={0.08}>
        <CreatorsBenefitsSection />
      </SectionReveal>
      <div className="hidden">
        <PlatformIntroSection />
      </div>
      <div className="hidden">
        <PlatformSection />
      </div>
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
