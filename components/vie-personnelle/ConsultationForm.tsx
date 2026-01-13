"use client";
import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useConsultationForm } from "@/hooks/vie-personnelle/useConsultationForm";
import { containerVariants } from "./consultationFormVariants";
import { FormErrorMessage } from "./FormErrorMessage";
import { FormBackgroundOrbs } from "./FormBackgroundOrbs";
import { FormHeader } from "./FormHeader";
import { FormFields } from "./FormFields";
import { FormActions } from "./FormActions";

type ConsultationFormProps = {
  form: any;
  errors: Record<string, string | undefined>;
  handleChange: (e: any) => void;
  apiError?: string | null;
  handleSubmit: (e: any) => void;
  resetSelection: () => void;
};

const ConsultationForm = memo(function ConsultationForm({
  form,
  errors,
  handleChange,
  apiError,
  handleSubmit,
  resetSelection,
}: ConsultationFormProps) {
  const {
    countryOptions, onChangeField, cityApiUrl, cityApiKey, handleCitySelect,
  } = useConsultationForm(form, handleChange);

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="relative mx-auto w-full max-w-2xl px-3 py-4 sm:px-4"
    >
      <FormBackgroundOrbs />

      <div className="relative mx-auto w-full rounded-2xl border border-purple-200/50 dark:border-purple-800/30 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/20 dark:from-gray-900 dark:via-purple-950/30 dark:to-blue-950/20 p-4 sm:p-6 shadow-xl backdrop-blur-sm">
        <FormHeader />

        <AnimatePresence mode="wait">
          {apiError && <FormErrorMessage message={apiError} />}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="mx-auto mt-6 w-full max-w-xl space-y-3.5">
          <FormFields
            form={form}
            errors={errors}
            handleChange={handleChange}
            countryOptions={countryOptions}
            cityApiUrl={cityApiUrl}
            cityApiKey={cityApiKey}
            onChangeField={onChangeField}
            handleCitySelect={handleCitySelect}
          />

          <FormActions onSubmit={handleSubmit} onCancel={resetSelection} />
        </form>
      </div>
    </motion.div>
  );
});

export default ConsultationForm;