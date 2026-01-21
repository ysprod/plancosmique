import { useState, useEffect } from 'react';
import { api } from '@/lib/api/client';
import { ConsultationChoice } from '@/lib/interfaces';
import { Prompt } from '@/lib/types/prompt.types';

export interface ConsultationChoiceWithRubrique extends ConsultationChoice {
  prompt?: Prompt;
  rubriqueId?: string;
  rubriqueTitle?: string;
}

function formatChoice(raw: any) {
  if (!raw) return null;
  let base = raw;
  if (raw.__parentArray && typeof raw.__index === 'number') {
    base = raw.__parentArray[raw.__index];
    if (raw.rubriqueTitle) base.rubriqueTitle = raw.rubriqueTitle;
    if (raw.rubriqueId) base.rubriqueId = raw.rubriqueId;
  }
  if (raw._doc) {
    base = raw._doc;
    if (raw.rubriqueTitle) base.rubriqueTitle = raw.rubriqueTitle;
    if (raw.rubriqueId) base.rubriqueId = raw.rubriqueId;
  }
  if (base.offering && Array.isArray(base.offering.alternatives)) {
    base.offering.alternatives = base.offering.alternatives.map((alt: any) => ({
      _id: alt._id,
      category: alt.category,
      offeringId: alt.offeringId,
      quantity: alt.quantity,
    }));
  }
  if (!base.rubriqueTitle && raw.$__parent && raw.$__parent.titre) {
    base.rubriqueTitle = raw.$__parent.titre;
    base.rubriqueId = raw.$__parent._id;
  }
  return base;
}

export function useConsultationChoiceFromRubriques(choiceId: string | null) {
  const [choice, setChoice] = useState<ConsultationChoiceWithRubrique | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!choiceId) {
      setChoice(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    api.get(`/consultation-choices/from-rubriques/${choiceId}`)
      .then(res => setChoice(formatChoice(res.data)))
      .catch(err => setError(err.response?.data?.message || 'Erreur lors du chargement'))
      .finally(() => setLoading(false));
  }, [choiceId]);

  return {
    loading,
    error,
    choice,
  };
}