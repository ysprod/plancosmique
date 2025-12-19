/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import { AlertCircle, Info, Sparkles } from 'lucide-react';
import React from 'react';
import { birthCountries } from '../birthCountries';
import InputField from './InputField';
import SelectField from './SelectField';
import { GENRE_OPTIONS } from './genreOptions';

interface Props {
  form: any;
  errors: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  apiError: string | null;
  handleSubmit: (e: React.FormEvent) => void;
  resetSelection: () => void;
  selectedTitle: string;
}

const ConsultationForm: React.FC<Props> = ({
  form,
  errors,
  handleChange,
  apiError,
  handleSubmit,
  resetSelection,
  selectedTitle,
}) => {
  const countryOptions = React.useMemo(() => ['', ...birthCountries], []);
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="mt-6 bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border-2 border-purple-200 max-w-3xl mx-auto"
  >
    {/* Header avec titre de consultation */}
    <div className="mb-8 pb-6 border-b-2 border-purple-100">
      <div className="flex items-start gap-3 mb-4">
        <Sparkles className="w-8 h-8 text-purple-600 flex-shrink-0" />
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">
            Informations Requises
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Consultation : <strong>{selectedTitle}</strong>
          </p>
        </div>
      </div>

      {/* Info importante */}
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

    {/* Formulaire */}
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nom et Prénoms */}
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

      {/* Genre */}
      <SelectField
        label="Genre"
        name="genre"
        value={form.genre}
        onChange={handleChange}
        error={errors.genre}
        options={GENRE_OPTIONS}
      />

      {/* Date de naissance */}
      <InputField
        label="Date de naissance"
        name="dateNaissance"
        type="date"
        value={form.dateNaissance}
        onChange={handleChange}
        error={errors.dateNaissance}
      />

      {/* Pays et Ville */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <SelectField
          label="Pays de naissance"
          name="paysNaissance"
          value={form.paysNaissance}
          onChange={handleChange}
          error={errors.paysNaissance}
          options={countryOptions}
        />
        <InputField
          label="Ville de naissance"
          name="villeNaissance"
          value={form.villeNaissance}
          onChange={handleChange}
          error={errors.villeNaissance}
          placeholder="Ex: Abidjan, Paris..."
        />
      </div>

      {/* Heure de naissance */}
      <InputField
        label="Heure de naissance (exacte si possible)"
        name="heureNaissance"
        type="time"
        value={form.heureNaissance}
        onChange={handleChange}
        error={errors.heureNaissance}
      />

      {/* Email pour notification */}
      <InputField
        label="Email (optionnel - pour recevoir votre analyse)"
        name="email"
        type="email"
        value={form.email || ''}
        onChange={handleChange}
        error={errors.email}
        placeholder="exemple@email.com"
      />

      {/* Erreur API */}
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

      {/* Boutons */}
      <div className="space-y-3 pt-4">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
        >
          Valider et Continuer
        </motion.button>

        <button
          type="button"
          onClick={resetSelection}
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
