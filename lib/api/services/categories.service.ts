import { CategorieAdmin } from '@/lib/interfaces';
import { api } from '@/lib/api/client';

export async function getCategory(id: string): Promise<CategorieAdmin> {
  const res = await api.get<CategorieAdmin>(`/categories/${id}`);
  return res.data;
}

export async function getCategories(): Promise<CategorieAdmin[]> {
  const res = await api.get<CategorieAdmin[]>('/categories');
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
