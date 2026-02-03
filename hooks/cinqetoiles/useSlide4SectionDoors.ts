import { api } from "@/lib/api/client";
import { getRubriqueById } from "@/lib/api/services/rubriques.service";
import { FormData, FormErrors, StepType } from "@/lib/interfaces";
import { useCallback, useEffect, useRef, useState } from "react";

export type ExtendedStepType = StepType | "gold" | "traitement";

export type ProgressStage =
  | "idle"
  | "update_user"
  | "sky_chart"
  | "choices"
  | "consultations"
  | "finalizing"
  | "done"
  | "error";

export type ProgressState = {
  stage: ProgressStage;
  message: string;
  total: number;
  done: number;
  percent: number;
  startedAt: number;
  lastUpdatedAt: number;
  logs: string[];
};

const RUBRIQUE_ID = "694acf59bd12675f59e7a7f2" as const;

const initialForm: FormData = {
  nom: "",
  prenoms: "",
  dateNaissance: "",
  paysNaissance: "",
  villeNaissance: "",
  heureNaissance: "",
  country: "",
  phone: "",
  gender: "",
};

const validateForm = (form: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (!form.nom.trim()) errors.nom = "Nom requis";
  if (!form.prenoms.trim()) errors.prenoms = "Prénoms requis";
  if (!form.dateNaissance) errors.dateNaissance = "Date de naissance requise";
  if (!form.villeNaissance.trim()) errors.villeNaissance = "Ville de naissance requise";
  if (!form.heureNaissance) errors.heureNaissance = "Heure de naissance requise";
  return errors;
};

function makeProgress(total = 0): ProgressState {
  const now = Date.now();
  return {
    stage: "idle",
    message: "Prêt.",
    total,
    done: 0,
    percent: 0,
    startedAt: now,
    lastUpdatedAt: now,
    logs: [],
  };
}

