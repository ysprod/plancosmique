"use client";
import { useAuth } from "@/hooks/lib/useAuth";
import { api } from "@/lib/api/client";
import { mapFormDataToBackend } from "@/lib/functions";
import type { ConsultationChoice, EnrichedChoice, Rubrique } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { memo, useCallback, useMemo, useState } from "react";
import { RubriqueConsultationGrid } from "./RubriqueConsultationGrid";
import RubriqueHeader from "./RubriqueHeader";

interface RubriqueViewMultiPageProps {
  rubrique: Rubrique;
  categoryId: string;
}

const extractEnrichedChoices = (consultationChoices: any[]): EnrichedChoice[] => {
  return consultationChoices.map((item: any) => {
    return item as EnrichedChoice;
  });
};

export const RubriqueViewMultiPage = memo<RubriqueViewMultiPageProps>(
  function RubriqueViewMultiPage({ rubrique, categoryId }) {



    const router = useRouter();
    const { user } = useAuth();
 

    const enrichedChoices = useMemo(() => {
      if (!rubrique || !rubrique.consultationChoices) return [];
      return extractEnrichedChoices(rubrique.consultationChoices);
    }, [rubrique && rubrique.consultationChoices]);

    const sortedChoices = useMemo(() =>
      [...enrichedChoices].sort((a, b) => {
        // Defensive: avoid undefined .choice
        const aOrder = a && a.choice && typeof a.choice.order === 'number' ? a.choice.order : 999;
        const bOrder = b && b.choice && typeof b.choice.order === 'number' ? b.choice.order : 999;
        return aOrder - bOrder;
      }),
      [enrichedChoices]
    );

    const stats = useMemo(() => {
      const total = sortedChoices.length;
      const consulted = sortedChoices.filter(c => c.status.buttonStatus !== 'CONSULTER').length;
      const pending = sortedChoices.filter(c => c.status.buttonStatus === 'RÉPONSE EN ATTENTE').length;
      const completed = sortedChoices.filter(c => c.status.buttonStatus === "VOIR L'ANALYSE").length;
      return { total, consulted, pending, completed };
    }, [sortedChoices]);

    const handleSelectConsultation = useCallback(
      async (choice: ConsultationChoice) => {


        const enrichedChoice = enrichedChoices.find(
          ec => (ec.choice._id) === (choice._id)
        );

        if (enrichedChoice?.status?.consultationId) {
          alert('📋 Consultation existante détectée, redirection directe...');
       
          router.push(`/star/category/${categoryId}/consulter?consultationId=${enrichedChoice.status.consultationId}`);
          return;
        }

        sessionStorage.setItem("selectedChoiceId", choice._id || "");
        sessionStorage.setItem("categoryId", categoryId);
        sessionStorage.setItem("rubriqueId", rubrique._id || "");

        const participants = choice.participants;

        if (participants === 'SOLO') {
          if (!user) {
            console.error('❌ Utilisateur non connecté');       
            return;
          }

          try {
            const mappedFormData = mapFormDataToBackend(user);

            const payload = {
              serviceId: process.env.NEXT_PUBLIC_SERVICE_ID,
              type: rubrique.typeconsultation,
              title: choice.title || 'Consultation',
              formData: mappedFormData,
              description: choice.description || '',
              status: 'PENDING',
              alternatives: choice.offering?.alternatives || [],
              choice: choice,
            };

            const response = await api.post('/consultations', payload);
            const id = response.data?.id || response.data?.consultationId || response.data?._id;

            if (id) {
              sessionStorage.removeItem('selectedChoiceId');
              router.push(`/star/category/${categoryId}/consulter?consultationId=${id}`);
            } else {
              throw new Error('ID de consultation manquant dans la réponse');
            }
          } catch (error: any) {
            console.error('❌ Erreur création consultation SOLO:', error);
                     router.push(`/star/category/${categoryId}/form`);
          }
        } else if (participants === 'AVEC_TIERS') {   
          router.push(`/star/category/${categoryId}/form`);
        } else {      
          router.push(`/star/category/${categoryId}/form`);
        }
      },
      [categoryId, rubrique._id, rubrique.typeconsultation, router, enrichedChoices, user]
    );

    // if (loading || creatingConsultation) {
    //   return (
    //     <div className="relative mx-auto max-w-4xl">
    //       <RubriqueHeader rubrique={rubrique} />
    //       <RubriqueLoadingState isCreating={creatingConsultation} />
    //     </div>
    //   );
    // }

    // if (apiError) {
    //   return (
    //     <div className="relative mx-auto max-w-4xl">
    //       <RubriqueHeader rubrique={rubrique} />
    //       <RubriqueErrorDisplay error={apiError} />
    //     </div>
    //   );
    // }

    return (
      <div className="relative mx-auto max-w-8xl px-3 sm:px-4 lg:px-6">
        <RubriqueHeader rubrique={rubrique} />
        {/* <RubriqueConsultationGrid
          sortedChoices={sortedChoices}
          onSelectConsultation={handleSelectConsultation}
        /> */}
      </div>
    );
  }
);