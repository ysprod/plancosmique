"use client";

import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Sparkles } from "lucide-react";
import InputField from "./InputField";
 

type CityItem = {
  id: string;
  name: string;        // affichage principal (ville)
  countryName?: string; // affichage secondaire (pays)
  countryCode?: string; // optionnel
  region?: string;      // optionnel (state/region)
};

// Petites variantes légères (éviter blur/height:auto en liste)
const dropdownVariants = {
  initial: { opacity: 0, y: 6, scale: 0.995 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.14 } },
  exit: { opacity: 0, y: 6, scale: 0.995, transition: { duration: 0.12 } },
};

const rowVariants = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.12 } },
};

function cx(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}

/**
 * API attendue (adaptable) :
 * - CITY_API_URL/search?query=abidjan&country=CI&limit=8
 * Retour JSON flexible : on "normalise" au mieux dans parseCities()
 */
function parseCities(raw: any): CityItem[] {
  const arr = Array.isArray(raw) ? raw : raw?.data ?? raw?.results ?? raw?.items ?? [];
  if (!Array.isArray(arr)) return [];

  return arr
    .map((x: any): CityItem | null => {
      const id = String(x.id ?? x._id ?? x.geonameId ?? x.cityId ?? x.place_id ?? x.name ?? "");
      const name = String(x.name ?? x.city ?? x.toponymName ?? x.label ?? "");
      if (!id || !name) return null;

      return {
        id,
        name,
        countryName: x.countryName ?? x.country ?? x.country_name ?? x.country?.name,
        countryCode: x.countryCode ?? x.country_code ?? x.country?.code,
        region: x.region ?? x.adminName1 ?? x.state,
      };
    })
    .filter(Boolean) as CityItem[];
}

export type CitySelectValue = {
  cityId?: string;
  cityName: string;
  // si tu veux remonter le pays automatiquement :
  countryName?: string;
  countryCode?: string;
};

interface CitySelectFieldProps {
  id: string;
  label: string;
  value: string;
  countryValue?: string; // pays sélectionné (optionnel)
  placeholder?: string;

  // API
  cityApiUrl: string; // process.env.NEXT_PUBLIC_CITY_API_URL côté parent
  cityApiKey?: string; // optionnel
  limit?: number;

  // callbacks
  onChangeText: (nextValue: string) => void;                // quand l’utilisateur tape
  onSelectCity: (selected: CitySelectValue) => void;        // quand il choisit une suggestion

  // affichage / validation
  error?: string;
  disabled?: boolean;

  // fallback local si API KO (optionnel)
  fallbackCities?: Array<{ name: string; countryName?: string }>;
}

