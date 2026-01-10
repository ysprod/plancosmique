import { formatDate } from '@/lib/functions';
import { ProcessedUserData } from '@/lib/types/carteduciel';
import { User } from '../interfaces';

export function processUserData(userData: User | null): ProcessedUserData | null {
  if (!userData) return null;

  return {
    prenoms: userData.prenoms || userData.username || "",
    nom: userData.nom || "",
    email: userData.email,
    phone: userData.phone || "",
    dateNaissance: formatDate(userData.dateNaissance!),
    lieuNaissance: userData.villeNaissance
      ? `${userData.villeNaissance}, ${userData.paysNaissance || userData.country}`
      : userData.country || "-",
    heureNaissance: userData.heureNaissance || "-",
    country: userData.country!,
    role: userData.role ? userData.role.toString() : "",
    premium: !!userData.premium,
    credits: userData.credits ?? 0,
    totalConsultations: userData.totalConsultations ?? 0,
    rating: userData.rating ?? 0,
    emailVerified: !!userData.emailVerified,
    carteDuCiel: userData.carteDuCiel
  };
}