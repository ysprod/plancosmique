import { useVoyanceForm } from '@/hooks/voyance/useVoyanceForm';
import { useVoyancePrediction } from '@/hooks/voyance/useVoyancePrediction';
import { predictions } from '@/components/voyance/voyanceData';

export function useVoyancePage() {
  const {
    selectedCategory,
    setSelectedCategory,
    name,
    setName,
    birthDate,
    setBirthDate,
    question,
    setQuestion,
    isRevealing,
    setIsRevealing,
    prediction,
    setPrediction,
    resetForm
  } = useVoyanceForm();

  const handleReveal = useVoyancePrediction(predictions, setPrediction, setIsRevealing);
  const handleReset = resetForm;

  return {
    selectedCategory,
    setSelectedCategory,
    name,
    setName,
    birthDate,
    setBirthDate,
    question,
    setQuestion,
    isRevealing,
    setIsRevealing,
    prediction,
    setPrediction,
    handleReveal,
    handleReset
  };
}
