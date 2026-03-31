'use client';

import { useRef } from 'react';
import { Confetti, type ConfettiRef } from '~/components/magicui/confetti';
import HeroSection from '~/components/shadcn-space/blocks/hero-01/hero';
import BrandSlider from '~/components/shadcn-space/blocks/hero-01/brand-slider';
import { Waitlist } from '~/components/waitlist';
import Faq from '~/components/faq';
import { Footer } from '~/components/footer';
import { FooterData, toFooterProps } from '~/lib/nav';
import { ValuePropositions } from '~/components/value-propositions';
import { Pitch } from '~/components/pitch';

export function LandingPage({
  waitlistPeople,
  footerData,
}: {
  waitlistPeople: number;
  footerData: FooterData | null | undefined;
}) {
  const confettiRef = useRef<ConfettiRef>(null);

  return (
    <main className="mx-auto max-w-screen-2xl w-full h-full flex-1 flex flex-col relative">
      <Confetti
        ref={confettiRef}
        className="fixed inset-0 z-50 pointer-events-none"
        manualstart={true}
      />

      <HeroSection />
      <BrandSlider />
      <Pitch />
      <ValuePropositions />
      <Waitlist waitlistPeople={waitlistPeople} />

      <Faq />
      <Footer {...toFooterProps(footerData)} />
    </main>
  );
}