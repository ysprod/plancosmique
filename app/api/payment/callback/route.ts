import { NextRequest, NextResponse } from 'next/server';

/**
 * API Callback pour traiter les paiements de consultations
 * POST /api/payment/callback
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, status, paymentData, type } = body;

    console.log('📍 Callback de paiement reçu:', {
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

    // Si c'est un paiement de consultation
    if (type === 'consultation') {
      const personalInfo = paymentData.personal_Info?.[0];
      const consultationId = personalInfo?.consultationId;

      if (!consultationId) {
        return NextResponse.json(
          { success: false, message: 'ID de consultation manquant' },
          { status: 400 }
        );
      }

      console.log('✅ Traitement consultation:', consultationId);

      // TODO: Appeler le backend pour:
      // 1. Mettre à jour le statut de la consultation à "paid"
      // 2. Générer l'analyse si nécessaire
      // 3. Envoyer email de confirmation

      return NextResponse.json({
        success: true,
        consultationId,
        message: 'Paiement de consultation traité avec succès',
      }, { status: 200 });
    }

    // Type par défaut
    return NextResponse.json(
      { success: true, message: 'Paiement traité' },
      { status: 200 }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erreur serveur';
    console.error('❌ Erreur callback paiement:', error);
    return NextResponse.json(
      { success: false, message: errorMessage || 'Erreur serveur' },
      { status: 500 }
    );
  }
}
