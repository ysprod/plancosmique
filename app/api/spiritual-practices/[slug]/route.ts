/**
 * API Endpoint pour récupérer une pratique spirituelle par slug
 * GET /api/spiritual-practices/[slug]
 */

import { NextRequest, NextResponse } from 'next/server';
 

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      );
    }

    // TODO: Implémenter la requête DB
    // Exemple avec Prisma:
    /*
    const practice = await db.spiritualPractice.findUnique({
      where: { slug }
    });
    
    if (!practice) {
      return NextResponse.json(
        { error: 'Practice not found' },
        { status: 404 }
      );
    }
    */

    // Exemple avec Supabase:
    /*
    const { data: practice, error } = await supabase
      .from('spiritual_practices')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Practice not found' },
          { status: 404 }
        );
      }
      throw error;
    }
    */

    // Mock data pour test
    const mockPractice = {
      id: 'sp-bases',
      slug: 'bases',
      title: 'Notions de Base',
      iconName: 'BookOpen',
      category: 'spiritualite-africaine',
      published: true,
      order: 1,
      description: 'Fondements essentiels de la spiritualité africaine ancestrale',
      introduction: 'La spiritualité africaine est un système de croyances millénaires...',
      keyElements: [
        'Connexion avec les ancêtres',
        'Force vitale (Ashé/Nyama)',
        // ...
      ],
      // ... tous les autres champs
    };

    if (mockPractice.slug !== slug) {
      return NextResponse.json(
        { error: 'Practice not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: mockPractice
    });

  } catch (error) {
    console.error('Error fetching spiritual practice:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch spiritual practice',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
