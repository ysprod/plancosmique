import { NextRequest, NextResponse } from 'next/server';

// Liste des livres disponibles avec leurs fichiers PDF
const BOOKS_DATABASE: Record<string, {
  title: string;
  pdfUrl: string;
  downloadFileName: string;
}> = {
  'secrets-ancestraux': {
    title: 'Les Secrets Ancestraux',
    pdfUrl: '/books/pdf/secrets-ancestraux.pdf',
    downloadFileName: 'secrets-ancestraux.pdf',
  },
  'astrologie-africaine': {
    title: 'Astrologie Africaine',
    pdfUrl: '/books/pdf/astrologie-africaine.pdf',
    downloadFileName: 'astrologie-africaine.pdf',
  },
  'numerologie-sacree': {
    title: 'Numérologie Sacrée',
    pdfUrl: '/books/pdf/numerologie-sacree.pdf',
    downloadFileName: 'numerologie-sacree.pdf',
  },
  'rituels-puissance': {
    title: 'Rituels de Puissance',
    pdfUrl: '/books/pdf/rituels-puissance.pdf',
    downloadFileName: 'rituels-puissance.pdf',
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  const bookId = params.bookId;
  const book = BOOKS_DATABASE[bookId];

  if (!book) {
    return NextResponse.json(
      { error: 'Livre non trouvé' },
      { status: 404 }
    );
  }

  // TODO: Vérifier que l'utilisateur a bien acheté ce livre
  // En vérifiant le paiement dans la base de données

  return NextResponse.json({
    bookId,
    title: book.title,
    downloadUrl: book.pdfUrl,
    fileName: book.downloadFileName,
  });
}
