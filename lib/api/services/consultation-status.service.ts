import { api } from '@/lib/api/client';

export interface ConsultationChoiceStatusDto {
  choiceId: string;
  choiceTitle: string;
  buttonStatus: 'CONSULTER' | 'RÉPONSE EN ATTENTE' | "VOIR L'ANALYSE";
  hasActiveConsultation: boolean;
  consultationId: string | null;
}

export interface UserConsultationChoicesStatusDto {
  userId: string;
  choices: ConsultationChoiceStatusDto[];
}

export async function getChoiceStatus(userId: string, choiceId: string): Promise<ConsultationChoiceStatusDto> {
  const response = await api.get(`/consultation-choice-status/${userId}/${choiceId}`);
  return response.data;
}

export async function getUserChoicesStatus(userId: string, choiceIds?: string[]): Promise<UserConsultationChoicesStatusDto> {
  const params = choiceIds && choiceIds.length > 0 
    ? `?choiceIds=${choiceIds.join(',')}` 
    : '';
  const response = await api.get(`/consultation-choice-status/${userId}${params}`);
  return response.data;
}