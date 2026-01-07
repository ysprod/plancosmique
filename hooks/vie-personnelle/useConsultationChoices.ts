import { useEffect, useState, useRef } from 'react';
import { api } from '@/lib/api/client';
import { ConsultationChoice } from '@/lib/interfaces';
import { getRubriqueById } from '@/lib/api/services/rubriques.service';

export function useConsultationChoices(rubriqueId: string, userId?: string) {
  const [choices, setChoices] = useState<ConsultationChoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [alreadyDoneChoices, setAlreadyDoneChoices] = useState<string[]>([]);
  const [alreadyDoneConsultationIds, setAlreadyDoneConsultationIds] = useState<Record<string, string>>({});
  const choicesFetchedRef = useRef(false);

  useEffect(() => {
    if (choicesFetchedRef.current) return;
    choicesFetchedRef.current = true;

    getRubriqueById(rubriqueId || '')
      .then(rubrique => {
        const arr = rubrique.consultationChoices || [];
        setChoices(arr);
      })
      .catch(() => setChoices([]))
      .finally(() => setLoading(false));

    if (userId) {
      api.get(`/user-consultation-choices?userId=${userId}`)
        .then(res => {
          if (Array.isArray(res.data)) {
            const ids: string[] = [];
            const map: Record<string, string> = {};
            res.data.forEach((item: any) => {
              if (typeof item === 'string') {
                ids.push(item);
              } else if (item.choiceId && item.consultationId) {
                ids.push(item.choiceId);
                map[item.choiceId] = item.consultationId;
              }
            });
            setAlreadyDoneChoices(ids);
            setAlreadyDoneConsultationIds(map);
          } else {
            setAlreadyDoneChoices([]);
            setAlreadyDoneConsultationIds({});
          }
        })
        .catch(() => {
          setAlreadyDoneChoices([]);
          setAlreadyDoneConsultationIds({});
        });
    }
  }, [userId, rubriqueId]);

  return { choices, loading, alreadyDoneChoices, alreadyDoneConsultationIds };
}
