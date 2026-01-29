'use client';
import InputField from '@/components/vie-personnelle/InputField';
import { motion } from 'framer-motion';
import { AlertCircle, Info, Phone, Sparkles } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';
import RegisterInputField from '../auth/RegisterInputField';
import RegisterSelectField from '../auth/RegisterSelectField';
import { useRegisterForm } from '@/hooks/auth/useRegisterForm';
import { GENDER_OPTIONS } from '../vie-personnelle/FormFields';
import { birthCountries } from '@/lib/birthCountries';

interface Props {
  form: any;
  errors: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  apiError: string | null;
  handleSubmit: (e: React.FormEvent) => void;
  step: string;
}

const countryOptions = birthCountries.map((country) => ({ label: country, value: country }));

const ConsultationForm: React.FC<Props> = ({
  form,
  errors,
  handleChange,
  apiError,
  handleSubmit,
  step,
}) => {
  const router = useRouter();
  const handleReset = (() => router.back());
  const isProcessing = step === "traitement";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border-2 border-purple-200 max-w-3xl mx-auto"
    >
      <div className="mb-8 pb-6 border-b-2 border-purple-100">
        <div className="flex items-start gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-purple-600 flex-shrink-0" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">
              Informations Requises
            </h2>

          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-blue-900 text-sm leading-relaxed">
              <strong>Important :</strong> Assurez-vous que votre{' '}
              <strong>heure de naissance</strong> est exacte pour une analyse astrologique précise.
              Consultez votre acte de naissance si nécessaire.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

        <InputField
          label="Date de naissance"
          name="dateNaissance"
          type="date"
          value={form.dateNaissance}
          onChange={handleChange}
          error={errors.dateNaissance}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RegisterSelectField
            label="Genre"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            error={errors.gender}
            options={GENDER_OPTIONS}
          />

          <RegisterSelectField
            label="Pays"
            name="country"
            value={form.country}
            onChange={handleChange}
            error={errors.country}
            options={countryOptions}
          />
        </div>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <InputField
            label="Ville de naissance"
            name="villeNaissance"
            value={form.villeNaissance}
            onChange={handleChange}
            error={errors.villeNaissance}
            placeholder="Ex: Abidjan, Paris..."
          />
        </div>

        <InputField
          label="Heure de naissance (exacte si possible)"
          name="heureNaissance"
          type="time"
          value={form.heureNaissance}
          onChange={handleChange}
          error={errors.heureNaissance}
        />

        {apiError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-4 bg-red-50 border-2 border-red-200 rounded-xl"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm font-medium">{apiError}</p>
            </div>
          </motion.div>
        )}

        <div className="space-y-3 pt-4">
          <motion.button
            type="submit"
            disabled={step !== "form"}
            aria-busy={isProcessing}
            whileHover={{ scale: step === "form" ? 1.02 : 1 }}
            whileTap={{ scale: step === "form" ? 0.98 : 1 }}
            className={`w-full py-4 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg ${step !== "form" ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" fill="none" /></svg>
                Traitement…
              </span>
            ) : (
              "Valider et Continuer"
            )}
          </motion.button>

          <button
            type="button"
            onClick={handleReset}
            className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Annuler
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ConsultationForm;