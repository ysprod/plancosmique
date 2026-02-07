"use client";
import { analysesService } from "@/lib/api/services/analyses.service";
import { useCallback, useEffect, useRef, useState } from "react";

export interface AnalysisByChoiceResponse {
  success: boolean;
  choiceId: string;
  userId: string;
  total: number;
  analyses: any[];
}

type UseAnalysesByChoiceState = {
  loading: boolean;
  error: string | null;
};

const initialState: UseAnalysesByChoiceState = {
  loading: true,
  error: null,
};

export function useAnalysesByChoice(choiceId: string | null) {
  const reqSeqRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  const [state, setState] = useState<UseAnalysesByChoiceState>(initialState);
  const [data, setData] = useState<AnalysisByChoiceResponse | null>(null);

  const loadAnalyses = useCallback(async () => {
    if (!choiceId) {
      setState({ loading: false, error: "choiceId manquant" });
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const mySeq = ++reqSeqRef.current;

    setState({ loading: true, error: null });

    try {
      const response = await analysesService.getByChoice(choiceId);

      if (reqSeqRef.current !== mySeq) return;

      if (response?.success) {
        setData(response);
        setState({ loading: false, error: null });
      } else {
        setState({ loading: false, error: "Erreur lors de la récupération des analyses" });
      }
    } catch (err: any) {
      const name = err?.name;
      if (name === "CanceledError" || name === "AbortError") return;
      if (reqSeqRef.current !== mySeq) return;

      setState({
        loading: false,
        error: err?.message || "Impossible de récupérer les analyses",
      });
    }
  }, [choiceId]);

  useEffect(() => {
    void loadAnalyses();
    return () => {
      abortRef.current?.abort();
    };
  }, [loadAnalyses]);

  return {
    loading: state.loading,
    error: state.error,
    data,
    total: data?.total ?? 0,
    analyses: data?.analyses ?? [],
  };
}
