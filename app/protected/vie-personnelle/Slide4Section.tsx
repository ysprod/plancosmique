/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, AlertCircle, Check } from 'lucide-react';
import { birthCountries } from './birthCountries';
import { api } from '@/lib/api/client';

// Types
interface ConsultationChoice {
  id: string;
  title: string;
  description: string;
}

interface FormData {
  nom: string;
  prenoms: string;
  genre: string;
  dateNaissance: string;
  paysNaissance: string;
  villeNaissance: string;
  heureNaissance: string;
}

interface FormErrors {
  [key: string]: string;
}

// Constantes
const GENRE_OPTIONS = [
  { value: '', label: 'Sélectionner' },
  { value: 'Homme', label: 'Homme' },
  { value: 'Femme', label: 'Femme' },
  { value: 'Autre', label: 'Autre' },
] as const;

const CONSULTATION_CHOICES: ConsultationChoice[] = [
  {
    id: 'mission',
    title: 'JE VEUX CONNAÎTRE MA MISSION DE VIE',
    description:
      "Comprendre ce pour quoi je suis venu(e) sur Terre. Je veux découvrir ma mission, le sens profond de mon incarnation, et ce que mon âme cherche réellement à accomplir dans cette vie.",
  },
  {
    id: 'vocation',
    title: 'JE VEUX TROUVER MA VOCATION PROFESSIONNELLE',
    description:
      "Savoir quel métier est fait pour moi. Je veux identifier le domaine où je peux m'épanouir, réussir, et exprimer pleinement mes talents naturels.",
  },
  {
    id: 'talents',
    title: 'JE VEUX DÉCOUVRIR MES TALENTS CACHÉS',
    description:
      "Mettre en lumière les dons que je porte en moi. Je veux comprendre ce qui me rend unique, valoriser mes capacités et apprendre à utiliser mes talents pour transformer ma vie.",
  },
  {
    id: 'blessures',
    title: 'JE VEUX GUÉRIR MES BLESSURES KARMIQUES',
    description:
      "Comprendre l'origine de mes blocages émotionnels. Je veux éclairer mes mémoires passées, libérer mon âme de ses poids anciens et avancer vers une vraie guérison intérieure.",
  },
  {
    id: 'amour',
    title: "JE VEUX COMPRENDRE MA MANIÈRE D'AIMER",
    description:
      "Connaître ma façon d'aimer et de recevoir l'amour. Je veux comprendre mes besoins affectifs, mes schémas relationnels et créer des relations plus harmonieuses et plus vraies.",
  },
  {
    id: 'argent',
    title: "JE VEUX AMÉLIORER MON RAPPORT À L'ARGENT ET AU SUCCÈS",
    description:
      "Comprendre ma relation à l'argent, au travail et à la réussite. Je veux identifier ce qui bloque mon abondance, activer mes forces et attirer une stabilité matérielle durable.",
  },
  {
    id: 'stabilite',
    title: 'JE VEUX SÉCURISER MA STABILITÉ ÉMOTIONNELLE',
    description:
      "Comprendre comment fonctionnent mes émotions. Je veux savoir ce qui m'apporte la paix, ce qui me déstabilise, et apprendre à m'apaiser pour retrouver un vrai équilibre intérieur.",
  },
  {
    id: 'cycles',
    title: 'JE VEUX ANTICIPER MES GRANDS CYCLES DE VIE',
    description:
      "Connaître les grandes périodes qui vont rythmer ma vie. Je veux savoir quand agir, quand changer, quand me protéger et quand saisir les opportunités qui s'ouvrent devant moi.",
  },
  {
    id: 'invisible',
    title: 'JE VEUX ME CONNECTER AU MONDE INVISIBLE',
    description:
      "Comprendre mon intuition, mes rêves et ma sensibilité spirituelle. Je veux développer ma connexion intérieure et écouter cette guidance qui m'accompagne depuis toujours.",
  },
  {
    id: 'theme',
    title: 'JE VEUX MON THÈME ASTRAL COMPLET',
    description:
      "Accéder à la lecture complète de qui je suis réellement. Je veux comprendre ma personnalité, mes forces, mes défis, mon potentiel et mon chemin de vie pour prendre des décisions alignées et éclairées.",
  },
];

const CONSULTATION_TYPE_MAP: Record<string, string> = {
  mission: 'SPIRITUALITE',
  vocation: 'PROFESSIONNEL',
  talents: 'VIE_PERSONNELLE',
  blessures: 'VIE_PERSONNELLE',
  amour: 'RELATIONS',
  argent: 'PROFESSIONNEL',
  stabilite: 'VIE_PERSONNELLE',
  cycles: 'HOROSCOPE',
  invisible: 'SPIRITUALITE',
  theme: 'ASTROLOGIE_AFRICAINE',
};

const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;

// Composants utilitaires
const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <motion.p
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-red-600 text-sm mt-1 flex items-center gap-1"
  >
    <AlertCircle className="w-4 h-4" />
    {message}
  </motion.p>
);

const SuccessMessage: React.FC<{ message: string }> = ({ message }) => (
  <motion.p
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-green-600 text-sm mt-2 flex items-center gap-1 bg-green-50 p-3 rounded-lg"
  >
    <Check className="w-5 h-5" />
    {message}
  </motion.p>
);

