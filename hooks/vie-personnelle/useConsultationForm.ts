import { useMemo, useCallback } from 'react';
import { birthCountries } from '@/lib/birthCountries';

export function useConsultationForm(form: any, handleChange: (e: any) => void) {
  const countryOptions = useMemo(() => ['', ...birthCountries], []);

  const onChangeField = useCallback(
    (name: string, value: string) => {
      handleChange({ target: { name, value } });
    },
    [handleChange]
  );

  const cityApiUrl = useMemo(() => process.env.NEXT_PUBLIC_CITY_API_URL || '', []);
  const cityApiKey = useMemo(() => process.env.NEXT_PUBLIC_CITY_API_KEY || '', []);

  const handleCitySelect = useCallback(
    (c: any) => {
      onChangeField('villeNaissance', c.cityName);
      if (!form.paysNaissance && c.countryName) {
        onChangeField('paysNaissance', c.countryName);
      }
    },
    [form.paysNaissance, onChangeField]
  );

  return {
    countryOptions,
    onChangeField,
    cityApiUrl,
    cityApiKey,
    handleCitySelect,
  };
}
