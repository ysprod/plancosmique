import { NextRequest, NextResponse } from 'next/server';
import { deepSeekService } from '@/lib/api/services/deepseek.service';
import { storageService } from '@/lib/storage/local.storage';
import { sendAnalysisReadyEmail } from '@/lib/api/services/email.service';
import type { BirthData, AnalyseAstrologique, StatutConsultation } from '@/types/astrology.types';

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

    // Mettre à jour le statut : génération en cours
    const statutEnCours: StatutConsultation = {
      consultationId,
      statut: 'generating_chart',
      progression: 10,
      etapeCourante: 'Génération de la carte du ciel...',
      dateDebut: new Date().toISOString(),
    };
    storageService.saveStatut(statutEnCours);

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

    // Sauvegarder l'analyse
    storageService.saveAnalyse(analyseComplete);

    // Mettre à jour le statut : terminé
    const statutFinal: StatutConsultation = {
      consultationId,
      statut: 'completed',
      progression: 100,
      etapeCourante: 'Analyse complète',
      dateDebut: statutEnCours.dateDebut,
      dateFin: new Date().toISOString(),
    };
    storageService.saveStatut(statutFinal);

    console.log('[API] Analyse générée avec succès');

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
    
    // Sauvegarder le statut d'erreur
    const statutErreur: StatutConsultation = {
      consultationId,
      statut: 'error',
      progression: 0,
      erreur: errorMessage,
      dateFin: new Date().toISOString(),
    };
    storageService.saveStatut(statutErreur);
    
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
 * Récupère le statut de génération ou l'analyse si terminée
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

    // Récupérer l'analyse depuis le storage
    const analyse = storageService.getAnalyse(consultationId);
    const statut = storageService.getStatut(consultationId);
    
    if (analyse) {
      return NextResponse.json({
        success: true,
        statut: 'completed',
        analyse,
      });
    }

    if (statut) {
      return NextResponse.json({
        success: true,
        statut: statut.statut,
        progression: statut.progression,
        etapeCourante: statut.etapeCourante,
        erreur: statut.erreur,
      });
    }

    // Aucune donnée trouvée
    return NextResponse.json({
      success: true,
      statut: 'pending',
      message: 'Analyse en attente de génération',
    });

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
