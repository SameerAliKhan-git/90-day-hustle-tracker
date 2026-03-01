import type { Metadata } from 'next';
import { DM_Sans, JetBrains_Mono, Bebas_Neue } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '90-Day Hustle Tracker | UGC NET + Data Science + Job',
  description: '91-day accountability tracker for UGC NET JRF, Data Science mastery, and job readiness.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetbrainsMono.variable} ${bebasNeue.variable}`}>
      <body>{children}</body>
    </html>
  );
}
