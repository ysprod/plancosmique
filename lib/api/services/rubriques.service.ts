import { Rubrique } from '@/lib/interfaces';
import { api } from '@/lib/api/client';

export async function getRubrique(id: string): Promise<Rubrique & { consultations?: any[] } | null> {
  try {
    const rubrique = await getRubriqueById(id);
    if (!rubrique) return null;
    return {
      ...rubrique,
      consultations: rubrique.consultationChoices || []
    };
  } catch {
    return null;
  }
}

export async function getRubriqueById(id: string): Promise<Rubrique> {
  const res = await api.get<Rubrique>(`/rubriques/${id}`);
  return res.data;
}

export async function reorderConsultationChoices(
  rubriqueId: string, 
  choices: Array<{ choiceId: string; order: number }>
): Promise<Rubrique> {
  const res = await api.put<Rubrique>(
    `/rubriques/${rubriqueId}/reorder-choices`,
    { choices }
  );
  return res.data;
}

export interface ConsultationChoiceWithCount {
  _id: string;
  title: string;
  description: string;
  frequence: string;
  participants: string;
  order?: number;
  offering: any;
  consultationCount: number;
  showButtons: boolean;
}

export interface RubriqueWithCount {
  _id: string;
  titre: string;
  description: string;
  categorie: string;
  typeconsultation: string;
  consultationChoices: ConsultationChoiceWithCount[];
}

export async function getRubriqueWithConsultationCount(
  rubriqueId: string,
  userId: string
): Promise<RubriqueWithCount> {
  const res = await api.get<RubriqueWithCount>(
    `/rubriques/${rubriqueId}/choices-with-count`,
    { params: { userId } }
  );
  return res.data;
}