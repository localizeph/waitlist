'use client';

import { useState } from 'react';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import MaxWidthWrapper from '~/components/global/max-width-wrapper';

type FeatureLink = {
  label: string;
  href: string;
};

type Feature = {
  title: string;
  description: string;
  links: (FeatureLink & { children?: FeatureLink[] })[];
};

type ShowcaseFeature = {
  index: string;   // e.g. "1.1"
  label: string;
  href: string;
  preview: React.ReactNode;
};

// ─── Mock previews ────────────────────────────────────────────────────────────

const TimeslotPreview = () => (
  <div className="w-full h-full flex items-start gap-3 p-4 font-mono text-xs">
    <div className="flex flex-col gap-2 w-full">
      {['Morning Peak', 'Mid Peak', 'Off Peak', 'Evening Peak'].map((slot, i) => (
        <div
          key={slot}
          className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-2"
        >
          <span className="text-white/80">{slot}</span>
          <span className="text-white/40 text-[10px]">{['06:00–09:00', '11:00–13:00', '09:00–17:00', '17:00–20:00'][i]}</span>
          <span className="text-white/50 bg-white/10 rounded px-1.5 py-0.5">2</span>
        </div>
      ))}
    </div>
  </div>
);

const CampaignPreview = () => (
  <div className="w-full h-full flex flex-col gap-2 p-4 font-mono text-xs">
    <div className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Running Campaigns</div>
    {[
      { num: 1, title: 'Horizontal incremental internet solution', account: 'e98445ab...' },
      { num: 2, title: 'User-friendly fresh-thinking initiative', account: 'ee2cae86...' },
    ].map(({ num, title, account }) => (
      <div key={num} className="flex items-start gap-2 border border-white/10 bg-white/5 rounded-md px-3 py-2">
        <span className="text-white/30 mt-0.5">#{num}</span>
        <div>
          <p className="text-white/80 leading-snug">{title}</p>
          <p className="text-white/30 text-[10px] mt-0.5">Account: {account}</p>
        </div>
      </div>
    ))}
  </div>
);

const DevicePreview = () => (
  <div className="w-full h-full flex flex-col gap-2 p-4 font-mono text-xs">
    <div className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Devices</div>
    {['Bus Route 12 – Screen A', 'Bus Route 12 – Screen B', 'Terminal 3 – Main Hall'].map((d, i) => (
      <div key={d} className="flex items-center justify-between border border-white/10 bg-white/5 rounded-md px-3 py-2">
        <span className="text-white/80">{d}</span>
        <span className={`text-[10px] px-1.5 py-0.5 rounded ${i < 2 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
          {i < 2 ? 'Online' : 'Syncing'}
        </span>
      </div>
    ))}
  </div>
);

const AnalyticsPreview = () => (
  <div className="w-full h-full flex flex-col gap-3 p-4 font-mono text-xs">
    <div className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Campaign Analytics</div>
    <div className="grid grid-cols-3 gap-2">
      {[['Impressions', '124,302'], ['CTR', '3.8%'], ['Reach', '89,410']].map(([k, v]) => (
        <div key={k} className="flex flex-col gap-0.5 bg-white/5 border border-white/10 rounded-md p-2">
          <span className="text-white/40">{k}</span>
          <span className="text-white/90 text-sm font-semibold">{v}</span>
        </div>
      ))}
    </div>
    <div className="flex items-end gap-1 h-16 mt-1">
      {[40, 65, 50, 80, 70, 90, 60, 85, 75, 95, 70, 88].map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-violet-500/40"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  </div>
);

// ─── Feature data ─────────────────────────────────────────────────────────────

const feature: Feature = {
  title: 'Transit ad platform for brands that move.',
  description:
    'Manage your campaigns, timeslots, and devices — all from one dashboard. Built for agile marketers and transit operators.',
  links: [
    {
      label: 'Platform',
      href: '#',
      children: [
        { label: 'Timeslots', href: '#' },
        { label: 'Campaigns', href: '#' },
        { label: 'Devices', href: '#' },
        { label: 'Analytics', href: '#' },
      ],
    },
  ],
};

const subFeatures: ShowcaseFeature[] = [
  { index: '1.1', label: 'Timeslots', href: '#', preview: <TimeslotPreview /> },
  { index: '1.2', label: 'Campaigns', href: '#', preview: <CampaignPreview /> },
  { index: '1.3', label: 'Devices', href: '#', preview: <DevicePreview /> },
  { index: '1.4', label: 'Analytics', href: '#', preview: <AnalyticsPreview /> },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function FeatureShowcase() {
  const [active, setActive] = useState(0);

  return (
    <MaxWidthWrapper>
      <div className="w-full bg-background text-foreground py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Top: heading + description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight">
              {feature.title}
            </h2>
            <div className="flex flex-col justify-between gap-8 md:pt-2">
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                {feature.description}
              </p>
              <Link
                href={feature.links[0].href}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit group"
              >
                <span className="text-muted-foreground/50">1.0</span>
                {feature.links[0].label}
                <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Center: interactive mockup */}
          <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0d] aspect-[16/9] md:aspect-[2/1]">
            {/* glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-2/3 h-1/3 blur-[80px] bg-violet-500/10" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* mock window chrome */}
                <div className="w-[85%] h-[85%] rounded-lg border border-white/10 bg-[#111] flex flex-col overflow-hidden shadow-2xl">
                  {/* titlebar */}
                  <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/10 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <span className="ml-3 text-[10px] text-white/30 font-mono tracking-wide">
                      {subFeatures[active].label.toLowerCase()}
                    </span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    {subFeatures[active].preview}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom: sub-feature links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 mt-10">
            {subFeatures.map((f, i) => (
              <button
                key={f.index}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 text-sm transition-colors text-left group ${active === i ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <span className={`transition-colors ${active === i ? 'text-muted-foreground' : 'text-muted-foreground/40'}`}>
                  {f.index}
                </span>
                <span>{f.label}</span>
                {active === i && (
                  <motion.span layoutId="active-dot" className="ml-auto w-1 h-1 rounded-full bg-foreground" />
                )}
              </button>
            ))}
          </div>

        </div>
      </div>
    </MaxWidthWrapper>
  );
}