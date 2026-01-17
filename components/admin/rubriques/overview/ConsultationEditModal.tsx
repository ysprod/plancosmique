'use client';
import { ConsultationConfig } from "@/lib/interfaces";
import React, { useState } from "react";

interface ConsultationEditModalProps {
  consultation: ConsultationConfig;
  open: boolean;
  onClose: () => void;
  onSend: (updated: ConsultationConfig) => void;
}

const ConsultationEditModal: React.FC<ConsultationEditModalProps> = ({ consultation, open, onClose, onSend }) => {
  const [form, setForm] = useState(consultation);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">Modifier la consultation</h2>
        <div className="space-y-3">
          <input
            className="w-full px-3 py-2 border rounded"
            value={form.titre}
            onChange={e => setForm({ ...form, titre: e.target.value })}
            placeholder="Titre"
          />
          <textarea
            className="w-full px-3 py-2 border rounded"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            rows={3}
          />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded bg-slate-100">Annuler</button>
          <button onClick={() => onSend(form)} className="px-4 py-2 rounded bg-violet-600 text-white">Envoyer consultation</button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationEditModal;