import { useState, useEffect, useRef } from 'react';
import { api } from '@/lib/api/client';
import { useAuth } from '@/lib/auth/AuthContext';
import type { ConsultationChoice, UserData, WalletOffering } from '@/lib/interfaces';

export type StepType = 'selection' | 'form' | 'offering' | 'processing' | 'success' | 'confirm' | 'consulter' | 'genereanalyse';

export function useSlide4Section(rubriqueId: string, typeconsultation: string) {
  const { user } = useAuth();
  const [step, setStep] = useState<StepType>('selection');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [walletOfferings, setWalletOfferings] = useState<WalletOffering[]>([]);
  const [consultation, setConsultation] = useState<any>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const choicesFetchedRef = useRef(false);
  const [choices, setChoices] = useState<ConsultationChoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?._id) {
      api.get(`/users/me`)
        .then(res => {
          setUserData(res.data);
        })
        .catch(() => {
          setUserData(null);
        });
    }
  }, [user]);

  // Ajoutez ici d'autres effets et callbacks nécessaires

  return {
    step, setStep,
    paymentLoading, setPaymentLoading,
    apiError, setApiError,
    consultationId, setConsultationId,
    walletOfferings, setWalletOfferings,
    consultation, setConsultation,
    userData, setUserData,
    choicesFetchedRef,
    choices, setChoices,
    loading, setLoading,
  };
}
