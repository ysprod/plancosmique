'use client';
import CategoryLayout from '@/components/CategoryLayout';
import { 
  Briefcase, 
  FileText, 
  Target, 
  Lightbulb, 
  Shield, 
  Heart, 
  DollarSign, 
  Gem, 
  Calendar, 
  Sparkle 
} from 'lucide-react';

const services = [
  { icon: FileText, title: "Mon Thème astral complet", description: "Carte du ciel et analyse complète", href: "/theme-astral" },
  { icon: Target, title: "Ma mission de vie", description: "Ce pour quoi vous êtes venu(e) sur Terre", href: "/mission-vie" },
  { icon: Briefcase, title: "Ma vocation professionnelle", description: "Le métier qui vous fait vibrer", href: "/vocation" },
  { icon: Lightbulb, title: "Mes talents naturels", description: "Ces dons souvent cachés ou oubliés", href: "/talents" },
  { icon: Shield, title: "Mes blessures karmiques", description: "Ce que votre âme est venue guérir", href: "/blessures-karmiques" },
  { icon: Heart, title: "Ma manière d'aimer", description: "Comment j'aime et je suis aimé(e)", href: "/maniere-aimer" },
  { icon: DollarSign, title: "Mon rapport à l'argent", description: "Argent, travail et succès", href: "/rapport-argent" },
  { icon: Gem, title: "Ma stabilité émotionnelle", description: "Équilibre intérieur et émotionnel", href: "/stabilite" },
  { icon: Calendar, title: "Les grands cycles", description: "Les périodes clés de transformation", href: "/cycles-vie" },
  { icon: Sparkle, title: "Lien avec l'invisible", description: "Monde spirituel, rêves et intuition", href: "/spirituel" }
];

export default function ViePersonnellePage() {
  return (
    <CategoryLayout
      title="MA VIE PERSONNELLE"
      description="Explorez votre essence profonde, vos talents cachés et votre véritable destinée"
      icon={Briefcase}
      color="from-violet-600 via-purple-600 to-fuchsia-600"
      lightColor="from-violet-400 to-fuchsia-400"
      services={services}
    />
  );
}
