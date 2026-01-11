import { useEffect, useState } from 'react';
import { api } from '@/lib/api/client';
import { Book } from '@/lib/interfaces';
import axios from 'axios';
import { useAuth } from '@/lib/auth/AuthContext';

export function useBooks() {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchasingBookId, setPurchasingBookId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        const booksData = Array.isArray(response.data) ? response.data : (response.data?.books || []);
        setBooks(booksData);
      } catch (err) {
        setError('Impossible de charger les livres');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

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

  return { books, loading, error, setError, handlePurchase, purchasingBookId };
}
