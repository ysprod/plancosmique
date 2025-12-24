import { BirthData, geocodeCity, getCarteDuCiel } from '@/lib/services/astrology.service';
import { NextRequest, NextResponse } from 'next/server';

// API route handler compatible avec Next.js App Router (route.ts)
export async function GET(req: NextRequest) {
  try {
    // Récupérer l'utilisateur authentifié (adapter selon votre auth)
    let user: any = (req as any).user || (req as any).session?.user;
    // Mapping pour supporter les champs français et anglais
    const birthDate = new Date(user.birthDate || user.dateNaissance);
    const birthTime = user.birthTime || user.heureNaissance;
    const birthPlace = user.birthPlace || user.villeNaissance;
    const birthCountry = user.birthCountry || user.paysNaissance || user.country;
    const name = user.name || user.nom || user.username || 'Utilisateur';
    const prenoms = user.prenoms;
    let coordinates = user.birthCoordinates;
    if (!birthDate || !birthTime || !birthPlace) {
      return NextResponse.json({
        message: 'Données de naissance incomplètes. Veuillez compléter votre profil.'
      }, { status: 400 });
    }
    const [hour, minute] = birthTime.split(':').map(Number);
    if (!coordinates) {
      coordinates = await geocodeCity(birthPlace, birthCountry);
    }
    const birthData: BirthData = {
      name,
      year: birthDate.getFullYear(),
      month: birthDate.getMonth() + 1,
      day: birthDate.getDate(),
      hour,
      minute,
      city: birthPlace,
      lat: coordinates.lat,
      lng: coordinates.lng
    };
    const carteDuCiel = await getCarteDuCiel(birthData);
    return NextResponse.json(carteDuCiel, { status: 200 });
  } catch (error: any) {
    console.error('[API /sky-chart] ❌', error);
    return NextResponse.json({
      message: error.message || 'Erreur lors du calcul de la carte du ciel'
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Essayer de lire les données de naissance depuis le body JSON
    const body = await req.json();
    let user: any = body;
    // Mapping pour supporter les champs français et anglais
    const birthDate = new Date(user.birthDate || user.dateNaissance);
    const birthTime = user.birthTime || user.heureNaissance;
    const birthPlace = user.birthPlace || user.villeNaissance;
    const birthCountry = user.birthCountry || user.paysNaissance || user.country;
    const name = user.name || user.nom || user.username || 'Utilisateur';
    const prenoms = user.prenoms;
    let coordinates = user.birthCoordinates;
    if (!birthDate || !birthTime || !birthPlace) {
      return NextResponse.json({
        message: 'Données de naissance incomplètes. Veuillez compléter votre profil.'
      }, { status: 400 });
    }
    const [hour, minute] = birthTime.split(':').map(Number);
    if (!coordinates) {
      coordinates = await geocodeCity(birthPlace, birthCountry);
    }
    const birthData: BirthData = {
      name,
      year: birthDate.getFullYear(),
      month: birthDate.getMonth() + 1,
      day: birthDate.getDate(),
      hour,
      minute,
      city: birthPlace,
      lat: coordinates.lat,
      lng: coordinates.lng
    };
    const carteDuCiel = await getCarteDuCiel(birthData);
    return NextResponse.json(carteDuCiel, { status: 200 });
  } catch (error: any) {
    console.error('[API /sky-chart] ❌', error);
    return NextResponse.json({
      message: error.message || 'Erreur lors du calcul de la carte du ciel'
    }, { status: 500 });
  }
}
