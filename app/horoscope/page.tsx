'use client';
import CategoryLayout from '@/components/CategoryLayout';
import { Star, Sun, Calendar, Heart } from 'lucide-react';

const services = [
  { icon: Sun, title: "Horoscope du jour", description: "Vos prévisions quotidiennes personnalisées", href: "/horoscope-jour" },
  { icon: Calendar, title: "Horoscope mensuel", description: "Les grandes tendances du mois", href: "/horoscope-mensuel" },
  { icon: Star, title: "Horoscope annuel", description: "Votre année astrologique complète", href: "/horoscope-annuel" },
  { icon: Heart, title: "Horoscope amoureux", description: "L'amour selon votre signe", href: "/horoscope-amour" }
];

export default function HoroscopePage() {
  return (
    <CategoryLayout
      title="HOROSCOPE PAR SIGNE"
      description="Découvrez les prédictions et influences astrales pour votre signe du zodiaque"
      icon={Star}
      color="from-yellow-600 via-amber-600 to-orange-600"
      lightColor="from-yellow-400 to-orange-400"
      services={services}
    />
  );
}
