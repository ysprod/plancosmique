import { Rubrique } from "./interfaces";

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

export function mapFormDataToBackend(form: any) {
  if (!form) {
    console.warn('mapFormDataToBackend: form is null or undefined');
    return {};
  }
  const result = {
    firstName: form.prenoms || form.firstName || '',
    lastName: form.nom || form.lastName || '',
    dateOfBirth: form.dateNaissance
      ? new Date(form.dateNaissance).toISOString()
      : (form.dateOfBirth ? new Date(form.dateOfBirth).toISOString() : ''),
    timeOfBirth: form.heureNaissance || form.timeOfBirth || '',
    countryOfBirth: form.paysNaissance || form.countryOfBirth || '',
    cityOfBirth: form.villeNaissance || form.cityOfBirth || '',
    gender: form.genre || form.gender || '',
    phone: form.phone || form.numeroSend || '',
    email: form.email || '',
    country: form.country || form.paysNaissance || '',
    question: form.question || '',
    username: form.username || '',
    ...form
  };
  return result;
}


export function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

export function rubriqueLabel(r: any): string {
  return String(r?.titre ?? r?.nom ?? "Rubrique");
}

export function getRubriqueId(r: Rubrique): string | null {
  return r?._id || null;
}


export  // Mapping formData frontend -> backend (strict)
  function mapFormDataToBackend2(form: any) {
    if (!form) {
      console.warn('mapFormDataToBackend: form is null or undefined');
      return {};
    }
    const result = {
      firstName: form.prenoms || form.firstName || '',
      lastName: form.nom || form.lastName || '',
      dateOfBirth: form.dateNaissance
        ? new Date(form.dateNaissance).toISOString()
        : (form.dateOfBirth ? new Date(form.dateOfBirth).toISOString() : ''),
      timeOfBirth: form.heureNaissance || form.timeOfBirth || '',
      countryOfBirth: form.paysNaissance || form.countryOfBirth || '',
      cityOfBirth: form.villeNaissance || form.cityOfBirth || '',
      gender: form.genre || form.gender || '',
      phone: form.phone || form.numeroSend || '',
      email: form.email || '',
      country: form.country || form.paysNaissance || '',
      question: form.question || '',
      username: form.username || '',
      // Ajoute d'autres champs backend utiles ici
      ...form
    };

    return result;
  }