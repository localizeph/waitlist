import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MaxWidthWrapper from "~/components/global/max-width-wrapper";

export type FeatureLink = {
  index: number;
  label: string;
  href: string;
};

export type Feature = {
  title: string;
  description: string;
  links: (FeatureLink & { children?: FeatureLink[] })[];
};

interface FeatureSectionProps extends Feature {
  children?: React.ReactNode;
}

function LinearMockup() {
  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-xl border border-dashed border-[#27272a] bg-[#0a0a0a] flex items-center justify-center">
      <span className="text-sm text-[#52525b] font-mono">Mock UI</span>
    </div>
  );
}

export function FeatureSection({
  title,
  description,
  links,
  children,
}: FeatureSectionProps) {
  const mainLink = links[0];

  return (
    <MaxWidthWrapper className="my-4 lg:my-8">
      {/* Top Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-36 mb-16 lg:mb-24 items-start">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[2.5rem] leading-[1.1] md:text-5xl lg:text-5xl font-medium tracking-tight text-foreground max-w-md text-balance"
        >
          {title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start justify-start gap-8"
        >
          <p className="text-md md:text-lg text-[#a1a1aa] leading-[1.4] font-normal mb-8 max-w-lg">
            {description}
          </p>

          {mainLink && (
            <a
              href={mainLink.href}
              className="group flex items-center gap-3 text-foreground text-base font-medium transition-colors hover:text-accent-foreground"
            >
              <span className="font-mono text-sm text-muted-foreground/85">
                {Number(mainLink.index).toFixed(1)}
              </span>
              {mainLink.label}
              <ArrowRight className="w-4 h-4 text-[#52525b] transition-all group-hover:translate-x-1 group-hover:text-white" />
            </a>
          )}
        </motion.div>
      </div>

      {/* Center: Main Visual - NO overflow-hidden, proper sizing */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        {children || <LinearMockup />}
      </motion.div>

      {/* Bottom: Sub-links Grid */}
      {mainLink?.children && mainLink.children.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-16 lg:mt-24">
          <div className="hidden lg:block" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4"
          >
            {mainLink.children.map((child, idx) => (
              <a
                key={child.label}
                href={child.href}
                className="group flex items-center gap-4 text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors"
              >
                <span className="font-mono text-sm text-[#52525b] group-hover:text-[#71717a]">
                  {mainLink.index}.{idx + 1}
                </span>
                <span className="text-[15px]">{child.label}</span>
              </a>
            ))}
          </motion.div>
        </div>
      )}
    </MaxWidthWrapper>
  );
}

