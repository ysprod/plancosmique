import { useEffect, useState } from 'react';
import { api } from '@/lib/api/client';
import { Book } from '@/lib/interfaces';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return { books, loading, error, setError };
}
