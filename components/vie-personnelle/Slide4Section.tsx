'use client';
import { memo } from 'react';
import { Rubrique } from "@/lib/interfaces";
import Slide4SectionMain from "./Slide4SectionMain";
import { useSlide4Section } from "./useSlide4Section";

interface Slide4SectionProps {
  rubrique: Rubrique;
}
 
const Slide4Section = memo<Slide4SectionProps>(function Slide4Section({ rubrique }) {
  const section = useSlide4Section(rubrique);
  return <Slide4SectionMain {...section} />;
});

export default Slide4Section;