"use client";
import ConsultationForm from "@/components/cinqetoiles/ConsultationForm";
import GenereAnalyseContent from "@/components/cinqetoiles/GenereAnalyseContent";
import { useSlide4SectionDoors } from "@/hooks/cinqetoiles/useSlide4SectionDoors";
import { PaymentProcessingProgress } from "./PaymentProcessingProgress";

export default function ProfilPageClientDoors() {
  const { form, errors, apiError, step, handleChange, handleSubmit, progress } = useSlide4SectionDoors();

  return (
    <main className="w-full mx-auto flex flex-col items-center justify-center text-center">
      {step === "form" && (
        <ConsultationForm
          form={form}
          errors={errors}
          handleChange={handleChange}
          apiError={apiError}
          handleSubmit={handleSubmit}
          step={step}
        />
      )}

      {step === "traitement" && <PaymentProcessingProgress progress={progress} />}

      {step === "gold" && <GenereAnalyseContent />}
    </main>
  );
}