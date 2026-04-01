import { getBooks, getGenres } from '@/lib/api';
import BookCard from '@/components/ui/BookCard';
import Link from 'next/link';

interface Props {
  searchParams: { genre?: string; featured?: string; isNew?: string; search?: string; page?: string };
}

export default async function BooksPage({ searchParams }: Props) {
  const page = Number(searchParams.page || 1);
  const params: Record<string, string | number> = { page, limit: 12 };
  if (searchParams.genre) params.genre = searchParams.genre;
  if (searchParams.featured) params.featured = searchParams.featured;
  if (searchParams.isNew) params.isNew = searchParams.isNew;
  if (searchParams.search) params.search = searchParams.search;

  const [{ books, total, pages }, genres] = await Promise.all([
    getBooks(params),
    getGenres(),
  ]);

  const activeGenre = searchParams.genre || '';

  return (
    <div className="px-10 py-10">
      <div className="flex items-baseline justify-between border-b border-[#D9CEB8] pb-4 mb-8">
        <h1 className="section-title">All Books <span className="text-muted text-lg">({total})</span></h1>
      </div>

      <div className="flex gap-10">
        {/* Sidebar filters */}
        <aside className="w-48 flex-shrink-0">
          <p className="text-xs tracking-widest uppercase text-muted mb-3 font-body">Genre</p>
          <ul className="space-y-1">
            <li>
              <Link
                href="/books"
                className={`block text-sm font-body py-1 transition-colors ${!activeGenre ? 'text-gold font-semibold' : 'text-muted hover:text-gold'}`}
              >
                All Genres
              </Link>
            </li>
            {genres.map((g) => (
              <li key={g}>
                <Link
                  href={`/books?genre=${g}`}
                  className={`block text-sm font-body py-1 transition-colors ${activeGenre === g ? 'text-gold font-semibold' : 'text-muted hover:text-gold'}`}
                >
                  {g}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Book grid */}
        <div className="flex-1">
          {books.length === 0 ? (
            <p className="text-muted font-body">No books found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex gap-2 mt-10">
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/books?${new URLSearchParams({ ...searchParams, page: String(p) })}`}
                  className={`w-9 h-9 flex items-center justify-center border text-sm font-body transition-colors
                    ${p === page ? 'bg-ink text-cream border-ink' : 'border-[#D9CEB8] text-muted hover:border-gold hover:text-gold'}`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
