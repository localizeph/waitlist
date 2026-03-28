import type { Metadata } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

import './globals.css';
import Header, {
  NavigationSection,
} from '~/components/shadcn-space/blocks/hero-01/header';
import { ThemeProvider } from '~/providers/theme-provider';
import client from '~/__generated__/client';
import { toNavItems } from '~/lib/nav';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['500'],
});

const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Localize | The transit ad platform for brands that move.',
  description:
    'Purpose-built for managing ad campaigns that go beyond the feed. Designed for agile marketers.',
  keywords: [
    'transit media advertising',
    'digital out-of-home advertising',
    'DOOH platform',
    'public transport advertising',
    'remote ad management',
    'cloud-based advertising platform',
    'transit screen advertising',
    'agile marketing platform',
  ],
  metadataBase: new URL('https://localizeph.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Localize | The transit ad platform for brands that move.',
    description:
      'Purpose-built for managing ad campaigns that go beyond the feed. Designed for agile marketers.',
    url: 'https://localizeph.com',
    siteName: 'Localize',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Localize | The transit ad platform for brands that move.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Localize | The transit ad platform for brands that move.',
    description:
      'Purpose-built for managing ad campaigns that go beyond the feed. Designed for agile marketers.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navRes = await client.queries.nav({ relativePath: "nav.json" });
  const nav = navRes.data.nav;

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${interTight.variable} ${inter.variable} antialiased flex flex-col h-full`}
      >
        <ThemeProvider>
          <div className="relative">
            <Header navigationData={toNavItems(nav.header)} />

            <Toaster />
            {children}
            <Analytics />
            <SpeedInsights />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
