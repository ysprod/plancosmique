/**
 * API Route pour télécharger l'analyse en PDF
 * GET /api/consultations/[id]/download-pdf
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import { AnalysisDocument } from '@/lib/pdf/analysis-pdf';
import { createElement } from 'react';

export async function GET(
  request: Request,
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

    // Récupérer l'analyse depuis l'API backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/consultations/${consultationId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Analyse non trouvée. Veuillez générer l\'analyse d\'abord.' 
        },
        { status: 404 }
      );
    }

    const data = await response.json();
    const analyse = data.consultation?.analyse || data.consultation;

    if (!analyse) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Analyse non disponible.' 
        },
        { status: 404 }
      );
    }

    // Créer le document PDF avec React.createElement
    const pdfDocument = createElement(AnalysisDocument, { analyse });
    
    // Générer le stream PDF (cast pour éviter les erreurs de type)
    const stream = await renderToStream(pdfDocument as any);

    // Nom du fichier PDF
    const filename = `analyse-astrologique-${analyse.carteDuCiel.sujet.prenoms}-${analyse.carteDuCiel.sujet.nom}-${new Date().toISOString().split('T')[0]}.pdf`;

    // Retourner le PDF en tant que téléchargement
    return new NextResponse(stream as unknown as ReadableStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });

  } catch (error) {
    console.error('[PDF] Erreur génération PDF:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    
    return NextResponse.json(
      {
        success: false,
        error: `Erreur lors de la génération du PDF: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
