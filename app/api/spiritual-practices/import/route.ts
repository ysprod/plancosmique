/**
 * API Endpoint pour importer les pratiques spirituelles
 * POST /api/spiritual-practices/import
 * 
 * Utilisez cet endpoint pour importer toutes les pratiques depuis le frontend admin
 */

import { NextRequest, NextResponse } from 'next/server';
import type { SpiritualPracticeDB } from '@/lib/utils/spiritualite-export';

// TODO: Remplacez ceci par votre client DB (Prisma, Supabase, etc.)
// import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification admin
    // TODO: Implémenter votre logique d'auth
    // const session = await getServerSession();
    // if (!session?.user?.isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const practices: SpiritualPracticeDB[] = await request.json();

    if (!Array.isArray(practices)) {
      return NextResponse.json(
        { error: 'Invalid data format. Expected array of practices.' },
        { status: 400 }
      );
    }

    // Validation basique
    for (const practice of practices) {
      if (!practice.id || !practice.title || !practice.slug) {
        return NextResponse.json(
          { error: `Invalid practice data: missing required fields` },
          { status: 400 }
        );
      }
    }

    
    // Pour l'instant, retourner succès simulé
    return NextResponse.json({
      success: true,
      message: `Successfully imported ${practices.length} spiritual practices`,
      count: practices.length,
      practices: practices.map(p => ({ id: p.id, title: p.title }))
    });

  } catch (error) {
    console.error('Error importing spiritual practices:', error);
    return NextResponse.json(
      { 
        error: 'Failed to import spiritual practices',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET endpoint pour tester
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/spiritual-practices/import',
    method: 'POST',
    description: 'Import spiritual practices data into database',
    requiredAuth: 'admin',
    bodyFormat: 'Array<SpiritualPracticeDB>',
    example: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: '[{ id: "sp-bases", title: "Notions de Base", ... }]'
    }
  });
}
