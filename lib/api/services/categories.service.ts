import { CategorieAdmin } from '@/lib/interfaces';
import { api } from '@/lib/api/client';

const normalizeCategory = (d: any): CategorieAdmin => ({
  _id: d?.id || d?._id,
  nom: d?.titre || d?.nom,
  description: d?.description,
  rubriques: (d?.rubriques || []).map((r: any) => ({
    _id: r?.id || r?._id,
    titre: r?.titre || r?.nom,
    description: r?.description,
    categorieId: r?.categorieId,
  })),
  createdAt: d?.createdAt,
  updatedAt: d?.updatedAt,
} as CategorieAdmin);

export async function getCategory(id: string): Promise<CategorieAdmin> {
  let res;
  try {
    res = await api.get(`/categories/${id}/with-rubriques`);
  } catch (error) {
    res = await api.get(`/categories/${id}`);
  }
  // Adapter la structure backend à l'interface attendue côté front
  const d = res.data?.data || res.data;
  return normalizeCategory(d);
}

export async function getCategories(): Promise<CategorieAdmin[]> {
  const res = await api.get('/categories');
  const data = res.data?.data || res.data;
  if (!Array.isArray(data)) return [];
  return data.map(normalizeCategory);
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
