import { NextRequest, NextResponse } from 'next/server';

/**
 * API Callback pour traiter les paiements de livres
 * POST /api/payment/callback/books
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, status, paymentData, type } = body;

    console.log('📍 Callback de paiement livre reçu:', {
      token,
      status,
      type,
      montant: paymentData?.Montant,
    });

    // Vérifier les données requises
    if (!token || !paymentData) {
      return NextResponse.json(
        { success: false, message: 'Données manquantes' },
        { status: 400 }
      );
    }

    const personalInfo = paymentData.personal_Info?.[0];
    const bookId = personalInfo?.bookId;

    if (!bookId) {
      return NextResponse.json(
        { success: false, message: 'ID du livre manquant' },
        { status: 400 }
      );
    }

    console.log('✅ Traitement paiement livre:', bookId);

    // TODO: Appeler le backend pour:
    // 1. Marquer le livre comme acheté pour cet utilisateur
    // 2. Générer un lien de téléchargement
    // 3. Envoyer email avec le lien de téléchargement

    return NextResponse.json({
      success: true,
      bookId,
      downloadUrl: `/api/books/${bookId}/download?token=${token}`,
      message: 'Paiement du livre traité avec succès',
    }, { status: 200 });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erreur serveur';
    console.error('❌ Erreur callback paiement livre:', error);
    return NextResponse.json(
      { success: false, message: errorMessage || 'Erreur serveur' },
      { status: 500 }
    );
  }
}
