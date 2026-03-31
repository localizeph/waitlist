'use client';

import { motion } from 'motion/react';
import { Button } from '~/components/ui/button';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import AnimationContainer from '~/components/global/animation-container';
import { BorderBeam } from '~/components/border-beam';
import Image from 'next/image';


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
                  <span className="font-serif tracking-tight">
                    brands that move.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: 'easeInOut' }}
                  className="text-base font-medium max-w-2xl text-muted-foreground leading-relaxed px-4"
                >
                  Purpose-built for launching advertisement campaigns that go beyond the
                  feed. Designed for agile marketers.
                </motion.p>

                <div className="flex items-center justify-center whitespace-nowrap gap-4 z-50">
                  <Button asChild>
                    <Link href={'#'} className="flex items-center">
                      Get early access
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Mockup Section */}
              <AnimationContainer delay={0.2} className="relative py-12 px-2 bg-transparent w-full">
                <div className="absolute md:top-[10%] left-1/2 w-3/4 -translate-x-1/2 h-1/4 md:h-1/3 inset-0 blur-[5rem] animate-image-glow bg-linear-to-r from-violet-500/50 via-blue-500/50 to-cyan-500/50" />
                <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl ">
                  <BorderBeam
                    size={250}
                    duration={12}
                    delay={9}
                  />
                  <Image
                    src="/mockup.svg"
                    alt="Dashboard"
                    width={1200}
                    height={1200}
                    quality={100}
                    className="rounded-md lg:rounded-xl bg-foreground/10 ring-1 ring-border w-full object-cover object-left"
                  />
                  <div className="absolute -bottom-4 inset-x-0 w-full h-1/2 bg-linear-to-t from-background z-40"></div>
                  <div className="absolute bottom-0 md:-bottom-8 inset-x-0 w-full h-1/4 bg-linear-to-t from-background z-50"></div>
                </div>
              </AnimationContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;