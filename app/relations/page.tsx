'use client';
import CategoryLayout from '@/components/CategoryLayout';
import { Heart, Users, Link2, Baby, TrendingUp } from 'lucide-react';

const services = [
  { icon: Users, title: "Affinités & Compatibilités", description: "La vérité énergétique de vos relations", href: "/compatibilites" },
  { icon: Heart, title: "Synastrie de Couple", description: "Lecture profonde de vos thèmes croisés", href: "/synastrie" },
  { icon: Link2, title: "Relations Karmiques", description: "Âme sœur, flamme jumelle ou contrat karmique", href: "/relations-karmiques" },
  { icon: Baby, title: "Thème Astral de l'Enfant", description: "Son âme, ses talents et sa mission de vie", href: "/theme-enfant" },
  { icon: TrendingUp, title: "Chemin Amoureux", description: "Évolution du couple et périodes clés", href: "/chemin-amoureux" }
];

export default function RelationsPage() {
  return (
    <CategoryLayout
      title="FAMILLE, AMITIÉ ET COUPLE"
      description="Comprenez la vérité énergétique de vos relations et harmonisez vos liens affectifs"
      icon={Heart}
      color="from-rose-600 via-pink-600 to-red-600"
      lightColor="from-rose-400 to-red-400"
      services={services}
    />
  );
}