function CitySelectFieldBase({
  id,
  label,
  value,
  countryValue,
  placeholder = "Rechercher une ville…",
  cityApiUrl,
  cityApiKey,
  limit = 8,
  onChangeText,
  onSelectCity,
  error,
  disabled,
  fallbackCities = [],
}: CitySelectFieldProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<CityItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [netError, setNetError] = useState<string | null>(null);

  // refs anti-jank
  const abortRef = useRef<AbortController | null>(null);
  const lastQueryRef = useRef<string>("");
  const rootRef = useRef<HTMLDivElement | null>(null);

  const query = value.trim();

  const hasQuery = query.length >= 2;
  const showDropdown = open && (loading || netError || items.length > 0 || (hasQuery && items.length === 0));

  // dataset fallback filtré (si API KO)
  const fallbackFiltered = useMemo(() => {
    if (!fallbackCities.length || !hasQuery) return [];
    const q = query.toLowerCase();
    return fallbackCities
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, limit)
      .map((c, idx) => ({
        id: `fallback_${idx}_${c.name}`,
        name: c.name,
        countryName: c.countryName,
      }));
  }, [fallbackCities, hasQuery, limit, query]);

  const pickCity = useCallback(
    (c: CityItem) => {
      onSelectCity({
        cityId: c.id,
        cityName: c.name,
        countryName: c.countryName,
        countryCode: c.countryCode,
      });
      setOpen(false);
    },
    [onSelectCity]
  );

  // click outside => close
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // fetch debounced + abort
  useEffect(() => {
    if (!open) return;
    if (!hasQuery) {
      setItems([]);
      setLoading(false);
      setNetError(null);
      return;
    }

    const qKey = `${query}__${countryValue ?? ""}`.toLowerCase();
    lastQueryRef.current = qKey;

    setLoading(true);
    setNetError(null);

    const t = window.setTimeout(async () => {
      // abort prev
      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;

      try {
        const url = new URL(cityApiUrl);
        // chemins flexibles : si cityApiUrl est déjà un endpoint, tu peux passer .../search
        // Ici on assume que c'est un endpoint "search" ou qu'il supporte query param.
        url.searchParams.set("query", query);
        url.searchParams.set("limit", String(limit));
        if (countryValue) url.searchParams.set("country", countryValue);

        const res = await fetch(url.toString(), {
          method: "GET",
          signal: ac.signal,
          headers: {
            ...(cityApiKey ? { Authorization: `Bearer ${cityApiKey}` } : null),
          } as any,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        // si la requête est obsolète, ignorer
        if (lastQueryRef.current !== qKey) return;

        const parsed = parseCities(json);
        setItems(parsed);
        setLoading(false);
        setNetError(null);
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        // fallback local si dispo
        if (fallbackFiltered.length) {
          setItems(fallbackFiltered);
          setLoading(false);
          setNetError(null);
          return;
        }
        setItems([]);
        setLoading(false);
        setNetError("Impossible de charger les villes. Vérifie ta connexion puis réessaie.");
      }
    }, 250); // debounce = 250ms (réactif mobile)

    return () => window.clearTimeout(t);
  }, [cityApiUrl, cityApiKey, countryValue, fallbackFiltered, hasQuery, limit, open, query]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Enter") {
        // si une seule suggestion, on auto-sélectionne (UX mobile)
        if (items.length === 1) pickCity(items[0]);
      }
    },
    [items, pickCity]
  );

  return (
    <div ref={rootRef} className="w-full">
      <div className="mx-auto w-full max-w-xl text-center">
        <div className="relative">
          <InputField
            label={label}
            name={id}
            value={value}
            onChange={(e: any) => {
              onChangeText(e?.target?.value ?? "");
              setOpen(true);
            }}
            placeholder={placeholder}
          />

          {/* petit indicateur à droite */}
          <div className="pointer-events-none absolute right-3 top-[42px] hidden sm:block">
            <Sparkles className={cx("h-4 w-4", "text-slate-300 dark:text-zinc-600")} />
          </div>
        </div>

        <AnimatePresence>
          {showDropdown && (
            <motion.div
              variants={dropdownVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={cx(
                "mx-auto mt-2 w-full max-w-xl overflow-hidden rounded-2xl border text-left shadow-sm",
                "border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
              )}
              role="listbox"
              id={`${id}-city-listbox`}
              aria-label="Suggestions de villes"
            >
              <div className="px-3 py-2 text-xs text-slate-500 dark:text-zinc-400">
                {loading ? "Recherche en cours…" : netError ? "Erreur" : items.length ? "Suggestions" : "Aucun résultat"}
              </div>

              {netError && (
                <div className="flex items-start gap-2 px-3 pb-3 text-sm text-rose-700 dark:text-rose-300">
                  <AlertCircle className="mt-0.5 h-4 w-4" />
                  <span>{netError}</span>
                </div>
              )}

              {!netError && !loading && items.length === 0 && hasQuery && (
                <div className="px-3 pb-3 text-sm text-slate-600 dark:text-zinc-300">
                  Aucun résultat pour “{query}”.
                </div>
              )}

              {!netError && items.length > 0 && (
                <ul className="max-h-64 overflow-auto pb-2">
                  {items.slice(0, limit).map((c) => {
                    const secondary = [c.region, c.countryName].filter(Boolean).join(" • ");
                    return (
                      <motion.li key={c.id} variants={rowVariants} initial="initial" animate="animate">
                        <button
                          type="button"
                          onClick={() => pickCity(c)}
                          className={cx(
                            "w-full px-3 py-2 text-left",
                            "transition-colors",
                            "hover:bg-slate-50 dark:hover:bg-zinc-900",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 dark:focus-visible:ring-violet-900/40"
                          )}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <div className="truncate text-sm font-extrabold text-slate-900 dark:text-white">
                                {c.name}
                              </div>
                              {secondary && (
                                <div className="truncate text-xs text-slate-500 dark:text-zinc-400">{secondary}</div>
                              )}
                            </div>
                            <span
                              className={cx(
                                "shrink-0 rounded-full px-2 py-1 text-[11px] font-bold",
                                "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-200"
                              )}
                            >
                              Choisir
                            </span>
                          </div>
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* erreur de validation (celle de ton formulaire) */}
        {error && (
          <div className="mx-auto mt-2 max-w-xl text-left text-sm text-rose-700 dark:text-rose-300">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export const CitySelectField = memo(CitySelectFieldBase);
