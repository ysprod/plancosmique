import { api } from '@/lib/api/client';

export async function getChoicesWithCount(rubriqueId: string, userId: string) {
  const response = await api.get(`/rubriques/${rubriqueId}/choices-with-count`, {
    params: { userId }
  });
  return response.data;
}
