import { Compass, Stars } from "lucide-react";
import { HighlightCardType } from "@/components/profil/ProfilHighlightCards";

export const useProfilHighlightCards = () => [
  {
    id: "carte-du-ciel",
    title: "MA CARTE DU CIEL",
    subtitle: "Positions Planétaires",
    icon: Compass,
    color: "from-blue-600 to-cyan-600",
    gradient: "from-blue-500/10 to-cyan-500/10",
    link: "/star/carteduciel",
    badge: "Exclusif"
  },
  {
    id: "cinq-portes",
    title: "MES 5 PORTES",
    subtitle: "Forces de Mon Étoile",
    icon: Stars,
    color: "from-purple-600 to-pink-600",
    gradient: "from-purple-500/10 to-pink-500/10",
    link: "/star/cinqportes",
    badge: "Premium"
  }
] as HighlightCardType[];
