import { ConsultationChoice } from '@/lib/interfaces';
import { Prompt, UpdatePromptDto } from '@/lib/types/prompt.types';
import { api } from '../client';

export const promptService = {
  
  async findById(id: string): Promise<ConsultationChoice> {
    const response = await api.get(`/consultations/${id}/with-prompt`);
    return response.data;
  },

  async update(id: string, data: UpdatePromptDto): Promise<Prompt> {
    const response = await api.patch(`/consultations/choice/${id}/prompt`, data);
    return response.data;
  },

  async toggleActive(id: string): Promise<Prompt> {
    const response = await api.patch(`/prompts/${id}/toggle-active`);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/prompts/${id}`);
  }
};