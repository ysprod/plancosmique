import { Heart, Briefcase, Coins, Users } from 'lucide-react';

export const categories = [
  { id: 'amour', icon: Heart, label: 'Amour', color: 'from-pink-500 to-rose-600' },
  { id: 'carriere', icon: Briefcase, label: 'Carrière', color: 'from-blue-500 to-indigo-600' },
  { id: 'finances', icon: Coins, label: 'Finances', color: 'from-yellow-500 to-amber-600' },
  { id: 'famille', icon: Users, label: 'Famille', color: 'from-green-500 to-emerald-600' }
];

export const predictions: Record<string, string[]> = {
  amour: [
    "Les étoiles s'alignent en votre faveur. Une rencontre marquante se profile à l'horizon dans les 3 prochaines semaines.",
    "Votre âme sœur est plus proche que vous ne le pensez. Ouvrez votre cœur aux nouvelles opportunités.",
    "Une relation passée cherche à se manifester. Le cosmos vous guide vers une réconciliation ou une fermeture nécessaire.",
    "L'énergie de Vénus vous entoure. C'est le moment idéal pour raviver la flamme dans votre relation actuelle.",
    "Un voyage inattendu vous mènera vers l'amour. Restez ouvert aux signes de l'univers."
  ],
  carriere: [
    "Une opportunité professionnelle majeure se présente dans les 2 prochains mois. Saisissez-la sans hésitation.",
    "Votre travail acharné sera bientôt récompensé. Les astres indiquent une promotion ou reconnaissance imminente.",
    "Un changement de direction professionnelle est en cours. Faites confiance à votre intuition cosmique.",
    "Mercure rétrograde apporte des défis temporaires, mais ils révèlent votre vraie force et résilience.",
    "Une collaboration inattendue transformera votre trajectoire professionnelle de manière positive."
  ],
  finances: [
    "Jupiter entre dans votre maison financière. L'abondance et la prospérité sont en route.",
    "Un investissement réfléchi dans les 6 prochains mois portera ses fruits de manière inattendue.",
    "Attention aux dépenses impulsives ce mois-ci. Les astres conseillent la prudence et la réflexion.",
    "Une source de revenus supplémentaire se manifeste. Restez attentif aux opportunités cachées.",
    "Les cycles lunaires favorisent une période d'accumulation. C'est le moment de construire vos réserves."
  ],
  famille: [
    "L'harmonie familiale s'intensifie. C'est le moment idéal pour résoudre les conflits anciens.",
    "Un membre de la famille vous apporte une nouvelle joyeuse dans les semaines à venir.",
    "Les liens ancestraux se renforcent. Honorez vos racines et vos traditions familiales.",
    "Un enfant de la famille révèle un talent caché. Encouragez son développement avec amour.",
    "Les énergies cosmiques favorisent les réunions familiales. Organisez un rassemblement mémorable."
  ]
};
