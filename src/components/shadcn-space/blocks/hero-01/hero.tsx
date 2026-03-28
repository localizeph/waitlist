'use client';

import { Instrument_Serif } from 'next/font/google';
import { motion } from 'motion/react';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
});

function HeroSection() {
  return (
    <section>
      <div className="w-full h-full relative">
        {/* Increased vertical padding for the "breathable" feel */}
        <div className="relative w-full pt-20 md:pt-32 pb-16 md:pb-24 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-sky-100 before:via-white before:to-amber-100 before:rounded-full before:top-24 before:blur-3xl before:-z-10 dark:before:from-slate-800 dark:before:via-black dark:before:to-stone-700 dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10">

          {/* Expanded container to max-w-7xl to allow the mockup to be much larger */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            <div className="flex flex-col w-full mx-auto gap-16 md:gap-24">

              {/* Text container restricted to 5xl to keep line-lengths readable */}
              <div className="relative flex flex-col text-center items-center gap-6 sm:gap-8 max-w-5xl mx-auto">
                <motion.h1
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  className="lg:text-8xl md:text-7xl text-5xl font-medium leading-14 md:leading-20 lg:leading-24"
                >
                  The transit ad platform for{' '}
                  <span className={`${instrumentSerif.className} tracking-tight`}>
                    brands that move.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: 'easeInOut' }}
                  className="text-base font-normal max-w-2xl text-muted-foreground leading-relaxed px-4"
                >
                  Purpose-built for managing ad campaigns that go beyond the
                  feed. Designed for agile marketers.
                </motion.p>
              </div>

              {/* Large Mockup Container with Glow Trail */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: 'easeInOut' }}
                className="relative w-full"
              >
                {/* Shimmer border — background-position trick, no element translation */}
                <div
                  className="relative rounded-2xl p-[1px] overflow-hidden"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.4) 25%, rgba(251,191,36,0.3) 50%, rgba(56,189,248,0.4) 75%, transparent 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 18s linear infinite',
                  }}
                >
                  <div className="rounded-2xl overflow-hidden bg-background">
                    <img
                      src="/mockup.png"
                      alt="App mockup"
                      className="w-full h-auto rounded-2xl"
                    />
                  </div>
                </div>

                {/* Bottom fade */}
                <div className="absolute inset-0 pointer-events-none [background:linear-gradient(to_bottom,transparent_60%,white_100%)] dark:[background:linear-gradient(to_bottom,transparent_60%,black_100%)]" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;