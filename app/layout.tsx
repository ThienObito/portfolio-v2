import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import ContactBubble from '@/components/ContactBubble';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portfolio | Creative Developer',
  description:
    'Full-stack developer & designer. Scroll-driven storytelling, interactive visuals, and high-performance web experiences.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${archivo.variable} ${plexMono.variable}`}>
      <body className="bg-[#0B0B0D] antialiased">
        <Navbar />
        {children}
        <ContactBubble />
      </body>
    </html>
  );
}
