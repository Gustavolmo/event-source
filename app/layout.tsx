import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ProviderWrap from './providerWrap';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Event Sauce',
  description: 'Source of truth for your events',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderWrap>{children}</ProviderWrap>
      </body>
    </html>
  );
}
