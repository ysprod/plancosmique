'use client';
import CategoryLayout from '@/components/CategoryLayout';
import { Building2, UserCheck, UsersRound, Target, Brain } from 'lucide-react';

const services = [
  { icon: UserCheck, title: "Talent & Potentiel", description: "Évaluer personnalité, forces et fragilités d'un candidat", href: "/talent-potentiel" },
  { icon: UsersRound, title: "Synergie d'Équipe", description: "Identifier affinités et tensions dans votre équipe", href: "/synergie-equipe" },
  { icon: Target, title: "Team Building Astrologique", description: "Créer des équipes productives et complémentaires", href: "/team-building" },
  { icon: Brain, title: "Astropsychologie Collective", description: "Comprendre la dynamique globale d'un service", href: "/astropsychologie" }
];

export default function ProfessionnelPage() {
  return (
    <CategoryLayout
      title="MONDE PROFESSIONNEL"
      description="Optimisez vos équipes, recrutements et dynamiques collectives grâce à l'intelligence astrologique"
      icon={Building2}
      color="from-cyan-600 via-teal-600 to-emerald-600"
      lightColor="from-cyan-400 to-emerald-400"
      services={services}
    />
  );
}
