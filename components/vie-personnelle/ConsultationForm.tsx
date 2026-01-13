"use client";
import React, { useCallback, useMemo } from "react";
import InputField from "@/components/vie-personnelle/InputField";
import { birthCountries } from "@/lib/birthCountries";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Sparkles } from "lucide-react";
import RegisterSelectField from "../auth/RegisterSelectField";
import { CitySelectField } from "@/components/vie-personnelle/CitySelectField";

export const GENDER_OPTIONS = [
  { value: "", label: "Sélectionner" },
  { value: "Homme", label: "Homme" },
  { value: "Femme", label: "Femme" },
] as const;

const containerVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.18 } },
};

const alertVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.14 } },
  exit: { opacity: 0, y: 6, transition: { duration: 0.12 } },
};

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <motion.div
    variants={alertVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="mx-auto mt-3 w-full max-w-xl rounded-2xl border border-rose-200 bg-rose-50 p-3 text-left text-sm text-rose-800 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-200"
    role="alert"
    aria-live="polite"
  >
    <div className="flex items-start gap-2">
      <AlertCircle className="mt-0.5 h-4 w-4" />
      <p className="leading-snug">{message}</p>
    </div>
  </motion.div>
);

type ConsultationFormProps = {
  form: any;
  errors: Record<string, string | undefined>;
  handleChange: (e: any) => void;
  apiError?: string | null;
  handleSubmit: (e: any) => void;
  resetSelection: () => void;
};

export default function ConsultationForm({
  form,
  errors,
  handleChange,
  apiError,
  handleSubmit,
  resetSelection,
}: ConsultationFormProps) {
  const countryOptions = useMemo(() => ["", ...birthCountries], []);

  const onChangeField = useCallback(
    (name: string, value: string) => {
      // On réutilise TON handleChange (sans casser l’API)
      handleChange({ target: { name, value } });
    },
    [handleChange]
  );

  const cityApiUrl = process.env.NEXT_PUBLIC_CITY_API_URL || ""; // configurable
  const cityApiKey = process.env.NEXT_PUBLIC_CITY_API_KEY || ""; // optionnel

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="mx-auto w-full max-w-2xl px-3 py-4 sm:px-4"
    >
      {/* Card centrée */}
      <div className="mx-auto w-full rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
        <div className="mx-auto mb-4 flex max-w-xl flex-col items-center justify-center text-center">
          <div className="mb-2 inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900">
            <Sparkles className="h-5 w-5 text-violet-600 dark:text-violet-300" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Informations de naissance
          </h2>
          <p className="mt-1 max-w-md text-sm text-slate-600 dark:text-zinc-300">
            Remplis les champs ci‑dessous. L’expérience est optimisée mobile (rapide, compacte, fluide).
          </p>
        </div>

        {/* API error */}
        <AnimatePresence>{apiError ? <ErrorMessage message={apiError} /> : null}</AnimatePresence>

        <form onSubmit={handleSubmit} className="mx-auto mt-4 w-full max-w-xl space-y-3">
          <div className="grid grid-cols-1 gap-3">
            <InputField
              label="Nom"
              value={form.nom || ""}
              onChange={handleChange}
              placeholder="Votre nom"
              error={errors?.nom}
              name="nom"
            />

            <InputField
              label="Prénoms"
              value={form.prenoms || ""}
              onChange={handleChange}
              placeholder="Vos prénoms"
              error={errors?.prenoms}
              name="prenoms"
            />

            <RegisterSelectField
              label="Genre"
              name="genre"
              value={form.genre || ""}
              onChange={handleChange}
              options={Array.from(GENDER_OPTIONS)}
              error={errors?.genre}
            />

            <InputField
              label="Date de naissance"
              type="date"
              value={form.dateNaissance || ""}
              onChange={handleChange}
              error={errors?.dateNaissance}
              name="dateNaissance"
            />

            <RegisterSelectField
              label="Pays de naissance"
              name="paysNaissance"
              value={form.paysNaissance || ""}
              onChange={handleChange}
              options={countryOptions.map((c) => ({ value: c, label: c || "Sélectionner" }))}
              error={errors?.paysNaissance}
            />

            {/* Ville avec auto-complétion */}
            {cityApiUrl ? (
              <CitySelectField
                id="villeNaissance"
                label="Ville de naissance"
                value={form.villeNaissance || ""}
                countryValue={form.paysNaissance || ""}
                cityApiUrl={cityApiUrl}
                cityApiKey={cityApiKey || undefined}
                onChangeText={(txt) => onChangeField("villeNaissance", txt)}
                onSelectCity={(c) => {
                  // 1) On stocke villeNaissance (format backend-friendly)
                  onChangeField("villeNaissance", c.cityName);

                  // 2) Optionnel: si tu veux auto-remplir le pays à la sélection
                  // (à activer seulement si ton backend attend le pays en clair)
                  if (!form.paysNaissance && c.countryName) {
                    onChangeField("paysNaissance", c.countryName);
                  }

                  // 3) Optionnel: si tu veux conserver aussi l’ID ville côté backend
                  // onChangeField("villeNaissanceId", c.cityId ?? "");
                }}
                error={errors?.villeNaissance}
                placeholder="Ex: Abidjan"
                // fallbackCities optionnel (mode dégradé)
                fallbackCities={[
                  { name: "Abidjan", countryName: "Côte d’Ivoire" },
                  { name: "Jacqueville", countryName: "Côte d’Ivoire" },
                ]}
              />
            ) : (
              <InputField
                label="Ville de naissance"
                value={form.villeNaissance || ""}
                onChange={handleChange}
                placeholder="Ex: Abidjan"
                error={errors?.villeNaissance}
                name="villeNaissance"
              />
            )}

            <InputField
              label="Heure de naissance"
              type="time"
              value={form.heureNaissance || ""}
              onChange={handleChange}
              error={errors?.heureNaissance}
              name="heureNaissance"
            />
          </div>

          {/* Actions centrées */}
          <div className="pt-2">
            <div className="flex flex-col items-stretch justify-center gap-2 sm:flex-row">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-extrabold text-white shadow-sm
                           bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 dark:focus-visible:ring-violet-900/40 sm:w-auto"
              >
                Valider et Continuer
              </button>

              <button
                type="button"
                onClick={resetSelection}
                className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-800
                           hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300
                           dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900 sm:w-auto"
              >
                Annuler
              </button>
            </div> 
          </div>
        </form>
      </div>
    </motion.div>
  );
}
