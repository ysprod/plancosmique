"use client";


import { AnimatedGradientBackground } from "@/components/admin/offrandes/AnimatedGradientBackground";

export default function OffrandeCreatePage() {
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
