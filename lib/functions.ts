import { CarteDuCielData, CinqPortes, ProcessedUserData, Rubrique, User } from "./interfaces";

export const formatDate = (date: string | Date | undefined | null) => {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (!d || isNaN((d as Date).getTime?.() ?? NaN)) return '';
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

export function mapFormDataToBackend(form: User | null): Record<string, any> {
  if (!form) {
    console.warn('mapFormDataToBackend: form is null or undefined');
    return {};
  }

  const dateOfBirth = form.dateNaissance
    ? new Date(form.dateNaissance).toISOString()
    : (form.dateOfBirth ? new Date(form.dateOfBirth).toISOString() : '');
  const result = {
    firstName: form.prenoms || '',
    lastName: form.nom || '',
    dateOfBirth: typeof dateOfBirth === 'string' ? dateOfBirth : '',
    timeOfBirth: form.heureNaissance || '',
    countryOfBirth: form.paysNaissance || '',
    cityOfBirth: form.villeNaissance || '',
    ...form
  };
  return result;
}

export function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

export function rubriqueLabel(r: any): string {
  return String(r?.titre ?? r?.nom ?? "Rubrique");
}

export function getRubriqueId(r: Rubrique): string | null {
  return r?._id || null;
}

const SIGNES_OPPOSES: Record<string, string> = {
  'Bélier': 'Balance',
  'Taureau': 'Scorpion',
  'Gémeaux': 'Sagittaire',
  'Cancer': 'Capricorne',
  'Lion': 'Verseau',
  'Vierge': 'Poissons',
  'Balance': 'Bélier',
  'Scorpion': 'Taureau',
  'Sagittaire': 'Gémeaux',
  'Capricorne': 'Cancer',
  'Verseau': 'Lion',
  'Poissons': 'Vierge'
};

export function extractCinqPortes(carteDuCiel: CarteDuCielData | null): CinqPortes | null {
  if (!carteDuCiel?.positions || carteDuCiel.positions.length === 0) {
    console.warn('[extractCinqPortes] Données carteDuCiel invalides');
    return null;
  }

  const { positions } = carteDuCiel;

  // 1. Signe Solaire - Position du Soleil
  const soleil = positions.find(p => typeof p.planete === 'string' && p.planete.toLowerCase() === 'soleil');
  const signeSolaire = soleil?.signe || 'Non défini';

  // 2. Ascendant - Signe à la Maison 1
  const maison1 = positions.find(p => p.maison === 1);
  const ascendant = maison1?.signe || 'Non défini';

  // 3. Signe Lunaire - Position de la Lune
  const lune = positions.find(p => typeof p.planete === 'string' && p.planete.toLowerCase() === 'lune');
  const signeLunaire = lune?.signe || 'Non défini';

  // 4. Milieu du Ciel - Signe à la Maison 10
  const maison10 = positions.find(p => p.maison === 10);
  const milieuDuCiel = maison10?.signe || 'Non défini';

  // 5. Descendant - Opposé à l'Ascendant (ou Maison 7)
  const maison7 = positions.find(p => p.maison === 7);
  const descendant = maison7?.signe || SIGNES_OPPOSES[ascendant] || 'Non défini';

  return {
    signesolaire: {
      label: 'Signe Solaire',
      valeur: signeSolaire,
      description: 'Votre essence profonde et votre identité fondamentale',
      icon: '☀️',
      gradient: 'from-yellow-400 via-orange-500 to-red-500'
    },
    ascendant: {
      label: 'Ascendant',
      valeur: ascendant,
      description: 'Votre masque social et votre apparence extérieure',
      icon: '🌅',
      gradient: 'from-blue-400 via-indigo-500 to-purple-500'
    },
    signeLunaire: {
      label: 'Signe Lunaire',
      valeur: signeLunaire,
      description: 'Votre monde émotionnel et vos besoins profonds',
      icon: '🌙',
      gradient: 'from-purple-400 via-pink-500 to-rose-500'
    },
    milieuDuCiel: {
      label: 'Milieu du Ciel',
      valeur: milieuDuCiel,
      description: 'Votre vocation et votre direction de vie professionnelle',
      icon: '⭐',
      gradient: 'from-cyan-400 via-teal-500 to-emerald-500'
    },
    descendant: {
      label: 'Descendant',
      valeur: descendant,
      description: 'Votre relation à l\'autre et vos partenariats',
      icon: '💫',
      gradient: 'from-pink-400 via-fuchsia-500 to-purple-600'
    }
  };
}



export function processUserData(userData: User | null): User | null {
  if (!userData) return null;

  return {
    _id: userData._id,
   
    dateNaissance: userData.dateNaissance ,
    villeNaissance: userData.villeNaissance
      ? `${userData.villeNaissance}, ${userData.paysNaissance || userData.country}`
      : userData.country || "-",
    heureNaissance: userData.heureNaissance || "-",
    
    role: userData.role,
    premium: !!userData.premium,
    credits: userData.credits ?? 0,
    totalConsultations: userData.totalConsultations ?? 0,
    rating: userData.rating ?? 0,
    emailVerified: !!userData.emailVerified,
    carteDuCiel: userData.carteDuCiel,
    ...userData
  };
}

export function cleanText(s: any) {
  return String(s ?? "").replace(/\s+/g, " ").trim();
}

export function clamp(s: string, max = 140) {
  const t = cleanText(s);
  return t.length > max ? t.slice(0, max - 1) + "…" : t;
}

export function getId(x: any): string {
  return String(x?._id ?? x?.id ?? "");
}

export function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function clampText(s: string, max = 120) {
  if (!s) return "";
  const x = typeof s === "string" ? s.replace(/\s+/g, " ").trim() : "";
  return x.length > max ? x.slice(0, max - 1) + "…" : x;
}

export function getStableRubriqueId(r: Rubrique): string {
  const anyRub: any = r as any;
  const raw = String(anyRub?._id ?? "");
  if (raw) return raw;

  const t = String(anyRub?.titre ?? "");
  const d = String(anyRub?.description ?? "");
  const h = hashString(`${t}|${d}`);
  return `rub_${h.toString(16)}`; // stable
}


export const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};


export function safeText(v: any) {
  return (typeof v === "string" ? v.trim() : "") || "";
}

export function formatDateFR(dateStr?: string | null) {
  const s = safeText(dateStr);
  if (!s) return "";
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s;
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" }).format(d);
}