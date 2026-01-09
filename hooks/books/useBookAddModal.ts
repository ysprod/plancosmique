import { useState } from 'react';
import { BookFormData } from '@/hooks/books/useAdminBooks';

export function useBookAddModal(initialFormData: BookFormData) {
  const [show, setShow] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Partial<BookFormData>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleNextStep = () => setCurrentStep(2);
  const handlePrevStep = () => setCurrentStep(1);

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitting(false);
  };

  return {
    show,
    setShow,
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    submitting,
    setSubmitting,
    handleNextStep,
    handlePrevStep,
    handleAddBook
  };
}
