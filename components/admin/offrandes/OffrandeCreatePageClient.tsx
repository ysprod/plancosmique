"use client";
import { OfferingForm } from "@/components/admin/offrandes/OfferingForm";
import { useOfferingForm } from "@/hooks/admin/offrandes/useOfferingForm";

export default function OffrandeCreatePageClient() {
  const {
    formData, saving, error, priceUSD,
    handleChange, handleCategoryChange, handleSubmit, handleCancel,
  } = useOfferingForm();

  return (
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
  );
}