import { Inter, Inter_Tight, Instrument_Serif, Rethink_Sans } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  weight: ['400'],
  style: ['italic'],
  display: 'swap',
});

export const rethinkSans = Rethink_Sans({
  variable: '--font-rethink-sans',
  subsets: ['latin'],
  weight: ['600']
});
