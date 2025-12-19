import { NextResponse } from 'next/server';
import { getMostSoldOfferings } from '@/lib/api/stats/offerings';

// GET /api/stats/offerings
export async function GET() {
  try {
    const stats = await getMostSoldOfferings();
    return NextResponse.json({ stats });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de l’agrégation des ventes d’offrandes' }, { status: 500 });
  }
}
