export const ICONS = { Heart: require('lucide-react').Heart, Users: require('lucide-react').Users, Briefcase: require('lucide-react').Briefcase, Calendar: require('lucide-react').Calendar };

export const astrologySections = [
  {
    id: "vie-personnelle",
    title: "Ma Vie Personnelle",
    icon: "Heart",
    description: "Découvre ce qui t'anime profondément et comprends comment avancer avec confiance dans ton chemin de vie.",
    gradient: "from-rose-500 to-pink-600",
    color: "from-rose-600 to-pink-600",
    link: "/secured/vie-personnelle",
    stats: "Analyse complète"
  },
  {
    id: "famille-couple",
    title: "Famille, Amitié et Couple",
    icon: "Users",
    description: "Explore tes liens affectifs pour mieux aimer, mieux comprendre les autres et créer des relations plus harmonieuses.",
    gradient: "from-emerald-500 to-teal-600",
    color: "from-emerald-600 to-teal-600",
    link: "/secured/relations",
    stats: "Relations harmonieuses"
  },
  {
    id: "professionnel",
    title: "Monde Professionnel",
    icon: "Briefcase",
    description: "Identifie tes forces naturelles, ta vocation et le domaine où tu peux vraiment t'épanouir et réussir.",
    gradient: "from-blue-500 to-indigo-600",
    color: "from-blue-600 to-indigo-600",
    link: "/secured/professionnel",
    stats: "Réussite professionnelle"
  },
  {
    id: "horoscope",
    title: "Horoscope par Signe",
    icon: "Calendar",
    description: "Reçois chaque mois les influences qui t'accompagnent et les opportunités à saisir selon ton signe.",
    gradient: "from-cyan-500 to-blue-600",
    color: "from-cyan-600 to-blue-600",
    link: "/secured/horoscope",
    stats: "Mis à jour mensuellement"
  },
];
