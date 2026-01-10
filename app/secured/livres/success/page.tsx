'use client';
import BookSuccessLoading from '@/components/livres/BookSuccessLoading';
import BookSuccessError from '@/components/livres/BookSuccessError';
import { Suspense } from 'react';
import BookSuccessMain from '@/components/livres/BookSuccessMain';
import { useBookSuccess } from '@/hooks/livres/useBookSuccess';

function BookSuccessContent() {
  const { purchaseInfo, loading, error, handleDownload } = useBookSuccess();
  if (loading) return <BookSuccessLoading />;
  if (error) return <BookSuccessError error={error} />;
  if (purchaseInfo) return <BookSuccessMain purchaseInfo={purchaseInfo} onDownload={handleDownload} />;
  return null;
}

export default function BookSuccessPage() {
  return (
    <Suspense fallback={
      <div className=" flex items-center justify-center">
        <p>Chargement... </p>
      </div>
    }>
      <BookSuccessContent />
    </Suspense>
  );
}