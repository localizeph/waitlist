'use client';

import { useRef } from 'react';
import { Confetti, type ConfettiRef } from '~/components/magicui/confetti';
import HeroSection from '~/components/shadcn-space/blocks/hero-01/hero';
import BrandSlider, { BrandList } from '~/components/shadcn-space/blocks/hero-01/brand-slider';
import { Waitlist } from '~/components/waitlist';
import Faq from '~/components/faq';
import { Footer } from '~/components/footer';
import { FooterData, toFooterProps } from '~/lib/nav';
import ValuePropositions from '~/components/value-propositions';

const brandList: BrandList[] = [
  { image: 'https://images.shadcnspace.com/assets/brand-logo/logoipsum-1.svg', lightimg: 'https://images.shadcnspace.com/assets/brand-logo/logoipsum-light-1.svg', name: 'Brand 1' },
  { image: 'https://images.shadcnspace.com/assets/brand-logo/logoipsum-2.svg', lightimg: 'https://images.shadcnspace.com/assets/brand-logo/logoipsum-light-2.svg', name: 'Brand 2' },
  { image: 'https://images.shadcnspace.com/assets/brand-logo/logoipsum-3.svg', lightimg: 'https://images.shadcnspace.com/assets/brand-logo/logoipsum-light-3.svg', name: 'Brand 3' },
  { image: 'https://images.shadcnspace.com/assets/brand-logo/logoipsum-4.svg', lightimg: 'https://images.shadcnspace.com/assets/brand-logo/logoipsum-light-4.svg', name: 'Brand 4' },
  { image: 'https://images.shadcnspace.com/assets/brand-logo/logoipsum-5.svg', lightimg: 'https://images.shadcnspace.com/assets/brand-logo/logoipsum-light-5.svg', name: 'Brand 5' },
];

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
      <BrandSlider brandList={brandList} />
      <ValuePropositions />
      <Waitlist waitlistPeople={waitlistPeople} />

      <Faq />
      <Footer {...toFooterProps(footerData)} />
    </main>
  );
}