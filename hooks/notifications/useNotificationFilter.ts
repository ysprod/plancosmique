import { useState } from 'react';

export const filterOptions: { value: string; label: string }[] = [
  { value: 'all', label: 'Toutes' },
  { value: 'unread', label: 'Non lues' },
  { value: 'CONSULTATION_RESULT', label: 'Résultats' },
  { value: 'CONSULTATION_ASSIGNED', label: 'Consultations assignées' },
  { value: 'PAYMENT_CONFIRMED', label: 'Paiements' },
  { value: 'SYSTEM_ANNOUNCEMENT', label: 'Annonces système' },
];

export default function useNotificationFilter() {
  const [filter, setFilter] = useState<string>('all');
  return { filter, setFilter };
}
