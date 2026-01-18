import { api } from '@/lib/api/client';
import { getUserChoicesStatus, ConsultationChoiceStatusDto } from '@/lib/api/services/consultation-status.service';
import { useAuth } from '@/lib/auth/AuthContext';
import type { ConsultationChoice, Rubrique } from '@/lib/interfaces';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useRubriqueSelection(rubrique: Rubrique, categoryId: string) {
    const router = useRouter();
    const { user } = useAuth();

    const [choices, setChoices] = useState<ConsultationChoice[]>([]);
    const [choiceStatuses, setChoiceStatuses] = useState<Map<string, ConsultationChoiceStatusDto>>(new Map());
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

    // Charger les choix et leurs statuts
    useEffect(() => {
        async function fetchChoicesAndStatuses() {
            if (choicesFetchedRef.current) return;
            choicesFetchedRef.current = true;

            try {
                setLoading(true);
                
                // Récupérer les choix de la rubrique
                if (rubrique?.consultationChoices) {
                    setChoices(rubrique.consultationChoices);

                    // Si l'utilisateur est connecté, récupérer les statuts
                    if (user?._id) {
                        const choiceIds = rubrique.consultationChoices.map(c => c._id).filter(Boolean) as string[];
                        
                        if (choiceIds.length > 0) {
                            const statusResponse = await getUserChoicesStatus(user._id, choiceIds);
                            
                            // Convertir en Map pour accès rapide
                            const statusMap = new Map<string, ConsultationChoiceStatusDto>();
                            statusResponse.choices.forEach(status => {
                                statusMap.set(status.choiceId, status);
                            });
                            
                            setChoiceStatuses(statusMap);
                            console.log('✅ Loaded statuses for', choiceIds.length, 'choices');
                        }
                    }
                }
            } catch (err) {
                console.error('[Choices] ❌', err);
                setApiError('Erreur lors du chargement des choix');
            } finally {
                setLoading(false);
            }
        }
        fetchChoicesAndStatuses();
    }, [user?._id, rubrique?.consultationChoices]);


    const getEnrichedChoice = (choice: ConsultationChoice) => {
        const status = choiceStatuses.get(choice._id || '');
        
        return {
            choice,
            status: status || {
                choiceId: choice._id || '',
                choiceTitle: choice.title,
                buttonStatus: 'CONSULTER' as const,
                hasActiveConsultation: false,
                consultationId: null,
            },
        };
    };

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


    return {
        choices,
        choiceStatuses,
        loading,
        apiError,
        creatingConsultation,
        handleSelectConsultation,
        getEnrichedChoice,
    };
}
