"use client";
import React, { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { Star, BookOpen } from "lucide-react";

type Props = {
  aspectsTexte?: string | null;
  markdown?: string | null; // compatibilité descendante
  title?: string;
};


const SYMBOL_MAP: Record<string, string> = {
  soleil: "☉",
  lune: "☾",
  mercure: "☿",
  vénus: "♀",
  venus: "♀",
  mars: "♂",
  jupiter: "♃",
  saturne: "♄",
  uranus: "♅",
  neptune: "♆",
  pluton: "♇",

  "noeud nord": "☊",
  "nœud nord": "☊",
  "noeud sud": "☋",
  "nœud sud": "☋",
  "lilith": "⚸",
  "lune noire": "⚸",
  "part de fortune": "⊗",
  "fortune": "⊗",
  "vertex": "Vx",
  "ascendant": "ASC",
  "descendant": "DSC",
  "milieu du ciel": "MC",
  "fond du ciel": "IC",

  "chiron": "⚷",
  "ceres": "⚳",
  "pallas": "⚴",
  "junon": "⚵",
  "juno": "⚵",
  "vesta": "⚶",
};

const normalizeKey = (s: string) =>
  s.trim().toLowerCase().normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

// Pré-calc des clés triées (anti-rerenders)
const SYMBOL_KEYS_SORTED = Object.keys(SYMBOL_MAP).sort((a, b) => b.length - a.length).map(normalizeKey);

const getSymbolPrefixForLine = (line: string): string | null => {
  const s = line.trim();
  if (!s) return null;

  const lowered = normalizeKey(s);

  for (let i = 0; i < SYMBOL_KEYS_SORTED.length; i++) {
    const k = SYMBOL_KEYS_SORTED[i];
    if (lowered.startsWith(k)) {
      const originalKey = Object.keys(SYMBOL_MAP).find((ok) => normalizeKey(ok) === k);
      const sym = originalKey ? SYMBOL_MAP[originalKey] : null;
      return sym ? sym : null;
    }
  }
  return null;
};

const splitLinesPreserve = (text: string) => text.split(/\r?\n/);

const enhanceMarkdownWithSymbols = (md: string): string => {
   const lines = splitLinesPreserve(md);

  let inCodeBlock = false;

  const out = lines.map((line) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      return line;
    }
    if (inCodeBlock) return line;

    const m = /^(\s*[-*•]\s+)(.+)$/.exec(line);
    if (m) {
      const [, bullet, content] = m;
      const sym = getSymbolPrefixForLine(content);
      if (!sym) return line;

      // Évite double préfixe si déjà présent
      if (content.startsWith(sym)) return line;

      return `${bullet}${sym} ${content}`;
    }

    // détecte une ligne "Astre ..." non-listée (ex: inventaires)
    // On ne modifie pas les titres markdown (#, ##) ni les lignes vides
    if (
      trimmed &&
      !trimmed.startsWith("#") &&
      !trimmed.startsWith(">") &&
      !trimmed.startsWith("|") // tables markdown
    ) {
      const sym = getSymbolPrefixForLine(trimmed);
      if (!sym) return line;
      if (trimmed.startsWith(sym)) return line;

      // On respecte l'indentation initiale
      const indent = line.match(/^\s*/)?.[0] ?? "";
      return `${indent}${sym} ${trimmed}`;
    }

    return line;
  });

  return out.join("\n");
};

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const markdownComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      className={cx(
        "mt-10 mb-4 scroll-mt-24",
        "text-base sm:text-lg font-semibold tracking-tight",
        "text-slate-900 dark:text-white",
        "flex items-center justify-center gap-2 text-center"
      )}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      {...props}
      className={cx(
        "mt-8 mb-3 scroll-mt-24",
        "text-sm sm:text-base font-semibold",
        "text-slate-900 dark:text-white/95",
        "text-center"
      )}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      className={cx(
        "my-3 leading-relaxed",
        "text-[14px] sm:text-sm",
        "text-slate-700 dark:text-slate-200/90",
        "text-center"
      )}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className={cx("my-4 space-y-2", "mx-auto max-w-[52ch]")} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      {...props}
      className={cx(
        "flex items-start gap-2",
        "text-[14px] sm:text-sm",
        "text-slate-700 dark:text-slate-200/90"
      )}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} className="font-semibold text-slate-900 dark:text-white" />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className={cx(
        "rounded-md px-1.5 py-0.5",
        "bg-black/5 dark:bg-white/10",
        "text-[14px] font-mono",
        "text-slate-800 dark:text-slate-100"
      )}
    />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr {...props} className="my-8 border-white/10 dark:border-white/10 border-slate-200/60" />
  ),
};

export const AspectsMarkdown = memo(function AspectsMarkdown({
  aspectsTexte,
  markdown,
  title = "Aspects astrologiques",
}: Props) {
  // Priorité à aspectsTexte, fallback sur markdown (pour compatibilité)
  const safeMarkdown = aspectsTexte ?? markdown ?? "";

  // Enrichissement symboles: useMemo pour ne recalculer que si markdown change
  const enhanced = useMemo(() => {
    if (!safeMarkdown.trim()) return "";
    return enhanceMarkdownWithSymbols(safeMarkdown);
  }, [safeMarkdown]);

  return (
    <div className="w-full flex justify-center max-w-6xl px-3 sm:px-4">
      <div
        className={cx(
          "w-full",
          "bg-white",
          "overflow-hidden"
        )}
      >
        <div
          className={cx(
            "px-4 sm:px-6 py-4",
            "border-b border-slate-200/60 dark:border-white/10",
            "bg-gradient-to-b from-white/70 to-white/40 dark:from-white/[0.06] dark:to-transparent"
          )}
        >
          <div className="flex items-center justify-center gap-2">
            <Star className="h-4 w-4 text-cosmic-purple dark:text-cosmic-pink" />
            <h2 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white text-center">
              {title}
            </h2>
          </div>
        </div>
        <div className="px-4 sm:px-6 py-5">
          {!enhanced.trim() ? (
            <div className="py-10 flex flex-col items-center justify-center text-center">
              <div className="h-10 w-10 rounded-2xl bg-black/5 dark:bg-white/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-slate-700 dark:text-slate-200" />
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300/80">
                Aucun contenu d’aspects à afficher.
              </p>
            </div>
          ) : (
            <div
              className={cx(
                "prose prose-slate dark:prose-invert",
                "max-w-none",
                "prose-p:my-3 prose-ul:my-4",
                "prose-h2:mt-10 prose-h3:mt-8",
                "prose-hr:my-8"
              )}
            >
              <ReactMarkdown components={markdownComponents as any}>
                {enhanced}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
