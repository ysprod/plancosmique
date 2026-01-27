'use client';
import { getRubriqueById } from '@/lib/api/services/rubriques.service';
import { ConsultationChoice, StepType } from '@/lib/interfaces';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useSlide4Section() {
  const router = useRouter();
  const [choices, setChoices] = useState<ConsultationChoice[]>([]);
  const [loading, setLoading] = useState(true);

  const choicesFetchedRef = useRef(false);

  const handleSelect = useCallback(() => {
    router.push('/secured/profil/doors');
  }, [router]);

  useEffect(() => {
    if (choicesFetchedRef.current) return;
    choicesFetchedRef.current = true;
    getRubriqueById('694acf59bd12675f59e7a7f2')
      .then(rubrique => {
        const arr = (rubrique.consultationChoices || [])
          .filter((choice: any) => typeof choice.title === 'string' && !choice.title.toLowerCase().includes('5 portes')&& !choice.title.toLowerCase().includes('la '))
          .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
        setChoices(arr);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  return { choices, loading, handleSelect, };
}