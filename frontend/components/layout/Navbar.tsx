'use client';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-[#FEFCF8] border-b border-[#D9CEB8] flex items-center justify-between px-10 py-4">
      {/* Logo */}
      <Link href="/" className="font-serif text-2xl font-semibold tracking-wide text-ink">
        ✦ <span className="text-gold">Merlin</span> Bookstore
      </Link>

      {/* Nav links */}
      <ul className="flex gap-8 list-none">
        {[
          { label: 'Home', href: '/' },
          { label: 'Books', href: '/books' },
          { label: 'Categories', href: '/categories' },
        ].map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-xs tracking-widest uppercase text-muted hover:text-gold transition-colors font-body"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Cart */}
      <Link
        href="/cart"
        className="flex items-center gap-2 bg-ink text-cream px-5 py-2 text-sm tracking-wide hover:bg-brown transition-colors font-body"
      >
        <ShoppingBag size={15} />
        Cart
        {totalItems > 0 && (
          <span className="bg-gold text-ink rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {totalItems}
          </span>
        )}
      </Link>
    </nav>
  );
}
