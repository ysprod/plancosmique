import { api } from '@/lib/api/client';

export async function getChoicesWithCount(rubriqueId: string) {
  const response = await api.get(`/rubriques/${rubriqueId}/choices-with-count`);
  return response.data;
}
