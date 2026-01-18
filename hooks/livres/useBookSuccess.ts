import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api/client';

export interface PurchaseInfo {
  downloadUrl: string;
  token: string;
  bookTitle: string;
  expiresAt?: string;
}

export function useBookSuccess() {
  const searchParams = useSearchParams();
  const bookId = searchParams?.get('book_id') || null;
  const phone = searchParams?.get('phone') || null;
  const [purchaseInfo, setPurchaseInfo] = useState<PurchaseInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkPurchase = async () => {
      if (!bookId || !phone) {
        setError('Informations manquantes');
        setLoading(false);
        return;
      }
      try {
        const response = await api.post(`/books/${bookId}/check-purchase`, { phone });
        if (response.data?.downloadUrl && response.data?.token) {
          setPurchaseInfo(response.data);
        } else {
          setError('Achat non trouvé. Veuillez contacter le support.');
        }
      } catch (err) {
        setError('Impossible de vérifier votre achat. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };
    checkPurchase();
  }, [bookId, phone]);

  const handleDownload = () => {
    if (purchaseInfo) {
      window.location.href = purchaseInfo.downloadUrl;
    }
  };

  return { purchaseInfo, loading, error, handleDownload };
}
