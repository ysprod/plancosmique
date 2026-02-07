"use client";
import { useConsultationFormGroupe } from "@/hooks/vie-personnelle/useConsultationFormGroupe";
import { Plus, Trash2 } from "lucide-react";
import { memo, useCallback, useMemo } from "react";
import { FormActionsGroupe } from "./FormActionsGroupe";
import { FormBackgroundOrbs } from "./FormBackgroundOrbs";
import { FormErrorMessage } from "./FormErrorMessage";
import { FormFieldsGroupe } from "./FormFieldsGroupe";
import { FormHeader } from "./FormHeader";

type TierceItem = {
  id: string;
  nom?: string;
  prenoms?: string;
  dateNaissance?: string;
  villeNaissance?: string;
};

type ConsultationFormProps = {
  form: any;
  errors: Record<string, string | undefined>;
  handleChange: (e: any) => void;
  apiError?: string | null;
  handleSubmit: (e: any) => void;
  resetSelection: () => void;
  tiercesList?: TierceItem[];
  showAddMore?: boolean;
  setShowAddMore?: (show: boolean) => void;
  handleAddTierce?: () => void;
  handleRemoveTierce?: (id: string) => void;
  maxTierces?: number;
  isFormValid?: boolean;
  successMessage?: string | null;
};

const ConsultationFormGroupe = memo(function ConsultationFormGroupe({
  form,
  errors,
  handleChange,
  apiError,
  handleSubmit,
  resetSelection,
  tiercesList = [],
  showAddMore = false,
  setShowAddMore = () => { },
  handleAddTierce = () => { },
  handleRemoveTierce = () => { },
  maxTierces = 10,
  isFormValid = false,
  successMessage = null,
}: ConsultationFormProps) {
  const {
    countryOptions,
    onChangeField,
    cityApiUrl,
    cityApiKey,
    handleCitySelect,
  } = useConsultationFormGroupe(form, handleChange);

  const hasTierces = tiercesList.length > 0;
  const canAddMore = tiercesList.length < maxTierces;

  // ✅ dérivé UI: afficher le formulaire si on est en mode ajout OU si aucune tierce encore
  const showTierceForm = showAddMore || !hasTierces;

  const handleAddTierceWrapper = useCallback(async (): Promise<boolean> => {
    const result = handleAddTierce();
    return typeof result === 'boolean' ? result : false;
  }, [handleAddTierce]);

  const onClickAddMore = useCallback(() => setShowAddMore(true), [setShowAddMore]);
  const onClickCancelAddMore = useCallback(() => setShowAddMore(false), [setShowAddMore]);

  const onRemove = useCallback(
    (id: string) => handleRemoveTierce(id),
    [handleRemoveTierce],
  );

  const tiercesCountLabel = useMemo(
    () => `Personnes tierces enregistrées (${tiercesList.length})`,
    [tiercesList.length],
  );

  return (
    <div className="relative mx-auto w-full max-w-2xl px-3 py-4 sm:px-4">
      <FormBackgroundOrbs />

      <div className="relative mx-auto w-full rounded-2xl border border-purple-200/50 dark:border-purple-800/30 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/20 dark:from-gray-900 dark:via-purple-950/30 dark:to-blue-950/20 p-4 sm:p-6 shadow-xl backdrop-blur-sm">
        <FormHeader />
          {apiError ? <FormErrorMessage message={apiError} /> : null}
          {hasTierces && (
            <div className="mb-6 rounded-lg border border-purple-200/30 bg-purple-50/30 p-4 dark:border-purple-800/30 dark:bg-purple-950/20">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-100">
                  {tiercesCountLabel}
                </h3>

                <div className="text-[11px] text-purple-700/80 dark:text-purple-200/70">
                  {maxTierces ? `${tiercesList.length}/${maxTierces}` : null}
                </div>
              </div>

              <div className="mt-3 space-y-2">              
                  {tiercesList.map((tierce) => (
                    <div
                      key={tierce.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-purple-100/50 bg-white/50 p-3 dark:border-purple-900/30 dark:bg-gray-800/50"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                          {(tierce.prenoms || "").trim()} {(tierce.nom || "").trim()}
                        </p>
                        <p className="truncate text-xs text-gray-600 dark:text-gray-400">
                          {tierce.dateNaissance ? (
                            <>
                              Né(e) le {tierce.dateNaissance}
                              {tierce.villeNaissance ? ` à ${tierce.villeNaissance}` : ""}
                            </>
                          ) : (
                            "Informations de naissance"
                          )}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemove(tierce.id)}
                        className="shrink-0 rounded-lg p-2 text-red-600 transition-colors hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30"
                        title="Supprimer cette personne"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}               
              </div>

              {!canAddMore && (
                <p className="mt-3 text-xs text-amber-700 dark:text-amber-300/90">
                  Limite atteint : {maxTierces} personnes maximum.
                </p>
              )}
            </div>
          )}
  
          {successMessage && (
            <div className="mb-4 rounded-lg border border-green-200/30 bg-green-50/50 p-3 text-center text-sm font-medium text-green-700 dark:border-green-800/30 dark:bg-green-950/20 dark:text-green-300">
              {successMessage}
            </div>
          )}
     
        <form onSubmit={handleSubmit} className="mx-auto mt-6 w-full max-w-xl space-y-3.5">
      
            {!showAddMore && hasTierces && canAddMore && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={onClickAddMore}
                  className="mx-auto inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-2 font-medium text-white transition-all hover:shadow-lg"
                >
                  <Plus className="h-4 w-4" />
                  Ajouter une autre personne
                </button>
              </div>
            )}
             
            {showTierceForm && (
              <div>
                {hasTierces && (
                  <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Ajouter une nouvelle personne
                  </h3>
                )}

                <FormFieldsGroupe
                  form={form}
                  errors={errors}
                  handleChange={handleChange}
                  countryOptions={countryOptions}
                  cityApiUrl={cityApiUrl}
                  cityApiKey={cityApiKey}
                  onChangeField={onChangeField}
                  handleCitySelect={handleCitySelect}
                />

                <div className="mt-4 flex gap-3">
                  {hasTierces ? (
                    <>
                      <button
                        type="button"
                        onClick={handleAddTierce}
                        disabled={!canAddMore || !isFormValid}
                        className="flex-1 rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Ajouter cette personne
                      </button>
                      <button
                        type="button"
                        onClick={onClickCancelAddMore}
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        Annuler
                      </button>
                    </>
                  ) : (
                    <FormActionsGroupe
                      onSubmit={handleSubmit}
                      onCancel={resetSelection}
                      onSaveTierces={handleAddTierceWrapper}
                      hasTierces={hasTierces}
                    />
                  )}
                </div>
              </div>
            )}
    
          {/* Bouton final: soumettre si des tierces existent et qu’on n’est pas en mode ajout */}
          {hasTierces && !showAddMore && (
            <FormActionsGroupe
              onSubmit={handleSubmit}
              onCancel={resetSelection}
              hasTierces={hasTierces}
            />
          )}
        </form>
      </div>
    </div>
  );
});

export default ConsultationFormGroupe;