import { Award, Target, Compass, Drama, Heart } from 'lucide-react';

export interface SacredNumber {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  introduction: string;
  howToCalculate: string;
  meaningByNumber: { [key: number]: string };
  keyInsights: string[];
  practicalApplication: string;
  affirmation: string;
}

export function useSacredNumbers() {
  const sacredNumbers: SacredNumber[] = [
    // ...existing code from sacredNumbers array in page.tsx...
  ];
  return { sacredNumbers };
}
