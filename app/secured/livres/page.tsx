'use client';
import BooksDownloadInfo from '@/components/livres/BooksDownloadInfo';
import BooksGrid from '@/components/livres/BooksGrid';
import BooksHeader from '@/components/livres/BooksHeader';
import BooksListLoading from '@/components/livres/BooksListLoading';
import { useBooks } from '@/hooks/livres/useBooks';

export default function LivresPage() {
  const { loading, books, error, handlePurchase, purchasingBookId } = useBooks();

  if (loading) { return <BooksListLoading />; }

  if (error) {
    return <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
      <p className="text-red-700 font-semibold">{error}</p>
    </div>;
  }

  return (
    <div className=" bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <BooksHeader />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <BooksGrid books={books} purchasingBookId={purchasingBookId} onPurchase={handlePurchase} />
        </div>
        <BooksDownloadInfo />
      </div>
    </div>
  );
}