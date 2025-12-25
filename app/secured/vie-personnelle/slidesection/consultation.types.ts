
export interface FormData {
  nom: string;
  prenoms: string;
  genre: string;
  dateNaissance: string;
  paysNaissance: string;
  villeNaissance: string;
  heureNaissance: string;
  numeroSend?: string;
  email?: string; // Email pour notifications
}

export type StepType = 'selection' | 'form' | 'offering' | 'processing' | 'success' | 'confirm'| 'consulter'| 'genereanalyse';
