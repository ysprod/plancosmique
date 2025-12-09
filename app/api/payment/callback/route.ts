import { NextRequest, NextResponse } from 'next/server';
import type { BirthData } from '@/types/astrology.types';

/**
 * Fonction pour générer l'analyse ET ATTENDRE sa fin
 * Retourne true si succès, false si erreur
 */
async function generateAnalysis(
  consultationId: string,
  birthData: BirthData
): Promise<boolean> {
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
      return false;
    }

    const result = await response.json();
    console.log('✅ [Callback] Analyse générée avec succès:', consultationId);
    console.log('📊 [Callback] Résultat:', {
      consultationId: result.consultationId,
      hasAnalyse: !!result.analyse,
    });

    return true;

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    console.error('❌ [Callback] Erreur génération analyse:', errorMessage);
    return false;
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

        // 2. Générer l'analyse et ATTENDRE sa fin
        console.log('⏳ Attente de la génération de l\'analyse...');
        const analysisGenerated = await generateAnalysis(consultationId, birthData);

        if (!analysisGenerated) {
          console.warn('⚠️ L\'analyse n\'a pas pu être générée, mais on continue quand même');
        } else {
          console.log('✅ Analyse générée avec succès');
        }

        return NextResponse.json({
          success: true,
          consultationId,
          analysisGenerated,
          message: analysisGenerated 
            ? 'Paiement et analyse complétés avec succès!'
            : 'Paiement traité mais l\'analyse sera générée ultérieurement.',
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
