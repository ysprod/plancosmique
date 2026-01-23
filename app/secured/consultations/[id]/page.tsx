import ConsultationResultPageClient from '@/components/secured/consultations/ConsultationResultPageClient';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // Appel API pour récupérer la consultation
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/v1/consultations/${params.id}`);
  if (!res.ok) {
    return {
      title: 'Consultation | Mon Étoile',
      description: 'Résultat de la consultation sur Mon Étoile.',
    };
  }
  const data = await res.json();
  const title = data?.title || 'Consultation | Mon Étoile';
  const description = data?.description || 'Résultat de la consultation sur Mon Étoile.';
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.monetoile.org'}/secured/consultations/${params.id}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function ConsultationResultPage() {
  return <ConsultationResultPageClient />;
}