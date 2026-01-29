"use client";
import InputField from "@/components/vie-personnelle/InputField";
import { birthCountries } from "@/lib/birthCountries";
import { cx } from "@/lib/functions";
import { Phone, X } from "lucide-react";
import React, { memo, useCallback, useMemo } from "react";
import RegisterInputField from "../auth/RegisterInputField";
import RegisterSelectField from "../auth/RegisterSelectField";
import { GENDER_OPTIONS } from "../vie-personnelle/FormFields";
import ApiErrorCard from "./form/ApiErrorCard";
import HintCard from "./form/HintCard";
import SectionTitle from "./form/SectionTitle";

interface Props {
  form: any;
  errors: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  apiError: string | null;
  handleSubmit: (e: React.FormEvent) => void;
  step: string;
}

const RUBRIQUE_COUNTRY_OPTIONS = birthCountries.map((country) => ({ label: country, value: country }));

function ConsultationFormImpl({ form, errors, handleChange, apiError, handleSubmit, step }: Props) {
  const isProcessing = step === "traitement";
  const disabled = step !== "form";

  const handleReset = useCallback(() => {
    if (typeof window !== "undefined") window.history.back();
  }, []);

  const countryOptions = useMemo(() => RUBRIQUE_COUNTRY_OPTIONS, []);

  const submitClass = useMemo(
    () =>
      cx(
        "w-full rounded-2xl px-4 py-3.5",
        "text-[13px] sm:text-[14px] font-semibold",
        "text-white",
        "bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500",
        "shadow-lg shadow-fuchsia-500/20",
        "transition",
        disabled ? "opacity-60 cursor-not-allowed" : "hover:opacity-[0.97] active:scale-[0.99]"
      ),
    [disabled]
  );

  const cancelClass = useMemo(
    () =>
      cx(
        "w-full rounded-2xl px-4 py-3",
        "text-[13px] font-semibold",
        "border border-black/10 dark:border-white/10",
        "bg-white/70 dark:bg-white/5",
        "text-slate-800 dark:text-slate-200",
        "hover:bg-white dark:hover:bg-white/10 transition"
      ),
    []
  );

  return (
    <section
      className={cx(
        "w-full max-w-md sm:max-w-xl",
        "rounded-3xl",
        "border border-black/10 dark:border-white/10",
        "bg-white/75 dark:bg-slate-950/55",
        "backdrop-blur-xl",
        "shadow-[0_18px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.35)]",
        "px-4 py-5 sm:px-6 sm:py-6"
      )}
    >
      <SectionTitle title="Informations requises" />

      <div className="mt-4 flex flex-col items-center justify-center gap-3">
        <HintCard />

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center gap-4">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              label="Nom"
              name="nom"
              value={form.nom}
              onChange={handleChange}
              error={errors.nom}
              placeholder="Votre nom de famille"
            />
            <InputField
              label="Prénoms"
              name="prenoms"
              value={form.prenoms}
              onChange={handleChange}
              error={errors.prenoms}
              placeholder="Tous vos prénoms"
            />
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              label="Date de naissance"
              name="dateNaissance"
              type="date"
              value={form.dateNaissance}
              onChange={handleChange}
              error={errors.dateNaissance}
            />
            <InputField
              label="Heure de naissance"
              name="heureNaissance"
              type="time"
              value={form.heureNaissance}
              onChange={handleChange}
              error={errors.heureNaissance}
            />
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            <RegisterSelectField
              label="Genre"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              error={errors.gender}
              options={GENDER_OPTIONS}
            />
            <RegisterSelectField
              label="Pays de naissance"
              name="country"
              value={form.country}
              onChange={handleChange}
              error={errors.country}
              options={countryOptions}
            />
          </div>

          <div className="w-full">
            <InputField
              label="Ville de naissance"
              name="villeNaissance"
              value={form.villeNaissance}
              onChange={handleChange}
              error={errors.villeNaissance}
              placeholder="Ex: Abidjan, Paris…"
            />
          </div>

          <div className="w-full">
            <RegisterInputField
              label="Numéro de téléphone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="XXXXXXXXXX"
              icon={<Phone className="w-4 h-4" />}
            />
          </div>

          <div>
            {apiError ? <ApiErrorCard apiError={apiError} /> : null}
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-2 pt-1">
            <button
              type="submit"
              disabled={disabled}
              aria-busy={isProcessing}
              className={submitClass}
            >
              {isProcessing ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <span className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Traitement…
                </span>
              ) : (
                "Valider et continuer"
              )}
            </button>

            <button type="button" onClick={handleReset} className={cancelClass}>
              <span className="inline-flex items-center justify-center gap-2">
                <X className="h-4 w-4" />
                Annuler
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

const ConsultationForm = memo(ConsultationFormImpl);

export default ConsultationForm;