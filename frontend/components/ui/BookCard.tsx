'use client';
import { Book } from '@/lib/api';
import { useCart } from '@/lib/cartContext';
import Link from 'next/link';
import { useState } from 'react';

export default function BookCard({ book }: { book: Book }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      bookId: book._id,
      title: book.title,
      author: book.author,
      price: book.price,
      coverColor: book.coverColor,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <Link href={`/books/${book._id}`} className="group block">
      {/* Cover */}
      <div
        className="w-full relative mb-3 overflow-hidden"
        style={{ background: book.coverColor, aspectRatio: '2/3' }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

        {/* Badge */}
        {book.badge && (
          <span
            className="absolute top-2 right-2 text-[10px] px-2 py-0.5 font-bold tracking-widest uppercase"
            style={{ background: book.coverAccent, color: book.coverColor }}
          >
            {book.badge}
          </span>
        )}

        {/* Title on cover */}
        <p className="absolute bottom-3 left-3 right-3 font-serif text-sm text-white/90 leading-tight z-10">
          {book.title}
        </p>
      </div>

      {/* Info */}
      <p className="text-xs text-muted mb-1 font-body">{book.author}</p>
      <p className="font-serif text-base font-semibold text-ink mb-1 leading-tight">{book.title}</p>
      <p className="text-sm font-body mb-2">
        {book.originalPrice && (
          <del className="text-muted text-xs mr-1">${book.originalPrice.toFixed(2)}</del>
        )}
        <span className="text-gold font-semibold">${book.price.toFixed(2)}</span>
      </p>

      <button
        onClick={handleAdd}
        className={`w-full border text-xs tracking-widest uppercase py-2 transition-all font-body
          ${added
            ? 'bg-ink text-cream border-ink'
            : 'border-[#D9CEB8] text-brown hover:bg-ink hover:text-cream hover:border-ink'
          }`}
      >
        {added ? '✓ Added' : 'Add to Cart'}
      </button>
    </Link>
  );
}
