import Link from 'next/link';
import { getBooks, getGenres } from '@/lib/api';
import BookCard from '@/components/ui/BookCard';

const GENRE_ICONS: Record<string, string> = {
  Fiction: '📚', Fantasy: '🌙', 'Sci-Fi': '🔭', 'Non-Fiction': '🏛️',
  Philosophy: '🧠', Memoir: '📖', Business: '💼', History: '🗺️',
};

export default async function HomePage() {
  const [featuredData, newData, genres] = await Promise.all([
    getBooks({ featured: true, limit: 4 }),
    getBooks({ isNew: true, limit: 4 }),
    getGenres(),
  ]);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-ink text-cream grid grid-cols-1 md:grid-cols-2 gap-12 px-10 py-20 min-h-[480px] items-center">
        <div>
          <h1 className="font-serif text-6xl font-light leading-tight mb-5">
            Where Stories<br />
            <em className="italic text-gold-light">Come Alive</em>
          </h1>
          <p className="text-[#C8B89A] text-lg leading-relaxed mb-8 font-body font-light max-w-md">
            A curated collection of literary treasures — from timeless classics to contemporary
            masterpieces. Every book tells a story worth discovering.
          </p>
          <div className="flex gap-4">
            <Link href="/books" className="btn-primary">Explore Books</Link>
            <Link href="/categories" className="btn-outline">Browse Genres</Link>
          </div>
        </div>

        {/* Decorative book spines */}
        <div className="hidden md:flex items-end justify-center gap-3">
          {['#2C3E50','#5D4037','#1A237E','#263238','#880E4F'].map((c, i) => (
            <div
              key={i}
              className="w-10 rounded-sm"
              style={{ background: c, height: [200, 240, 280, 250, 210][i] }}
            />
          ))}
        </div>
      </section>

      {/* ── Featured Books ───────────────────────────────── */}
      <section className="px-10 py-12">
        <div className="flex items-baseline justify-between border-b border-[#D9CEB8] pb-4 mb-8">
          <h2 className="section-title">
            <em className="italic text-gold">Featured</em> Books
          </h2>
          <Link href="/books?featured=true" className="text-xs tracking-widest uppercase text-gold hover:underline font-body">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-7">
          {featuredData.books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────── */}
      <section className="px-10 py-12 bg-parchment">
        <div className="border-b border-[#D9CEB8] pb-4 mb-8">
          <h2 className="section-title">Browse by <em className="italic text-gold">Genre</em></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {genres.map((genre) => (
            <Link
              key={genre}
              href={`/books?genre=${genre}`}
              className="group p-6 text-center border border-[#D9CEB8] bg-[#FEFCF8] hover:bg-ink hover:border-ink transition-all"
            >
              <div className="text-3xl mb-2">{GENRE_ICONS[genre] || '📕'}</div>
              <p className="font-serif text-base font-semibold text-ink group-hover:text-cream transition-colors">{genre}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── New Arrivals ─────────────────────────────────── */}
      <section className="px-10 py-12">
        <div className="flex items-baseline justify-between border-b border-[#D9CEB8] pb-4 mb-8">
          <h2 className="section-title">New <em className="italic text-gold">Arrivals</em></h2>
          <Link href="/books?isNew=true" className="text-xs tracking-widest uppercase text-gold hover:underline font-body">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-7">
          {newData.books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </section>
    </>
  );
}
