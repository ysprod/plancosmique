// constants/books.constants.ts
export interface Book {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  author: string;
  price: number;
  pages: number;
  language: string;
  category: string;
  coverImage: string;
  pdfUrl?: string; // URL après achat
  preview?: string; // Extrait gratuit
  gradient: string;
  features: string[];
}

export const BOOKS: Book[] = [
  {
    id: "mission-de-vie",
    title: "Découvre Ta Mission de Vie",
    subtitle: "Guide Pratique de Réalisation de Soi",
    description: "Un voyage initiatique pour comprendre pourquoi tu es venu(e) sur Terre et comment accomplir ta destinée unique. Ce livre combine sagesse africaine ancestrale et astrologie moderne.",
    author: "Mon Étoile",
    price: 15000,
    pages: 180,
    language: "Français",
    category: "Spiritualité",
    coverImage: "/books/mission-de-vie.jpg",
    preview: "/books/previews/mission-de-vie-preview.pdf",
    gradient: "from-violet-500 to-purple-600",
    features: [
      "12 chapitres de transformation",
      "Exercices pratiques inclus",
      "Méthodes d'introspection guidée",
      "Rituels de connexion ancestrale"
    ]
  },
  {
    id: "astrologie-africaine",
    title: "Astrologie Africaine Traditionnelle",
    subtitle: "Les Secrets des Anciens Sages",
    description: "Plonge dans les mystères de l'astrologie africaine, système millénaire de lecture des étoiles transmis par les griots et les maîtres spirituels.",
    author: "Mon Étoile",
    price: 18000,
    pages: 240,
    language: "Français",
    category: "Astrologie",
    coverImage: "/books/astrologie-africaine.jpg",
    preview: "/books/previews/astrologie-africaine-preview.pdf",
    gradient: "from-amber-500 to-orange-600",
    features: [
      "Système zodiacal africain",
      "Interprétation des signes cosmiques",
      "Calendrier lunaire africain",
      "Prédictions et rituels"
    ]
  },
  {
    id: "numerologie-sacree",
    title: "Numérologie Sacrée",
    subtitle: "Le Pouvoir Caché des Nombres",
    description: "Découvre comment les nombres régissent ta vie, révèlent ton chemin de destinée et t'aident à prendre les bonnes décisions au bon moment.",
    author: "Mon Étoile",
    price: 12000,
    pages: 150,
    language: "Français",
    category: "Numérologie",
    coverImage: "/books/numerologie-sacree.jpg",
    preview: "/books/previews/numerologie-sacree-preview.pdf",
    gradient: "from-blue-500 to-indigo-600",
    features: [
      "Calcul du chemin de vie",
      "Nombres maîtres expliqués",
      "Cycles personnels annuels",
      "Compatibilité numérologique"
    ]
  },
  {
    id: "rituel-invocation",
    title: "Rituels & Invocations Puissantes",
    subtitle: "Manuel Pratique de Magie Spirituelle",
    description: "Un guide complet des rituels ancestraux pour attirer l'amour, la prospérité, la protection et la guérison. Protocoles détaillés et ingrédients sacrés.",
    author: "Mon Étoile",
    price: 20000,
    pages: 200,
    language: "Français",
    category: "Rituels",
    coverImage: "/books/rituel-invocation.jpg",
    preview: "/books/previews/rituel-invocation-preview.pdf",
    gradient: "from-rose-500 to-pink-600",
    features: [
      "50+ rituels détaillés",
      "Invocations en langues ancestrales",
      "Calendrier des jours propices",
      "Précautions et purifications"
    ]
  },
  {
    id: "ancestres-protection",
    title: "Se Connecter à Ses Ancêtres",
    subtitle: "La Force Invisible Qui Te Guide",
    description: "Apprends à honorer tes ancêtres, à recevoir leurs messages et à bénéficier de leur protection au quotidien.",
    author: "Mon Étoile",
    price: 10000,
    pages: 120,
    language: "Français",
    category: "Spiritualité",
    coverImage: "/books/ancestres-protection.jpg",
    preview: "/books/previews/ancestres-protection-preview.pdf",
    gradient: "from-green-500 to-emerald-600",
    features: [
      "Autels ancestraux à créer",
      "Prières et offrandes",
      "Interpréter les rêves",
      "Signes de présence ancestrale"
    ]
  },
  {
    id: "compatibilite-amoureuse",
    title: "Compatibilité Amoureuse par les Astres",
    subtitle: "Trouver l'Âme Sœur selon Ton Thème",
    description: "Un guide complet pour comprendre tes relations amoureuses à travers l'astrologie et trouver le partenaire idéal.",
    author: "Mon Étoile",
    price: 14000,
    pages: 160,
    language: "Français",
    category: "Amour",
    coverImage: "/books/compatibilite-amoureuse.jpg",
    preview: "/books/previews/compatibilite-amoureuse-preview.pdf",
    gradient: "from-pink-500 to-rose-600",
    features: [
      "Synastrie amoureuse détaillée",
      "Compatibilité par signes",
      "Périodes favorables",
      "Rituels d'attraction amoureuse"
    ]
  },
];

export const BOOK_CATEGORIES = [
  "Tous",
  "Spiritualité",
  "Astrologie",
  "Numérologie",
  "Rituels",
  "Amour"
];
