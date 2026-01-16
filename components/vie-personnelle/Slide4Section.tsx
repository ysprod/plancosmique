'use client';
import { memo } from 'react';
import { Rubrique } from "@/lib/interfaces";
import Slide4SectionMain from "./Slide4SectionMain";
import { useSlide4Section } from "./useSlide4Section";

interface Slide4SectionProps {
  rubrique: Rubrique;
}

/**
 * Composant optimisé avec React.memo pour éviter les re-renders inutiles
 * Le composant ne sera re-rendu que si rubrique change
 */
const Slide4Section = memo<Slide4SectionProps>(function Slide4Section({ rubrique }) {
  const section = useSlide4Section(rubrique);
  return <Slide4SectionMain {...section} />;
});

export default Slide4Section;