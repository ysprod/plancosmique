'use client';
import { Rubrique } from "@/lib/interfaces";
import Slide4SectionMain from "./Slide4SectionMain";
import { useSlide4Section } from "./useSlide4Section";

interface Slide4SectionProps {
  rubrique: Rubrique;
}

export default function Slide4Section({ rubrique }: Slide4SectionProps) {
  const section = useSlide4Section(rubrique);
  return <Slide4SectionMain {...section} />;
}