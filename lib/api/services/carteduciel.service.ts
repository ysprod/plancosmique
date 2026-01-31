import { api } from '../client';
import { User } from '@/lib/interfaces';

export async function generateCarteDuCiel(): Promise<User> {
    // L'endpoint doit être adapté selon le backend

    const res = await api.post("/consultations/generate-sky-chart", {});
    return res.data;
}
