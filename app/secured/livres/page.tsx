'use client';
import BooksDownloadInfo from '@/components/livres/BooksDownloadInfo';
import BooksGrid from '@/components/livres/BooksGrid';
import BooksHeader from '@/components/livres/BooksHeader';
import { useBooks } from '@/hooks/livres/useBooks';
import { useAuth } from '@/lib/auth/AuthContext';
import axios from 'axios';
import BooksListLoading from '@/components/livres/BooksListLoading';
import { useState } from 'react';

export default function LivresPage() {
  const { user } = useAuth();
  const { books, loading, error, setError } = useBooks();
  const [purchasingBookId, setPurchasingBookId] = useState<string | null>(null);

  const handlePurchase = async (book: any) => {
    setPurchasingBookId(book.bookId);
    setError(null);
    try {
      const phoneNumber = user?.phone || '0758385387';
      const clientName = user?.username || 'Client';
      const paymentData = {
        totalPrice: book.price,
        article: [{ livre: book.price }],
        personal_Info: [{
          bookId: book.bookId,
          bookTitle: book.title,
          productType: 'ebook_pdf',
          phone: phoneNumber,
        }],
        numeroSend: phoneNumber,
        nomclient: clientName,
        return_url: `'https://www.monetoile.org/callback?book_id=${book.bookId}&type=book&phone=${phoneNumber}`,
        webhook_url: `https://www.monetoile.org/api/webhooks/moneyfusion`,
      };
      const apiUrl = "https://www.pay.moneyfusion.net/Mon_Etoile/e47b0c544d03cab1/pay/";
      const response = await axios.post(apiUrl, paymentData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data?.statut && response.data?.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error(response.data?.message || 'Erreur lors du paiement');
      }
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      setError(error.response?.data?.message || error.message || 'Erreur lors du paiement');
      setPurchasingBookId(null);
    }
  };

  if (loading) { return <BooksListLoading />; }

  return (
    <div className=" bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <BooksHeader />
        </div>
        {error && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <BooksGrid books={books} purchasingBookId={purchasingBookId} onPurchase={handlePurchase} />
        </div>
        <BooksDownloadInfo />
      </div>
    </div>
  );
}