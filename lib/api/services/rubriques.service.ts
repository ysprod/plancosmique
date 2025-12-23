import { Rubrique } from '@/lib/interfaces';
import { api } from '@/lib/api/client';

export async function getRubriqueById(id: string): Promise<Rubrique> {
  const res = await api.get<Rubrique>(`/rubriques/${id}`);
  return res.data;
}
