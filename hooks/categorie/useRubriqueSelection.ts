import { api } from '@/lib/api/client';
import { getRubriqueWithConsultationCount, ConsultationChoiceWithCount } from '@/lib/api/services/rubriques.service';
import { useAuth } from '@/lib/auth/AuthContext';
import type { ConsultationChoice, DoneChoice, Rubrique } from '@/lib/interfaces';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useRubriqueSelection(rubrique: Rubrique, categoryId: string) {
  const router = useRouter();
  const { user } = useAuth();
  
  const [choices, setChoices] = useState<ConsultationChoice[]>([]);
  const [choicesWithCount, setChoicesWithCount] = useState<ConsultationChoiceWithCount[]>([]);
  const [alreadyDoneChoices, setAlreadyDoneChoices] = useState<DoneChoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [creatingConsultation, setCreatingConsultation] = useState(false);
  const choicesFetchedRef = useRef(false);

  // Charger les données utilisateur
  useEffect(() => {
    async function fetchUser() {
      if (user?._id) {
        try {
          const res = await api.get(`/users/me`);
          setUserData(res.data);
        } catch (err) {
          console.error('Erreur chargement utilisateur:', err);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
    }
    fetchUser();
  }, [user?._id]);

  // Charger les choix avec compteurs et consultations déjà faites
  useEffect(() => {
    async function fetchChoicesAndDone() {
      if (choicesFetchedRef.current) return;
      choicesFetchedRef.current = true;

      try {
        if (user?._id && rubrique?._id) {
          // Utiliser l'API optimisée qui retourne les choix avec compteurs
          const rubriqueWithCount = await getRubriqueWithConsultationCount(rubrique._id, user._id);

          // Convertir en format ConsultationChoice pour compatibilité
          const arr = rubriqueWithCount.consultationChoices.map(choice => ({
            _id: choice._id,
            title: choice.title,
            description: choice.description,
            frequence: choice.frequence as any,
            participants: choice.participants as any,
            offering: choice.offering,
            order: choice.order
          }));

          setChoices(arr);
          setChoicesWithCount(rubriqueWithCount.consultationChoices);

          console.log('📋 Loaded', arr.length, 'choices with counts');
        } else if (rubrique?.consultationChoices) {
          // Fallback: utiliser les choix déjà dans la rubrique
          setChoices(rubrique.consultationChoices);
        }
      } catch (err) {
        console.error('[Choices] ❌', err);
        setApiError('Erreur lors du chargement des choix');
      } finally {
        setLoading(false);
      }

      // Récupérer les consultations déjà faites
      if (user?._id) {
        try {
          const res = await api.get(`/user-consultation-choices?userId=${user._id}`);
          if (Array.isArray(res.data)) {
            setAlreadyDoneChoices(res.data);
            console.log('✅ Found', res.data.length, 'already done consultations');
          } else {
            setAlreadyDoneChoices([]);
          }
        } catch (err) {
          console.error('[AlreadyDoneChoices] ❌', err);
          setAlreadyDoneChoices([]);
        }
      }
    }
    fetchChoicesAndDone();
  }, [user?._id, rubrique?._id, rubrique?.consultationChoices]);

  const handleSelectConsultation = useCallback(
    async (choice: ConsultationChoice) => {
      setApiError(null);
      setCreatingConsultation(true);

      if (!userData) {
        setApiError("Chargement des données utilisateur en cours, veuillez patienter.");
        setCreatingConsultation(false);
        return;
      }

      // Store the selected choice and rubrique in sessionStorage
      sessionStorage.setItem("selectedChoiceId", choice._id || "");
      sessionStorage.setItem("categoryId", categoryId);
      sessionStorage.setItem("rubriqueId", rubrique._id || "");

      console.log('👉 Selected choice:', choice.title);
      console.log('🔍 Participants:', choice.participants);
      console.log('💾 Stored in sessionStorage:', { selectedChoiceId: choice._id, categoryId, rubriqueId: rubrique._id });

      // Check if this choice requires a form (AVEC_TIERS)
      if (choice.participants === 'AVEC_TIERS') {
        console.log('📝 Requires form, navigating to form page...');
        setCreatingConsultation(false);
        router.push(`/secured/category/${categoryId}/form`);
        return;
      }

      // If no form needed, navigate directly to form which will handle the consultation creation
      console.log('⚡ No form required, navigating to form page for automatic creation...');
      setCreatingConsultation(false);
      router.push(`/secured/category/${categoryId}/form`);
    },
    [categoryId, rubrique._id, router, userData]
  );


   const getChoiceCount = (choiceId?: string) => {
    if (!choiceId) return 0;
    
    // Si on a les données du backend, les utiliser
    if (choicesWithCount) {
      const choiceData = choicesWithCount.find(c => c._id === choiceId);
      return choiceData?.consultationCount || 0;
    }
    
    // Sinon calcul manuel (fallback)
    return alreadyDoneChoices.filter(dc => dc.choiceId === choiceId).length;
  };

  // Handler pour voir l'historique (redirige vers la dernière consultation)
  const handleViewHistory = (choiceId?: string) => {
    if (!choiceId) return;
    const lastDone = alreadyDoneChoices
      .filter(dc => dc.choiceId === choiceId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
    
    if (lastDone) {
      window.location.href = `/secured/consultations/${lastDone.consultationId}`;
    }
  };

  return {
    choices,
    choicesWithCount,
    alreadyDoneChoices,
    loading,
    apiError,
    creatingConsultation,
    handleSelectConsultation,
    getChoiceCount,
    handleViewHistory,
  };
}
