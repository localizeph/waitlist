'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { COMPANIES } from '~/lib/constants/misc';

function BrandSlider() {
  return (
    <section>
      <div className="py-14">
        <div className="mx-auto px-4 md:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: 'easeInOut' }}
            className="text-center text-sm font-medium font-heading text-neutral-400"
          >
            Trusted by top brands and agencies
          </motion.h2>
          <motion.ul
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7, ease: 'easeInOut' }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-6 md:gap-x-16 justify-center"
          >
            {COMPANIES.map((company) => (
              <li key={company.name}>
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={80}
                  height={80}
                  quality={100}
                  className="w-28 h-auto"
                />
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

export default BrandSlider;