import { ReactNode } from 'react';

export interface PersonalLifeAspect {
  id: string;
  title: string;
  icon: ReactNode;
  description: string;
  introduction: string;
  keyInsights: string[];
  deepAnalysis: string;
  whatYouLearn: string[];
  transformation: string;
  practicalExercise: string[];
  affirmation: string;
}
