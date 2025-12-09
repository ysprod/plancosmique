import { NextRequest, NextResponse } from 'next/server';
import type { BirthData } from '@/types/astrology.types';

/**
 * Fonction asynchrone pour générer l'analyse sans bloquer la réponse
 */
async function generateAnalysisAsync(
  consultationId: string,
  birthData: BirthData
): Promise<void> {
  try {
    console.log('🔮 [Callback] Démarrage génération analyse pour:', consultationId);

    const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/consultations/${consultationId}/generate-analysis`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ birthData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ [Callback] Erreur génération:', errorData.message);
      return;
    }

    const result = await response.json();
    console.log('✅ [Callback] Analyse générée avec succès:', consultationId);
    console.log('📊 [Callback] Résultat:', {
      consultationId: result.consultationId,
      hasAnalyse: !!result.analyse,
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    console.error('❌ [Callback] Erreur génération analyse:', errorMessage);
    // On n'interrompt pas le flux car la génération est asynchrone
  }
}

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
      const formData = personalInfo?.formData;

      if (!consultationId || !formData) {
        return NextResponse.json(
          { success: false, message: 'ID de consultation ou données manquantes' },
          { status: 400 }
        );
      }

      console.log('✅ Traitement consultation:', consultationId);

      try {
        // 1. Préparer les données de naissance
        const birthData = {
          nom: formData.nom,
          prenoms: formData.prenoms,
          genre: formData.genre,
          dateNaissance: formData.dateNaissance,
          heureNaissance: formData.heureNaissance,
          paysNaissance: formData.paysNaissance,
          villeNaissance: formData.villeNaissance,
        };

        // 2. Déclencher la génération de l'analyse de manière asynchrone
        // On lance la génération mais on ne l'attend pas pour la réponse
        generateAnalysisAsync(consultationId, birthData).catch((err: unknown) => {
          console.error('❌ Erreur génération analyse:', err instanceof Error ? err.message : 'Erreur inconnue');
        });

        return NextResponse.json({
          success: true,
          consultationId,
          message: 'Paiement de consultation traité avec succès. Génération de l\'analyse en cours...',
        }, { status: 200 });

      } catch (processError: unknown) {
        const errorMsg = processError instanceof Error ? processError.message : 'Erreur inconnue';
        console.error('❌ Erreur traitement consultation:', errorMsg);
        return NextResponse.json(
          { success: false, message: `Erreur traitement consultation: ${errorMsg}` },
          { status: 500 }
        );
      }
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
