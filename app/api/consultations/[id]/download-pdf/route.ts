/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/lib/api/client';
import { CarteDuCiel, MissionDeVie, Sujet } from '@/lib/interfaces';
import { AnalysisDocument } from '@/lib/pdf/analysis-pdf';
import { renderToStream } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';
import { createElement } from 'react';

interface AnalyseData {
  _id: string;
  userId: string;
  consultationId: string;
  carteDuCiel: CarteDuCiel;
  missionDeVie: MissionDeVie;
  dateGeneration: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface BackendResponse {
  success?: boolean;
  analyse: AnalyseData;
}

function generateFilename(sujet: Sujet): string {
  const sanitize = (str: string) =>
    str.trim()
      .replace(/[^a-zA-Z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase()
      .substring(0, 30); // Limite stricte

  const prenoms = sanitize(sujet.prenoms);
  const nom = sanitize(sujet.nom);
  const date = new Date().toISOString().split('T')[0];

  return `analyse-${nom}-${prenoms}-${date}.pdf`;
}

function formatAnalyseForLog(analyse: AnalyseData): object {
  return {
    _id: analyse._id,
    consultationId: analyse.consultationId,
    sujet: {
      nom: analyse.carteDuCiel.sujet.nom,
      prenoms: analyse.carteDuCiel.sujet.prenoms.substring(0, 20),
      dateNaissance: analyse.carteDuCiel.sujet.dateNaissance
    },
    positionsCount: analyse.carteDuCiel.positions.length,
    missionLength: analyse.missionDeVie.contenu.length,
    dateGeneration: analyse.dateGeneration
  };
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const startTime = Date.now();

  try {
    const consultationId = params.id;

    // Validation ID (MongoDB ObjectId = 24 chars hex)
    if (!consultationId || consultationId.length !== 24 || !/^[a-f0-9]{24}$/i.test(consultationId)) {
      console.warn('[PDF] ⚠️ ID de consultation invalide:', consultationId);
      return NextResponse.json(
        {
          success: false,
          error: 'ID de consultation invalide',
          code: 'INVALID_ID'
        },
        { status: 400 }
      );
    }

    console.log('[PDF] 📄 Génération PDF pour consultation:', consultationId);

    // Récupération analyse depuis le backend
    let backendData: BackendResponse;
    try {
      console.log('[PDF] 🔍 Récupération analyse depuis API...');
      const response = await api.get<BackendResponse>(
        `/consultations/analysis/${consultationId}`,
        {
          timeout: 15000,
          headers: {
            'Accept': 'application/json'
          }
        }
      );

      backendData = response.data;

      if (!backendData || !backendData.analyse) {
        console.error('[PDF] ❌ Réponse API invalide:', {
          status: response.status,
          hasData: !!backendData,
          hasAnalyse: !!(backendData && backendData.analyse)
        });

        return NextResponse.json(
          {
            success: false,
            error: 'Structure de réponse API invalide',
            code: 'INVALID_API_RESPONSE'
          },
          { status: 500 }
        );
      }

      console.log('[PDF] ✅ Analyse récupérée:', formatAnalyseForLog(backendData.analyse));

    } catch (err: any) {
      console.error('[PDF] ❌ Erreur récupération analyse:', {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });

      if (err.response?.status === 404) {
        return NextResponse.json(
          {
            success: false,
            error: 'Analyse non trouvée. Veuillez générer l\'analyse d\'abord.',
            code: 'ANALYSIS_NOT_FOUND'
          },
          { status: 404 }
        );
      }

      if (err.response?.status === 401 || err.response?.status === 403) {
        return NextResponse.json(
          {
            success: false,
            error: 'Accès non autorisé à cette analyse',
            code: 'UNAUTHORIZED'
          },
          { status: 403 }
        );
      }

      if (err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT') {
        return NextResponse.json(
          {
            success: false,
            error: 'Délai d\'attente dépassé',
            code: 'TIMEOUT'
          },
          { status: 504 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Erreur lors de la récupération de l\'analyse',
          code: 'API_ERROR',
          details: process.env.NODE_ENV === 'development' ? err.message : undefined
        },
        { status: 500 }
      );
    }

    const analyse = backendData.analyse;
    // Génération du document PDF
    let pdfDocument;
    try {
      pdfDocument = createElement(AnalysisDocument, { analyse });
    } catch (err: any) {
      console.error('[PDF] ❌ Erreur création document:', err);
      return NextResponse.json(
        {
          success: false,
          error: 'Erreur lors de la création du document PDF',
          code: 'PDF_CREATION_ERROR',
          details: process.env.NODE_ENV === 'development' ? err.message : undefined
        },
        { status: 500 }
      );
    }

    // Génération du stream PDF
    console.log('[PDF] 📦 Génération du stream PDF...');
    let stream;
    try {
      stream = await renderToStream(pdfDocument as any);
    } catch (err: any) {
      console.error('[PDF] ❌ Erreur génération stream:', err);
      return NextResponse.json(
        {
          success: false,
          error: 'Erreur lors de la génération du flux PDF',
          code: 'PDF_RENDER_ERROR',
          details: process.env.NODE_ENV === 'development' ? err.message : undefined
        },
        { status: 500 }
      );
    }

    // Génération nom fichier sécurisé
    const filename = generateFilename(analyse.carteDuCiel.sujet);

    const duration = Date.now() - startTime;
    console.log(`[PDF] ✅ PDF généré avec succès en ${duration}ms:`, filename);

    // Retour du PDF en streaming
    return new NextResponse(stream as unknown as ReadableStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Generation-Time': `${duration}ms`,
        'X-Analysis-ID': analyse._id
      },
    });

  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error('[PDF] ❌ Erreur inattendue génération PDF:', {
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      duration: `${duration}ms`
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Erreur inattendue lors de la génération du PDF',
        code: 'UNEXPECTED_ERROR',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}