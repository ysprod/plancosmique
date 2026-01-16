'use client';

import React from 'react';

interface Props {
  name: string;
  setName: (v: string) => void;
  birthDate: string;
  setBirthDate: (v: string) => void;
  question: string;
  setQuestion: (v: string) => void;
}

const VoyanceFormFields = ({ name, setName, birthDate, setBirthDate, question, setQuestion }: Props) => (
  <div className="space-y-6">
    <div>
      <label className="block text-purple-200 font-bold mb-2">
        Votre prénom *
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Entrez votre prénom"
        className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border-2 border-purple-500/30 focus:border-purple-400 text-white placeholder-purple-300/50 transition-all"
      />
    </div>
    <div>
      <label className="block text-purple-200 font-bold mb-2">
        Date de naissance
      </label>
      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border-2 border-purple-500/30 focus:border-purple-400 text-white transition-all"
      />
    </div>
    <div>
      <label className="block text-purple-200 font-bold mb-2">
        Votre question (optionnel)
      </label>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Posez votre question aux astres..."
        rows={4}
        className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border-2 border-purple-500/30 focus:border-purple-400 text-white placeholder-purple-300/50 resize-none transition-all"
      />
    </div>
  </div>
);

export default VoyanceFormFields;