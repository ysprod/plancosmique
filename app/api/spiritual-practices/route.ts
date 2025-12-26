/**
 * API Endpoint pour récupérer les pratiques spirituelles
 * GET /api/spiritual-practices
 * GET /api/spiritual-practices?category=spiritualite-africaine
 * GET /api/spiritual-practices?published=true
 */

import { NextRequest, NextResponse } from 'next/server';

// Cette route est dynamique car elle dépend de searchParams
export const dynamic = 'force-dynamic';

// TODO: Remplacez par votre client DB
// import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const category = searchParams.get('category');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const published = searchParams.get('published');

    // TODO: Implémenter la requête DB
    // Exemple avec Prisma:
    /*
    const practices = await db.spiritualPractice.findMany({
      where: {
        ...(category && { category }),
        ...(published !== null && { published: published === 'true' })
      },
      orderBy: {
        order_index: 'asc'
      }
    });
    */

    // Exemple avec Supabase:
    /*
    let query = supabase
      .from('spiritual_practices')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (category) {
      query = query.eq('category', category);
    }
    
    if (published !== null) {
      query = query.eq('published', published === 'true');
    }
    
    const { data: practices, error } = await query;
    
    if (error) throw error;
    */

    // Pour l'instant, retourner données mockées
    const mockPractices = [
      {
        id: 'sp-bases',
        slug: 'bases',
        title: 'Notions de Base',
        iconName: 'BookOpen',
        category: 'spiritualite-africaine',
        published: true,
        order: 1,
        description: 'Fondements essentiels de la spiritualité africaine ancestrale'
      },
    ];

    return NextResponse.json({
      success: true,
      count: mockPractices.length,
      data: mockPractices
    });

  } catch (error) {
    console.error('Error fetching spiritual practices:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch spiritual practices',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
