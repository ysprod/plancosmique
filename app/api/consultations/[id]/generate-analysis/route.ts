import { NextRequest, NextResponse } from 'next/server';
import { deepSeekService } from '@/lib/api/services/deepseek.service';
import { sendAnalysisReadyEmail } from '@/lib/api/services/email.service';
import type { BirthData, AnalyseAstrologique } from '@/types/astrology.types';

/**
 * API Route pour générer l'analyse astrologique complète
 * POST /api/consultations/[id]/generate-analysis
 */
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const consultationId = params.id;
  
  try {
    if (!consultationId) {
      return NextResponse.json(
        { success: false, error: 'ID de consultation manquant' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const birthData: BirthData = body.birthData;

    // Validation des données de naissance
    if (!birthData || !birthData.nom || !birthData.prenoms || 
        !birthData.dateNaissance || !birthData.heureNaissance || 
        !birthData.villeNaissance || !birthData.paysNaissance) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Données de naissance incomplètes' 
        },
        { status: 400 }
      );
    }

    console.log('[API] Génération analyse pour consultation:', consultationId);
    console.log('[API] Données naissance:', birthData);

    // Note: Ne pas utiliser localStorage côté serveur - sauvegarde faite côté client

    // Générer l'analyse complète via DeepSeek
    const analyse = await deepSeekService.genererAnalyseComplete(birthData);

    // Construire l'objet AnalyseAstrologique complet
    const analyseComplete: AnalyseAstrologique = {
      consultationId,
      carteDuCiel: analyse.carteDuCiel,
      missionDeVie: analyse.missionDeVie,
      talentsNaturels: analyse.talentsNaturels,
      relations: analyse.relations,
      carriereVocation: analyse.carriere,
      spiritualiteCroissance: analyse.spiritualite,
      dateGeneration: new Date().toISOString(),
    };

    console.log('[API] Analyse générée avec succès');
    console.log('[API] ⚠️ Note: Sauvegarde localStorage à faire côté client');

    // Envoyer l'email de notification (non-bloquant)
    if (birthData.email) {
      sendAnalysisReadyEmail(
        birthData.email,
        birthData.prenoms,
        birthData.nom,
        consultationId
      ).then(result => {
        if (result.success) {
          console.log('[API] Email de notification envoyé à:', birthData.email);
        } else {
          console.error('[API] Échec envoi email:', result.error);
        }
      }).catch(err => {
        console.error('[API] Erreur envoi email:', err);
      });
    } else {
      console.warn('[API] Pas d\'email fourni - notification non envoyée');
    }

    return NextResponse.json({
      success: true,
      consultationId,
      statut: 'completed',
      message: 'Analyse astrologique générée avec succès',
      analyse: analyseComplete,
    });

  } catch (error) {
    console.error('[API] Erreur génération analyse:', error);

    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    
    // Note: Le statut d'erreur sera géré côté client
    console.error('[API] Erreur:', errorMessage);
    
    return NextResponse.json(
      {
        success: false,
        error: `Erreur lors de la génération: ${errorMessage}`,
        statut: 'error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/consultations/[id]/generate-analysis
 * Endpoint déprécié - utiliser GET /api/consultations/{id} à la place
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const consultationId = params.id;

    if (!consultationId) {
      return NextResponse.json(
        { success: false, error: 'ID de consultation manquant' },
        { status: 400 }
      );
    }

    // Cet endpoint n'utilise plus localStorage
    // Rediriger vers l'API backend pour récupérer l'analyse
    return NextResponse.json({
      success: false,
      error: 'Endpoint déprécié',
      message: 'Veuillez utiliser GET /api/consultations/{id} pour récupérer l\'analyse',
    }, { status: 410 }); // 410 Gone

  } catch (error) {
    console.error('[API] Erreur récupération analyse:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la récupération de l\'analyse',
      },
      { status: 500 }
    );
  }
}
