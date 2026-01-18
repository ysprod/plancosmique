"use client";
import { useRubriqueDerived } from "@/hooks/commons/useRubriqueDerived";
import type { ConsultationChoice, Rubrique, DoneChoice } from "@/lib/interfaces";
import { usePathname, useRouter } from "next/navigation";
import { memo, useCallback, useMemo, useState, useEffect, useRef } from "react";
import { getRubriqueWithConsultationCount, ConsultationChoiceWithCount } from "@/lib/api/services/rubriques.service";
import { api } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/AuthContext";
import Slide4SectionSelection from "../vie-personnelle/Slide4SectionSelection";
import RubriqueHeader from "./RubriqueHeader";

interface RubriqueViewMultiPageProps {
  rubrique: Rubrique;
  categoryId: string;
}

export const RubriqueViewMultiPage = memo<RubriqueViewMultiPageProps>(
  function RubriqueViewMultiPage({ rubrique, categoryId }) {
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useAuth();
    const derived = useRubriqueDerived(rubrique);
    
    const [choices, setChoices] = useState<ConsultationChoice[]>([]);
    const [choicesWithCount, setChoicesWithCount] = useState<ConsultationChoiceWithCount[]>([]);
    const [alreadyDoneChoices, setAlreadyDoneChoices] = useState<DoneChoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState<string | null>(null);
    const choicesFetchedRef = useRef(false);

    // Charger les choix avec compteurs et consultations déjà faites (pattern useSlide4Section)
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
      (choice: ConsultationChoice) => {
        // Store the selected choice and rubrique in sessionStorage
        sessionStorage.setItem("selectedChoiceId", choice._id || "");
        sessionStorage.setItem("categoryId", categoryId);
        sessionStorage.setItem("rubriqueId", rubrique._id || "");

        console.log('👉 Selected choice:', choice.title);
        console.log('💾 Stored in sessionStorage:', { selectedChoiceId: choice._id, categoryId, rubriqueId: rubrique._id });

        // Navigate to form page
        router.push(`/secured/category/${categoryId}/form`);
      },
      [categoryId, rubrique._id, router]
    );

    return (
      <div className="relative mx-auto max-w-4xl">
        <RubriqueHeader title={derived.title} description={derived.desc} />
        
        {apiError && (
          <div className="mt-4 p-4 rounded-xl bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50 text-red-700 dark:text-red-300">
            <p className="text-sm font-medium">{apiError}</p>
          </div>
        )}
        
        {loading ? (
          <div className="mt-6 flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">Chargement des consultations...</p>
            </div>
          </div>
        ) : (
          <div className="max-w-8xl mx-auto mt-6">
            <Slide4SectionSelection
              onSelect={handleSelectConsultation}
              choices={choices}
              alreadyDoneChoices={alreadyDoneChoices}
              choicesWithCount={choicesWithCount}
            />
          </div>
        )}
      </div>
    );
  }
);