"use client";
import { AnimatedGradientBackground } from "@/components/admin/offrandes/AnimatedGradientBackground";
import { useOfferingForm } from "@/hooks/admin/offrandes/useOfferingForm";
import { OfferingForm } from "@/components/admin/offrandes/OfferingForm";

export default function OffrandeCreatePageClient() {
  const {
    formData,
    saving,
    error,
    priceUSD,
    handleChange,
    handleCategoryChange,
    handleSubmit,
    handleCancel,
  } = useOfferingForm();

  return (
    <AnimatedGradientBackground>
      <div className="min-h-screen flex items-center justify-center relative z-10 animate-fade-in">
        <OfferingForm
          formData={formData}
          error={error}
          saving={saving}
          priceUSD={priceUSD}
          onChange={handleChange}
          onCategoryChange={handleCategoryChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </AnimatedGradientBackground>
  );
}
