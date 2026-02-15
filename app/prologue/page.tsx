import PrologueOffoland from '@/components/accueil/PrologueOffoland';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prologue Réfléchi — Comment rendre le Coupé-Décalé éternel ? | Offoland',
  description: 'Découvrez la stratégie cosmique d\'Offoland pour rendre le Coupé-Décalé éternel. Un voyage à travers les dimensions du rythme, de la mémoire et de la création.',
  openGraph: {
    title: 'Prologue Réfléchi — Offoland',
    description: 'La stratégie cosmique pour l\'éternité du Coupé-Décalé',
    type: 'website',
  },
};

export default function ProloguePage() {
  return <PrologueOffoland />;
}
