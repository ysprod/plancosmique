import { memo } from 'react';
import { motion } from 'framer-motion';
import InputField from '@/components/vie-personnelle/InputField';
import RegisterSelectField from '../auth/RegisterSelectField';
import { CitySelectField } from '@/components/vie-personnelle/CitySelectField';
import { fieldVariants } from './consultationFormVariants';

export const GENDER_OPTIONS = [
  { value: '', label: 'Sélectionner' },
  { value: 'male', label: 'Homme' },
  { value: 'female', label: 'Femme' },
] as const;

interface FormFieldsProps {
  form: any;
  errors: Record<string, string | undefined>;
  handleChange: (e: any) => void;
  countryOptions: string[];
  cityApiUrl: string;
  cityApiKey: string;
  onChangeField: (name: string, value: string) => void;
  handleCitySelect: (c: any) => void;
}

export const FormFields = memo<FormFieldsProps>(function FormFields({
  form,
  errors,
  handleChange,
  countryOptions,
  cityApiUrl,
  cityApiKey,
  onChangeField,
  handleCitySelect,
}) {
  return (
    <div className="grid grid-cols-1 gap-3.5">
      <motion.div custom={0} variants={fieldVariants} initial="initial" animate="animate">
        <InputField
          label="Nom"
          value={form.nom || ''}
          onChange={handleChange}
          placeholder="Nom"
          error={errors?.nom}
          name="nom"
        />
      </motion.div>

      <motion.div custom={1} variants={fieldVariants} initial="initial" animate="animate">
        <InputField
          label="Prénoms"
          value={form.prenoms || ''}
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
          value={form.gender || ''}
          onChange={handleChange}
          options={Array.from(GENDER_OPTIONS)}
          error={errors?.gender}
        />
      </motion.div>

      <motion.div custom={3} variants={fieldVariants} initial="initial" animate="animate">
        <InputField
          label="Date de naissance"
          type="date"
          value={form.dateNaissance || ''}
          onChange={handleChange}
          error={errors?.dateNaissance}
          name="dateNaissance"
        />
      </motion.div>

      <motion.div custom={4} variants={fieldVariants} initial="initial" animate="animate">
        <RegisterSelectField
          label="Pays de naissance"
          name="paysNaissance"
          value={form.paysNaissance || ''}
          onChange={handleChange}
          options={countryOptions.map((c) => ({ value: c, label: c || 'Sélectionner' }))}
          error={errors?.paysNaissance}
        />
      </motion.div>

      <motion.div custom={5} variants={fieldVariants} initial="initial" animate="animate">
        {cityApiUrl ? (
          <CitySelectField
            id="villeNaissance"
            label="Ville de naissance"
            value={form.villeNaissance || ''}
            countryValue={form.paysNaissance || ''}
            cityApiUrl={cityApiUrl}
            cityApiKey={cityApiKey || undefined}
            onChangeText={(txt) => onChangeField('villeNaissance', txt)}
            onSelectCity={handleCitySelect}
            error={errors?.villeNaissance}
            placeholder="Ex: Abidjan"
            fallbackCities={[
              { name: 'Abidjan', countryName: "Côte d'Ivoire" },
              { name: 'Jacqueville', countryName: "Côte d'Ivoire" },
              { name: 'Yamoussoukro', countryName: "Côte d'Ivoire" },
                { name: 'Bouaké', countryName: "Côte d'Ivoire" },
                { name: 'San Pedro', countryName: "Côte d'Ivoire" },
                { name: 'Daloa', countryName: "Côte d'Ivoire" },
                { name: 'Korhogo', countryName: "Côte d'Ivoire" },
                { name: 'Man', countryName: "Côte d'Ivoire" },
                { name: 'Gagnoa', countryName: "Côte d'Ivoire" },
                { name: 'Anyama', countryName: "Côte d'Ivoire" },
                { name: 'Séguéla', countryName: "Côte d'Ivoire" },
                { name: 'Odienné', countryName: "Côte d'Ivoire" },
                { name: 'Bondoukou', countryName: "Côte d'Ivoire" },
            ]}
          />
        ) : (
          <InputField
            label="Ville de naissance"
            value={form.villeNaissance || ''}
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
          value={form.heureNaissance || ''}
          onChange={handleChange}
          error={errors?.heureNaissance}
          name="heureNaissance"
        />
      </motion.div>
    </div>
  );
});
