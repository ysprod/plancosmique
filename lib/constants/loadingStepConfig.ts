import { GenerationStep } from "@/lib/interfaces";

export const STEP_CONFIG: Record<GenerationStep, { message: string; color: string }> = {
  loading: { message: "Initialisation...", color: "purple" },
  fetching: { message: "Chargement de l'analyse...", color: "blue" },
  success: { message: "Analyse complète !", color: "green" },
  error: { message: "Une erreur est survenue", color: "red" },
};

export function getStepConfig(step: GenerationStep) {
  return STEP_CONFIG[step];
}