const InputField: React.FC<{
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}> = ({ label, name, type = 'text', value, onChange, error, placeholder }) => (
  <div>
    <label className="block text-sm font-bold text-gray-900 mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full border-2 rounded-xl px-4 py-3 transition-all ${
        error ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-purple-500'
      } focus:outline-none focus:ring-2 focus:ring-purple-500/10`}
    />
    {error && <ErrorMessage message={error} />}
  </div>
);

const SelectField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  options: readonly { value: string; label: string }[] | string[];
}> = ({ label, name, value, onChange, error, options }) => (
  <div>
    <label className="block text-sm font-bold text-gray-900 mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full border-2 rounded-xl px-4 py-3 transition-all ${
        error ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-purple-500'
      } focus:outline-none focus:ring-2 focus:ring-purple-500/10`}
    >
      {options.map((opt) =>
        typeof opt === 'string' ? (
          <option key={opt} value={opt}>
            {opt || 'Sélectionner'}
          </option>
        ) : (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        )
      )}
    </select>
    {error && <ErrorMessage message={error} />}
  </div>
);

const ConsultationCard: React.FC<{
  choice: ConsultationChoice;
  onSelect: () => void;
}> = ({ choice, onSelect }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="p-6 bg-white shadow-lg rounded-2xl cursor-pointer border-2 border-purple-200 hover:border-purple-400 transition-all"
  >
    <h2 className="font-bold text-purple-700 text-lg mb-3">{choice.title}</h2>
    <p className="text-gray-600 text-sm leading-relaxed mb-4">{choice.description}</p>
    <button
      onClick={onSelect}
      className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all"
    >
      Consulter
    </button>
  </motion.div>
);

// Validation
const validateForm = (form: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!form.nom.trim()) errors.nom = 'Nom requis';
  if (!form.prenoms.trim()) errors.prenoms = 'Prénoms requis';
  if (!form.genre) errors.genre = 'Genre requis';
  if (!form.dateNaissance) errors.dateNaissance = 'Date de naissance requise';
  if (!form.paysNaissance) errors.paysNaissance = 'Pays de naissance requis';
  if (!form.villeNaissance.trim()) errors.villeNaissance = 'Ville de naissance requise';
  if (!form.heureNaissance) errors.heureNaissance = 'Heure de naissance requise';

  return errors;
};

// Composant principal
export default function Slide4Section() {
  const [selected, setSelected] = useState<ConsultationChoice | null>(null);
  const [form, setForm] = useState<FormData>({
    nom: '',
    prenoms: '',
    genre: '',
    dateNaissance: '',
    paysNaissance: '',
    villeNaissance: '',
    heureNaissance: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const countryOptions = useMemo(() => ['', ...birthCountries], []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));

      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }

      setApiError(null);
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setApiError(null);
      setSuccess(false);

      const validationErrors = validateForm(form);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      if (!selected) {
        setApiError('Aucun choix de consultation sélectionné');
        return;
      }

      setLoading(true);

      try {
        const payload = {
          serviceId: SERVICE_ID,
          type: Object.prototype.hasOwnProperty.call(CONSULTATION_TYPE_MAP, selected.id)
            ? CONSULTATION_TYPE_MAP[selected.id]
            : 'AUTRE',
          title: selected.title,
          description: selected.description,
          formData: form,
        };

        const res = await api.post('/consultations', payload);

        if (res.status !== 200 && res.status !== 201) {
          throw new Error(res.data?.message || 'Erreur lors de la création de la consultation');
        }

        setSuccess(true);
        setForm({
          nom: '',
          prenoms: '',
          genre: '',
          dateNaissance: '',
          paysNaissance: '',
          villeNaissance: '',
          heureNaissance: '',
        });

        // Réinitialiser après 3 secondes
        setTimeout(() => {
          setSelected(null);
          setSuccess(false);
        }, 3000);
      } catch (err: any) {
        setApiError(err.response?.data?.message || err.message || 'Erreur réseau');
      } finally {
        setLoading(false);
      }
    },
    [form, selected]
  );

  const resetSelection = useCallback(() => {
    setSelected(null);
    setErrors({});
    setApiError(null);
    setSuccess(false);
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <button
          onClick={resetSelection}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Retour</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-700 mb-3">
            Souhaite-tu vraiment une consultation sur
          </h2>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
            Votre Vie Personnelle ?
          </h1>
        </motion.div>

        {/* Liste des choix */}
        {!selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2"
          >
            {CONSULTATION_CHOICES.map((choice) => (
              <ConsultationCard
                key={choice.id}
                choice={choice}
                onSelect={() => setSelected(choice)}
              />
            ))}
          </motion.div>
        )}

        {/* Formulaire */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border-2 border-purple-200 max-w-3xl mx-auto"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-purple-700 mb-6 text-center">
                {selected.title}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    label="Nom"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    error={errors.nom}
                    placeholder="Votre nom"
                  />

                  <InputField
                    label="Prénoms"
                    name="prenoms"
                    value={form.prenoms}
                    onChange={handleChange}
                    error={errors.prenoms}
                    placeholder="Vos prénoms"
                  />
                </div>

                <SelectField
                  label="Genre"
                  name="genre"
                  value={form.genre}
                  onChange={handleChange}
                  error={errors.genre}
                  options={GENRE_OPTIONS}
                />

                <InputField
                  label="Date de naissance"
                  name="dateNaissance"
                  type="date"
                  value={form.dateNaissance}
                  onChange={handleChange}
                  error={errors.dateNaissance}
                />

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
                  placeholder="Ville de naissance"
                />

                <InputField
                  label="Heure de naissance"
                  name="heureNaissance"
                  type="time"
                  value={form.heureNaissance}
                  onChange={handleChange}
                  error={errors.heureNaissance}
                />

                {apiError && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-red-50 border-2 border-red-200 rounded-xl"
                  >
                    <p className="text-red-700 text-sm flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      {apiError}
                    </p>
                  </motion.div>
                )}

                {success && <SuccessMessage message="Consultation enregistrée avec succès !" />}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Envoi en cours...' : 'Valider ma demande'}
                </motion.button>

                <button
                  type="button"
                  onClick={resetSelection}
                  className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Retour aux choix
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
