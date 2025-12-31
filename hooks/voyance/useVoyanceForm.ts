import { useState } from 'react';

export function useVoyanceForm() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [question, setQuestion] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);

  const resetForm = () => {
    setSelectedCategory(null);
    setName('');
    setBirthDate('');
    setQuestion('');
    setPrediction(null);
  };

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
    resetForm
  };
}
