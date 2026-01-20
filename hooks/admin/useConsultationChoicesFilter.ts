import { useMemo } from 'react';

export function useConsultationChoicesFilter(choices: any[], search: string) {
  return useMemo(() => {
    if (!search) return choices;
    const lower = search.toLowerCase();
    return choices.filter(c =>
      c.title.toLowerCase().includes(lower) ||
      c.description.toLowerCase().includes(lower) ||
      c.rubriqueTitle?.toLowerCase().includes(lower)
    );
  }, [choices, search]);
}
