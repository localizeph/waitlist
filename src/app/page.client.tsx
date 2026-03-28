'use client';

import { useRef } from 'react';

import Faq from '~/components/faq';
import Footer from '~/components/footer';
import { AvatarList } from '~/components/shadcn-space/blocks/hero-01/hero';
import { Confetti, type ConfettiRef } from '~/components/magicui/confetti';
import BrandSlider, {
  BrandList,
} from '~/components/shadcn-space/blocks/hero-01/brand-slider';
import HeroSection from '~/components/shadcn-space/blocks/hero-01/hero';
import { Footer2 } from '~/components/footer2';

export function LandingPage({ waitlistPeople }: { waitlistPeople: number }) {
  const confettiRef = useRef<ConfettiRef>(null);

  const avatarList: AvatarList[] = [
    {
      image: 'https://images.shadcnspace.com/assets/profiles/user-1.jpg',
    },
    {
      image: 'https://images.shadcnspace.com/assets/profiles/user-2.jpg',
    },
    {
      image: 'https://images.shadcnspace.com/assets/profiles/user-3.jpg',
    },
    {
      image: 'https://images.shadcnspace.com/assets/profiles/user-5.jpg',
    },
  ];

  const brandList: BrandList[] = [
    {
      image: 'https://images.shadcnspace.com/assets/brand-logo/logoipsum-1.svg',
      lightimg:
        'https://images.shadcnspace.com/assets/brand-logo/logoipsum-light-1.svg',
      name: 'Brand 1',
    },
    {
      image: 'https://images.shadcnspace.com/assets/brand-logo/logoipsum-2.svg',
      lightimg:
        'https://images.shadcnspace.com/assets/brand-logo/logoipsum-light-2.svg',
      name: 'Brand 2',
    },
    {
      image: 'https://images.shadcnspace.com/assets/brand-logo/logoipsum-3.svg',
      lightimg:
        'https://images.shadcnspace.com/assets/brand-logo/logoipsum-light-3.svg',
      name: 'Brand 3',
    },
    {
      image: 'https://images.shadcnspace.com/assets/brand-logo/logoipsum-4.svg',
      lightimg:
        'https://images.shadcnspace.com/assets/brand-logo/logoipsum-light-4.svg',
      name: 'Brand 4',
    },
    {
      image: 'https://images.shadcnspace.com/assets/brand-logo/logoipsum-5.svg',
      lightimg:
        'https://images.shadcnspace.com/assets/brand-logo/logoipsum-light-5.svg',
      name: 'Brand 5',
    },
  ];

  return (
    <main className="mx-auto max-w-screen-2xl w-full h-full flex-1 flex flex-col relative">
      <Confetti
        ref={confettiRef}
        className="fixed inset-0 z-50 pointer-events-none"
        manualstart={true}
      />

      <HeroSection avatarList={avatarList} waitlistPeople={waitlistPeople} />
      <BrandSlider brandList={brandList} />

      <Faq />
      <Footer2 />
    </main>
  );
}
