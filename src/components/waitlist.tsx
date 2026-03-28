'use client';

import { motion } from 'motion/react';
import WaitlistForm from '~/components/form';
import People from '~/components/people';

type WaitlistProps = {
  waitlistPeople: number;
};

export function Waitlist({ waitlistPeople }: WaitlistProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: 'easeInOut' }}
      className="w-full max-w-6xl mx-auto px-4 py-16 flex flex-col items-center gap-4"
    >
      <div className="w-full max-w-md">
        <WaitlistForm />
      </div>
      <People count={waitlistPeople} />
    </motion.section>
  );
}