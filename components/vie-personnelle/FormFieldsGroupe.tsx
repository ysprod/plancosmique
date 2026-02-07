"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import InputField from "@/components/vie-personnelle/InputField";
import RegisterSelectField from "../auth/RegisterSelectField";
import { CitySelectField } from "@/components/vie-personnelle/CitySelectField";
import { fieldVariants } from "./consultationFormVariants";

export const GENDER_OPTIONS = [
  { value: "", label: "Sélectionner" },
  { value: "male", label: "Homme" },
  { value: "female", label: "Femme" },
] as const;

type GenderValue = (typeof GENDER_OPTIONS)[number]["value"];

export type TierceForm = {
  id: string; // utile pour la liste, pas forcément affiché ici
  nom: string;
  prenoms: string;
  gender: GenderValue | string; // si ton backend accepte d'autres valeurs, on reste tolérant
  dateNaissance: string;
  heureNaissance: string;
  villeNaissance: string;
  paysNaissance: string;
  question: string;
};

type ChangeEvt =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLSelectElement>;

interface FormFieldsProps {
  form: TierceForm;
  errors: Record<string, string | undefined>;
  handleChange: (e: ChangeEvt) => void;

  countryOptions: string[];
  cityApiUrl: string;
  cityApiKey: string;

  onChangeField: (name: keyof TierceForm, value: string) => void;
  handleCitySelect: (c: any) => void;
}

// ✅ évite la re-création à chaque render (perf + equality props)
const FALLBACK_CITIES = [
  { name: "Abidjan", countryName: "Côte d'Ivoire" },
  { name: "Jacqueville", countryName: "Côte d'Ivoire" },
  { name: "Yamoussoukro", countryName: "Côte d'Ivoire" },
  { name: "Bouaké", countryName: "Côte d'Ivoire" },
  { name: "San Pedro", countryName: "Côte d'Ivoire" },
  { name: "Daloa", countryName: "Côte d'Ivoire" },
  { name: "Korhogo", countryName: "Côte d'Ivoire" },
  { name: "Man", countryName: "Côte d'Ivoire" },
  { name: "Gagnoa", countryName: "Côte d'Ivoire" },
  { name: "Anyama", countryName: "Côte d'Ivoire" },
  { name: "Séguéla", countryName: "Côte d'Ivoire" },
  { name: "Odienné", countryName: "Côte d'Ivoire" },
  { name: "Bondoukou", countryName: "Côte d'Ivoire" },
] as const;

export const FormFieldsGroupe = memo<FormFieldsProps>(function FormFieldsGroupe({
  form,
  errors,
  handleChange,
  countryOptions,
  cityApiUrl,
  cityApiKey,
  onChangeField,
  handleCitySelect,
}) {
  // ✅ mémo : évite de reconstruire le tableau à chaque frappe dans le form
  const countrySelectOptions = useMemo(
    () =>
      countryOptions.map((c) => ({
        value: c,
        label: c || "Sélectionner",
      })),
    [countryOptions],
  );

  const hasCityApi = Boolean(cityApiUrl);

  return (
    <div className="grid grid-cols-1 gap-3.5">
      <motion.div custom={0} variants={fieldVariants} initial="initial" animate="animate">
        <InputField
          label="Nom"
          value={form.nom || ""}
          onChange={handleChange}
          placeholder="Nom"
          error={errors?.nom}
          name="nom"
        />
      </motion.div>

      <motion.div custom={1} variants={fieldVariants} initial="initial" animate="animate">
        <InputField
          label="Prénoms"
          value={form.prenoms || ""}
          onChange={handleChange}
          placeholder="Prénoms"
          error={errors?.prenoms}
          name="prenoms"
        />
      </motion.div>

      <motion.div custom={2} variants={fieldVariants} initial="initial" animate="animate">
        <RegisterSelectField
          label="Genre"
          name="gender"
          value={form.gender || ""}
          onChange={handleChange}
          options={Array.from(GENDER_OPTIONS)}
          error={errors?.gender}
        />
      </motion.div>

      <motion.div custom={3} variants={fieldVariants} initial="initial" animate="animate">
        <InputField
          label="Date de naissance"
          type="date"
          value={form.dateNaissance || ""}
          onChange={handleChange}
          error={errors?.dateNaissance}
          name="dateNaissance"
        />
      </motion.div>

      <motion.div custom={4} variants={fieldVariants} initial="initial" animate="animate">
        <RegisterSelectField
          label="Pays de naissance"
          name="paysNaissance"
          value={form.paysNaissance || ""}
          onChange={handleChange}
          options={countrySelectOptions}
          error={errors?.paysNaissance}
        />
      </motion.div>

      <motion.div custom={5} variants={fieldVariants} initial="initial" animate="animate">
        {hasCityApi ? (
          <CitySelectField
            id="villeNaissance"
            label="Ville de naissance"
            value={form.villeNaissance || ""}
            countryValue={form.paysNaissance || ""}
            cityApiUrl={cityApiUrl}
            cityApiKey={cityApiKey || undefined}
            onChangeText={(txt) => onChangeField("villeNaissance", txt)}
            onSelectCity={handleCitySelect}
            error={errors?.villeNaissance}
            placeholder="Ex: Abidjan"
            fallbackCities={FALLBACK_CITIES as any}
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
      </motion.div>

      <motion.div custom={6} variants={fieldVariants} initial="initial" animate="animate">
        <InputField
          label="Heure de naissance"
          type="time"
          value={form.heureNaissance || ""}
          onChange={handleChange}
          error={errors?.heureNaissance}
          name="heureNaissance"
        />
      </motion.div>
    </div>
  );
});
