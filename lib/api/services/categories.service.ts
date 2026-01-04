import { api } from '@/lib/api/client';

// Utiliser les types génériques pour les réponses API
export async function getCategory(id: string): Promise<any> {
  const res = await api.get<any>(`/categories/${id}`);
  return res.data;
}
export async function getCategories(): Promise<any[]> {
  const res = await api.get<any[]>('/categories');
  return res.data;
}

export async function createCategory(data: { nom: string; description: string; rubriques: string[] }): Promise<any> {
  const res = await api.post<any>('/categories', data);
  return res.data;
}

export async function updateCategory(id: string, data: { nom: string; description: string; rubriques: string[] }): Promise<any> {
  const res = await api.patch<any>(`/categories/${id}`, data);
  return res.data;
}

export async function deleteCategory(id: string): Promise<void> {
  await api.delete(`/categories/${id}`);
}
