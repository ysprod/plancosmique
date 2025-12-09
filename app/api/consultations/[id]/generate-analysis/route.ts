/**
 * API Route pour générer l'analyse astrologique
 * POST /api/consultations/[id]/generate-analysis
 */

import { NextRequest, NextResponse } from 'next/server';
import { deepSeekService } from '@/lib/api/services/deepseek.service';
import { sendAnalysisReadyEmail } from '@/lib/api/services/email.service';
import type { AnalyseAstrologique } from '@/types/astrology.types';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const consultationId = params.id;
    const body = await request.json();
    const { birthData } = body;

    if (!consultationId) {
      return NextResponse.json(
        { success: false, message: 'ID de consultation manquant' },
        { status: 400 }
      );
    }

    if (!birthData) {
      return NextResponse.json(
        { success: false, message: 'Données de naissance manquantes' },
        { status: 400 }
      );
    }

    console.log('🔮 [Génération] Début génération analyse pour:', consultationId);

    // 1. Générer l'analyse complète via DeepSeek
    const analyse = await deepSeekService.genererAnalyseComplete(birthData);

    // 2. Ajouter les métadonnées
    const analyseComplete: AnalyseAstrologique = {
      ...analyse,
      consultationId,
      dateGeneration: new Date().toISOString(),
    };

    console.log('✅ [Génération] Analyse générée avec succès');

    // 3. Sauvegarder l'analyse en base de données
    // TODO: Implémenter l'appel à votre backend pour sauvegarder
    // const saveResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/consultations/${consultationId}/save-analysis`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     analyse: analyseComplete,
    //     statut: 'completed',
    //   }),
    // });

    // 4. Envoyer l'email de notification (si email fourni)
    // NOTE: L'email n'est pas fourni au callback. 
    // Pour l'implémenter, il faudrait récupérer l'email depuis la consultation créée
    // ou le passer dans les données de paiement MoneyFusion
    try {
      // Placeholder pour email - à implémenter selon votre backend
      const clientEmail = `${birthData.prenoms.toLowerCase()}.${birthData.nom.toLowerCase()}@example.com`;
      
      await sendAnalysisReadyEmail(
        clientEmail,
        birthData.prenoms,
        birthData.nom,
        consultationId
      );
      console.log('📧 Email de notification envoyé à:', clientEmail);
    } catch (emailError: unknown) {
      console.warn('⚠️ Erreur envoi email:', emailError instanceof Error ? emailError.message : 'Erreur inconnue');
      // Ne pas interrompre si l'email échoue
    }

    return NextResponse.json({
      success: true,
      consultationId,
      analyse: analyseComplete,
      message: 'Analyse générée avec succès',
    }, { status: 200 });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erreur serveur';
    console.error('❌ [Génération] Erreur:', error);

    return NextResponse.json(
      {
        success: false,
        message: errorMessage || 'Erreur lors de la génération de l\'analyse',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/consultations/[id]/generate-analysis
 * Récupère le statut de génération (optionnel pour polling)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const consultationId = params.id;

    if (!consultationId) {
      return NextResponse.json(
        { success: false, message: 'ID de consultation manquant' },
        { status: 400 }
      );
    }

    console.log('📊 [Statut] Vérification statut génération:', consultationId);

    // TODO: Récupérer le statut depuis votre backend
    // const statusResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/consultations/${consultationId}/status`);
    // const statusData = await statusResponse.json();

    return NextResponse.json({
      success: true,
      consultationId,
      statut: 'completed', // Placeholder - remplacer par données réelles
      message: 'Statut récupéré',
    }, { status: 200 });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erreur serveur';
    console.error('❌ [Statut] Erreur:', error);

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
