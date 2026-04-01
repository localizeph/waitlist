'use client';

import { useRef } from 'react';
import { Confetti, type ConfettiRef } from '~/components/magicui/confetti';
import HeroSection from '~/components/shadcn-space/blocks/hero-01/hero';
import BrandSlider from '~/components/shadcn-space/blocks/hero-01/brand-slider';
import { Waitlist } from '~/components/waitlist';
import { Footer } from '~/components/footer';
import { FooterData, toFooterProps } from '~/lib/nav';
import { Feature, FeatureSection } from '~/components/feature-section';
import { Pitch } from '~/components/pitch';
import { Separator } from '~/components/ui/separator';
import { motion } from 'motion/react';

export function LandingPage({
  waitlistPeople,
  footerData,
}: {
  waitlistPeople: number;
  footerData: FooterData | null | undefined;
}) {
  const confettiRef = useRef<ConfettiRef>(null);
  const featureData: Feature[] = [
    {
      title: "Make campaigns self-distribute",
      description: "Simply upload your video, select your target location, and go live.",
      links: [
        {
          index: 1,
          label: "Studio",
          href: "/features/studio",
        },
      ],
    },
    {
      title: "Define campaign direction",
      description: "Plan and strategize your campaigns from concept to launch. Reach your goals with roadmaps, inline creation, and audience projections.",
      links: [
        {
          index: 2,
          label: "Plan",
          href: "/features/planner",
        },
      ],
    },
    {
      title: "Observe campaign impact at scale",
      description: "Take the guesswork out of advertising. Get a clear view of your historical campaign performance to inform your next strategy.",
      links: [
        {
          index: 3,
          label: "Performance",
          href: "/features/performance",
        },
      ],
    },
    {
      title: "Automate campaign operations",
      description: "Delegate campaigns to autopilot. Set a budget and get the maximum performance.",
      links: [
        {
          index: 4,
          label: "Autopilot",
          href: "/features/autopilot",
        },
      ],
    }
  ];

  return (
    <main className="mx-auto w-full h-full flex-1 flex flex-col relative">
      <Confetti
        ref={confettiRef}
        className="fixed inset-0 z-50 pointer-events-none"
        manualstart={true}
      />

      <HeroSection />
      <BrandSlider />
      <Pitch />

      <Separator className='w-full my-16' />

      {
        featureData.map((feature, index) => (
          <>
            <FeatureSection
              key={index}
              title={feature.title}
              description={feature.description}
              links={feature.links}
            />

            <Separator className='w-full my-16' />
          </>
        ))
      }

      <div className="flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight max-w-lg text-balance"
        >
          Built for scalability.
          Available soon.
        </motion.h1>
        <Waitlist waitlistPeople={waitlistPeople} />
      </div>

      <Footer {...toFooterProps(footerData)} />
    </main>
  );
}