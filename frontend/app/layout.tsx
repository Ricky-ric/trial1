import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cartContext';
import Navbar from '@/components/layout/Navbar';
import AnnouncementBar from '@/components/layout/AnnouncementBar';

export const metadata: Metadata = {
  title: 'Merlin Bookstore — Where Stories Come Alive',
  description: 'A curated collection of literary treasures — from timeless classics to contemporary masterpieces.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
