'use client';
import { useEffect, useState } from 'react';
import { getBook, Book } from '@/lib/api';
import { useCart } from '@/lib/cartContext';
import { useParams, useRouter } from 'next/navigation';

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    getBook(id)
      .then(setBook)
      .catch(() => router.push('/books'))
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) return <div className="p-10 text-muted font-body">Loading...</div>;
  if (!book) return null;

  const handleAdd = () => {
    addItem({ bookId: book._id, title: book.title, author: book.author, price: book.price, coverColor: book.coverColor });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="px-10 py-12 max-w-4xl mx-auto">
      <button onClick={() => router.back()} className="text-xs tracking-widest uppercase text-muted hover:text-gold mb-8 block font-body">
        ← Back
      </button>

      <div className="flex gap-12 items-start">
        {/* Cover */}
        <div
          className="flex-shrink-0 w-52 relative"
          style={{ background: book.coverColor, aspectRatio: '2/3' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
          {book.badge && (
            <span
              className="absolute top-3 right-3 text-[10px] px-2 py-0.5 font-bold tracking-widest uppercase"
              style={{ background: book.coverAccent, color: book.coverColor }}
            >
              {book.badge}
            </span>
          )}
          <p className="absolute bottom-4 left-4 right-4 font-serif text-sm text-white/90 leading-snug z-10">
            {book.title}
          </p>
        </div>

        {/* Info */}
        <div className="flex-1">
          <p className="text-xs tracking-widest uppercase text-gold mb-2 font-body">{book.genre}</p>
          <h1 className="font-serif text-4xl font-light text-ink mb-2 leading-tight">{book.title}</h1>
          <p className="text-muted font-body mb-4">by {book.author}</p>

          <div className="flex items-baseline gap-3 mb-6">
            {book.originalPrice && (
              <del className="text-muted text-base font-body">${book.originalPrice.toFixed(2)}</del>
            )}
            <span className="text-gold font-serif text-3xl">${book.price.toFixed(2)}</span>
          </div>

          {book.description && (
            <p className="font-body text-base leading-relaxed text-[#3A2E22] mb-8 max-w-md">
              {book.description}
            </p>
          )}

          <div className="flex gap-3">
            <button onClick={handleAdd} className={`btn-dark px-8 ${added ? 'opacity-80' : ''}`}>
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <a href="/cart" className="btn-outline">View Cart</a>
          </div>

          <p className="text-xs text-muted mt-4 font-body">
            {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
          </p>
        </div>
      </div>
    </div>
  );
}
