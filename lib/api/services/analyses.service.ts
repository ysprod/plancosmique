import { api } from '../client';

export const analysesService = {
  // Créer une analyse
  create: async (consultationId: string, texte: string) => {
    const res = await api.post('/analyses', { consultationId, texte });
    return res.data;
  },

  // Lister toutes les analyses
  list: async () => {
    const res = await api.get('/analyses');
    return res.data;
  },

  // Récupérer une analyse par son id
  get: async (id: string) => {
    const res = await api.get(`/analyses/${id}`);
    return res.data;
  },

  // Mettre à jour le texte d'une analyse
  update: async (id: string, texte: string) => {
    const res = await api.put(`/analyses/${id}`, { texte });
    return res.data;
  },

  // Supprimer une analyse
  remove: async (id: string) => {
    const res = await api.delete(`/analyses/${id}`);
    return res.data;
  },

  // Récupérer toutes les analyses pour un choiceId donné
  getByChoice: async (choiceId: string) => {
    const res = await api.get(`/analyses/by-choice/${choiceId}`);
    return res.data;
  },
};