export function useSlide4SectionDoors() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [step, setStep] = useState<ExtendedStepType>("form");
  const [rubrique, setRubrique] = useState<any>(null);
  const [choices, setChoices] = useState<any[]>([]);
  const [loadingRubrique, setLoadingRubrique] = useState(true);
  const [rubriqueError, setRubriqueError] = useState<string | null>(null);
  const [progress, setProgress] = useState<ProgressState>(() => makeProgress(0));
  const progressRafRef = useRef<number | null>(null);

  // Verrou synchrone anti-double submit (ne dépend pas du rerender)
  const submitLockRef = useRef(false);

  // Stocker le dernier résultat sans rerender à chaque itération
  const latestResultRef = useRef<{ consultation?: any; analyse?: any } | null>(null);

  useEffect(() => {
    return () => {
      if (progressRafRef.current) cancelAnimationFrame(progressRafRef.current);
    };
  }, []);

  const setProgressThrottled = useCallback((updater: (p: ProgressState) => ProgressState) => {
    if (typeof window === "undefined") {
      setProgress(updater);
      return;
    }
    if (progressRafRef.current) return;
    progressRafRef.current = window.requestAnimationFrame(() => {
      progressRafRef.current = null;
      setProgress(updater);
    });
  }, []);

  const pushLog = useCallback((line: string) => {
    setProgressThrottled((p) => ({
      ...p,
      logs: [...p.logs, line].slice(-14),
      lastUpdatedAt: Date.now(),
    }));
  }, [setProgressThrottled]);

  // Chargement rubrique + choices
  useEffect(() => {
    let alive = true;
    setLoadingRubrique(true);
    setRubriqueError(null);

    getRubriqueById(RUBRIQUE_ID)
      .then((data) => {
        if (!alive) return;
        setRubrique(data);
        const list = data?.consultationChoices || [];
        setChoices(list);
        setProgress((p) => ({ ...p, total: list.length }));
      })
      .catch((err: any) => {
        if (!alive) return;
        setRubriqueError(err?.message || "Erreur lors du chargement");
      })
      .finally(() => {
        if (!alive) return;
        setLoadingRubrique(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const key = name as keyof FormData;
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });

    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });

    setApiError((prev) => (prev === null ? prev : null));
  }, []);

  const generateAnalysisForChoice = useCallback(
    async (choiceId: string) => {
      const res = await api.post(
        "/consultations/generate-analysis-for-choice",
        { rubriqueId: RUBRIQUE_ID, choiceId }
      );

      latestResultRef.current = {
        consultation: res.data?.consultation,
        analyse: res.data?.analyse,
      };

      return res.data;
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Anti-double submit ultra robuste
      if (submitLockRef.current) return;
      if (step !== "form") return;

      // Rubrique pas prête
      if (loadingRubrique) {
        setApiError("Chargement en cours, veuillez patienter…");
        return;
      }
      if (rubriqueError) {
        setApiError(rubriqueError);
        return;
      }

      // Validation
      const validationErrors = validateForm(form);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setApiError("Veuillez corriger le formulaire");
        return;
      }

      // Choices
      const total = choices.length;
      if (!total) {
        setApiError("Aucun choix de consultation disponible");
        return;
      }

      // Lock immédiat
      submitLockRef.current = true;

      // Passage UI traitement
      setStep("traitement");
      setApiError(null);

      // Init progress
      setProgress(() => {
        const p = makeProgress(total);
        return {
          ...p,
          stage: "update_user",
          message: "Mise à jour de votre profil…",
          percent: 8,
          logs: ["Démarrage du processus"],
        };
      });

      try {
        const userUpdatePayload = {
          ...form,
          country: form.country && form.country.trim() ? form.country : "Côte d’Ivoire",
          dateOfBirth: form.dateNaissance,
          paysNaissance: form.country && form.country.trim() ? form.country : "Côte d’Ivoire",
          premium: true
        };

        await api.patch("/users/me", userUpdatePayload);
        pushLog("Profil mis à jour");
        setProgressThrottled((p) => ({
          ...p,
          stage: "sky_chart",
          message: "Préparation de la carte du ciel…",
          percent: 20,
          lastUpdatedAt: Date.now(),
        }));

        await api.post("/consultations/generate-sky-chart", {});
        pushLog("Carte du ciel générée");
        setProgressThrottled((p) => ({
          ...p,
          stage: "choices",
          message: `Traitement des cartes (${choices.length}/${choices.length})…`,
          percent: 40,
          done: choices.length,
          total: choices.length,
          lastUpdatedAt: Date.now(),
        }));     

        await api.post("/consultations/generate-consultations-for-rubrique", {
          rubriqueId: RUBRIQUE_ID,
        });
        pushLog("Consultations générées");
        setProgressThrottled((p) => ({
          ...p,
          stage: "consultations",
          message: `Traitement des consultations (${choices.length}/${choices.length})…`,
          percent: 70,
          done: choices.length,
          total: choices.length,
          lastUpdatedAt: Date.now(),
        }));

        setProgressThrottled((p) => ({
          ...p,
          stage: "finalizing",
          message: "Finalisation…",
          percent: 90,
          lastUpdatedAt: Date.now(),
          logs: [...p.logs, "Finalisation"].slice(-14),
        }));

        setProgressThrottled((p) => ({
          ...p,
          stage: "done",
          message: "Tout est prêt.",
          percent: 100,
          lastUpdatedAt: Date.now(),
        }));

        setStep("gold");
      } catch (err: any) {
        setProgressThrottled((p) => ({
          ...p,
          stage: "error",
          message: "Erreur pendant la génération.",
          lastUpdatedAt: Date.now(),
          logs: [...p.logs, "Erreur: génération interrompue"].slice(-14),
        }));

        setApiError("Erreur lors de la création");
        setStep("form");
      } finally {
        submitLockRef.current = false;
      }
    },
    [
      step,
      form,
      choices,
      loadingRubrique,
      rubriqueError,
      pushLog,
      setProgressThrottled,
      generateAnalysisForChoice,
    ]
  );

  return {
    form,
    errors,
    apiError,
    step,
    handleChange,
    handleSubmit,

    // data rubrique (si tu l’affiches)
    rubrique,
    choices,
    loading: loadingRubrique,
    error: rubriqueError,

    // progress UI
    progress,

    // (optionnel) si tu veux consommer le dernier résultat final sans rerender pendant la boucle :
    latestResultRef,
  };
}
