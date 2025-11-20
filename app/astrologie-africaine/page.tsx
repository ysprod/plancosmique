'use client';
import CategoryLayout from '@/components/CategoryLayout';
import { Palmtree, Globe, Users, Mountain, Pyramid } from 'lucide-react';

const services = [
  { icon: Globe, title: "Signe Astrologique Africain", description: "Votre signe selon la tradition africaine", href: "/signe-africain" },
  { icon: Users, title: "Compatibilités Africaines", description: "Affinités énergétiques ancestrales", href: "/compatibilites-africaines" },
  { icon: Mountain, title: "Guidance Ancestrale", description: "Sagesse des anciens et des ancêtres", href: "/guidance-ancestrale" },
  { icon: Pyramid, title: "Ma Divinité Égyptienne", description: "La divinité qui vous guide", href: "/divinite-egyptienne" }
];

export default function AstrologieAfricainePage() {
  return (
    <CategoryLayout
      title="ASTROLOGIE AFRICAINE"
      description="Découvrez la sagesse ancestrale et les traditions astrologiques africaines millénaires"
      icon={Palmtree}
      color="from-orange-600 via-red-600 to-amber-700"
      lightColor="from-orange-400 to-amber-400"
      services={services}
    />
  );
}
