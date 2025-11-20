'use client';
import CategoryLayout from '@/components/CategoryLayout';
import { Hash, Award, Target, Compass, Drama, Heart } from 'lucide-react';

const services = [
  { icon: Award, title: "Nombre de naissance", description: "Personnalité, talents et défis de vie", href: "/nombre-naissance" },
  { icon: Target, title: "Nombre d'expression", description: "Aspirations et potentialités", href: "/nombre-expression" },
  { icon: Compass, title: "Nombre de chemin de vie", description: "Parcours, défis et opportunités", href: "/chemin-vie-numero" },
  { icon: Drama, title: "Nombre de personnalité", description: "Traits de caractère et comportements", href: "/nombre-personnalite" },
  { icon: Heart, title: "Nombre de l'âme", description: "Désirs et aspirations profondes", href: "/nombre-ame" }
];

export default function NumerologiePage() {
  return (
    <CategoryLayout
      title="NUMÉROLOGIE"
      description="Découvrez les secrets cachés dans vos nombres personnels et leur influence sur votre destinée"
      icon={Hash}
      color="from-indigo-600 via-blue-600 to-cyan-600"
      lightColor="from-indigo-400 to-cyan-400"
      services={services}
    />
  );
}
