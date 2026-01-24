'use client';

import { formatDate } from '@/lib/functions';
import { Consultation } from '@/lib/interfaces';
import { Download } from 'lucide-react';
import React, { useState, useMemo, useCallback } from 'react';


interface NumerologyConsultationCardClientProps {
  consultation: Consultation;
  index?: number;
}


// Mini parser Markdown simple (titres, paragraphes, listes)
type MdBlock =
  | { type: 'h1' | 'h2' | 'h3'; text: string; key: string }
  | { type: 'p'; text: string; key: string }
  | { type: 'li'; text: string; key: string }
  | { type: 'hr'; key: string }
  | { type: 'spacer'; key: string };

function parseMd(md: string): MdBlock[] {
  const lines = (md || '').split('\n');
  const out: MdBlock[] = [];
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i] ?? '';
    const line = raw.trimEnd();
    if (!line.trim()) {
      out.push({ type: 'spacer', key: `sp_${i}` });
      continue;
    }
    if (line === '---') {
      out.push({ type: 'hr', key: `hr_${i}` });
      continue;
    }
    if (line.startsWith('### ')) {
      out.push({ type: 'h3', text: line.replace(/^###\s+/, ''), key: `h3_${i}` });
      continue;
    }
    if (line.startsWith('## ')) {
      out.push({ type: 'h2', text: line.replace(/^##\s+/, ''), key: `h2_${i}` });
      continue;
    }
    if (line.startsWith('# ')) {
      out.push({ type: 'h1', text: line.replace(/^#\s+/, ''), key: `h1_${i}` });
      continue;
    }
    if (line.startsWith('- ')) {
      out.push({ type: 'li', text: line.replace(/^-\s+/, ''), key: `li_${i}` });
      continue;
    }
    out.push({ type: 'p', text: line, key: `p_${i}` });
  }
  return out;
}

const NumerologyConsultationCardClient: React.FC<NumerologyConsultationCardClientProps> = ({ consultation }) => {
  const analyseMd = consultation.analyse?.analyse || consultation.resultData?.analyse || '';
  const blocks = useMemo(() => parseMd(analyseMd), [analyseMd]);
  const [open, setOpen] = useState(true);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  const handleDownload = () => {
    window.open(`/api/consultations/${consultation._id}/download-pdf`, '_blank');
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all max-w-6xl mx-auto">
      <h3 className="text-xl font-bold text-white mb-2">{consultation.titre || consultation.title || 'Analyse Numérologique'}</h3>
      <div className="mb-2 text-purple-200 text-sm">{consultation.description}</div>

      {/* Analyse markdown */}
      <button
        type="button"
        onClick={toggle}
        className="mb-3 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-xs font-extrabold bg-slate-50 text-slate-700 hover:bg-slate-100 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        aria-expanded={open}
        aria-label={open ? 'Réduire l\'analyse' : 'Afficher l\'analyse'}
      >
        {open ? 'Réduire' : 'Afficher'} l’analyse
      </button>
      {open && (
        <div className="rounded-3xl bg-slate-50 p-4 dark:bg-zinc-900/60 mb-4">

          <div className="space-y-2">
            {blocks.map((b) => {
              if (b.type === 'spacer') return <div key={b.key} className="h-2" />;
              if (b.type === 'hr') return <div key={b.key} className="h-px bg-slate-200 dark:bg-zinc-800" />;
              if (b.type === 'h1')
                return <h4 key={b.key} className="text-sm font-black text-slate-900 dark:text-white">{b.text}</h4>;
              if (b.type === 'h2')
                return <h5 key={b.key} className="pt-2 text-sm font-extrabold text-slate-900 dark:text-white">{b.text}</h5>;
              if (b.type === 'h3')
                return <h6 key={b.key} className="pt-2 text-[13px] font-extrabold text-slate-900 dark:text-white">{b.text}</h6>;
              if (b.type === 'li')
                return <div key={b.key} className="flex gap-2 text-sm text-slate-700 dark:text-zinc-200"><span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-500" /><span className="leading-relaxed">{b.text}</span></div>;
              return <p key={b.key} className="text-sm leading-relaxed text-slate-700 dark:text-zinc-200">{b.text}</p>;
            })}
          </div>
        </div>
      )}

      {/* Alternatives */}
      {Array.isArray(consultation.alternatives) && consultation.alternatives.length > 0 && (
        <div className="w-full max-w-6xl  rounded-3xl bg-amber-500/10 p-4 mb-4">
          <div className="font-semibold text-amber-400 mb-1">Offrandes associées :</div>
          <ul className="list-disc ml-6 text-white text-sm">
            {consultation.alternatives.map((alt, i) => (
              <li key={i}>
                <span className="mr-2">{alt.icon || ''}</span>
                {alt.name} <span className="text-xs text-purple-200">x{alt.quantity}</span>
                {alt.description && <span className="ml-2 text-xs text-slate-400">{alt.description}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-600 to-pink-600 hover:shadow-lg text-white rounded-xl transition-all font-semibold"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">PDF</span>
        </button>
      </div>
    </div>
  );
};

export default NumerologyConsultationCardClient;