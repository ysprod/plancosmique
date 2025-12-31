import { useCallback } from 'react';

export function useVoyancePrediction(predictions: Record<string, string[]>, setPrediction: (p: string) => void, setIsRevealing: (b: boolean) => void) {
  return useCallback((selectedCategory: string | null, name: string) => {
    if (!selectedCategory || !name) return;
    setIsRevealing(true);
    setTimeout(() => {
      const categoryPredictions = predictions[selectedCategory];
      const randomPrediction = categoryPredictions[Math.floor(Math.random() * categoryPredictions.length)];
      setPrediction(randomPrediction);
      setIsRevealing(false);
    }, 3000);
  }, [predictions, setPrediction, setIsRevealing]);
}
