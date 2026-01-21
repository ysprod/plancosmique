import { api } from '../client';
import { CreatePromptDto, Prompt, UpdatePromptDto } from '@/lib/types/prompt.types';

export const promptService = {
  async create(data: CreatePromptDto): Promise<Prompt> {
    const response = await api.post('/prompts', data);
    return response.data;
  },

  async findAll(): Promise<Prompt[]> {
    const response = await api.get('/prompts');
    return response.data;
  },

  async findActive(): Promise<Prompt[]> {
    const response = await api.get('/prompts/active');
    return response.data;
  },

  async findById(id: string): Promise<Prompt> {
    const response = await api.get(`/prompts/${id}`);
    return response.data;
  },

  async update(id: string, data: UpdatePromptDto): Promise<Prompt> {
    const response = await api.patch(`/prompts/${id}`, data);
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