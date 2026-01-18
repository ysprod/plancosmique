'use client';
import ConsultationForm from '@/components/cinqetoiles/ConsultationForm';

export function Slide4SectionForm({ form, errors, handleChange, apiError, handleSubmit, resetSelection }: any) {
  return (
    <ConsultationForm
      form={form}
      errors={errors}
      handleChange={handleChange}
      apiError={apiError}
      handleSubmit={handleSubmit}
      resetSelection={resetSelection}
    />
  );
}