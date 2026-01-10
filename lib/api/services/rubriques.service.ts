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