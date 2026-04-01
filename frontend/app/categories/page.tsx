import { getGenres } from '@/lib/api';
import Link from 'next/link';

const GENRE_ICONS: Record<string, string> = {
  Fiction: '📚', Fantasy: '🌙', 'Sci-Fi': '🔭', 'Non-Fiction': '🏛️',
  Philosophy: '🧠', Memoir: '📖', Business: '💼', History: '🗺️',
};

const GENRE_DESC: Record<string, string> = {
  Fiction: 'Novels and stories from worlds real and imagined.',
  Fantasy: 'Magic, myth, and worlds beyond our own.',
  'Sci-Fi': 'The future, space, and technology explored.',
  'Non-Fiction': 'True stories, facts, and deep dives.',
  Philosophy: 'Ideas that question how we live and think.',
  Memoir: 'Real lives, real voices, real lessons.',
  Business: 'Strategy, leadership, and entrepreneurship.',
  History: 'The past that shapes our present.',
};

export default async function CategoriesPage() {
  const genres = await getGenres();

  return (
    <div className="px-10 py-12">
      <div className="border-b border-[#D9CEB8] pb-4 mb-10">
        <h1 className="section-title">Browse by <em className="italic text-gold">Genre</em></h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {genres.map((genre) => (
          <Link
            key={genre}
            href={`/books?genre=${genre}`}
            className="group p-7 border border-[#D9CEB8] bg-[#FEFCF8] hover:bg-ink hover:border-ink transition-all text-center"
          >
            <div className="text-4xl mb-3">{GENRE_ICONS[genre] || '📕'}</div>
            <p className="font-serif text-lg font-semibold text-ink group-hover:text-cream transition-colors mb-1">{genre}</p>
            <p className="text-xs text-muted group-hover:text-[#C8B89A] font-body transition-colors">
              {GENRE_DESC[genre] || 'Explore the collection'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
