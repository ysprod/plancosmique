'use client';
import CategoryLayout from '@/components/CategoryLayout';
import { Flame, BookOpen, Shield, CircleDollarSign, Feather, Sparkle } from 'lucide-react';

const services = [
  { icon: BookOpen, title: "Notions de base", description: "Fondamentaux de la spiritualité africaine", href: "/spiritualite-bases" },
  { icon: Shield, title: "Rituels de protection", description: "Protégez votre énergie et votre espace", href: "/rituels-protection" },
  { icon: CircleDollarSign, title: "Rituels d'abondance", description: "Attirez la prospérité dans votre vie", href: "/rituels-abondance" },
  { icon: Feather, title: "Invocation des ancêtres", description: "Connectez-vous à vos guides ancestraux", href: "/invocation-ancetres" },
  { icon: Sparkle, title: "Méditations guidées", description: "Méditations inspirées des traditions africaines", href: "/meditations-africaines" }
];

export default function SpiritualitePage() {
  return (
    <CategoryLayout
      title="SPIRITUALITÉ AFRICAINE"
      description="Reconnectez-vous aux pratiques spirituelles ancestrales et rituels sacrés africains"
      icon={Flame}
      color="from-amber-700 via-orange-700 to-red-700"
      lightColor="from-amber-400 to-red-400"
      services={services}
    />
  );
}
