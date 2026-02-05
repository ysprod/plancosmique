import React from "react";
import { Consultation } from "@/lib/interfaces";

interface PromptFormBasicInfoProps {
  consultation: Consultation;
}

const PromptFormBasicInfo: React.FC<PromptFormBasicInfoProps> = ({ consultation }) => (
  <div className="mb-4 p-3 rounded bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
    <div className="font-semibold">Consultation #{consultation.id}</div>
    <div className="text-sm">{consultation.user?.fullName} — {consultation.createdAt && new Date(consultation.createdAt).toLocaleDateString("fr-FR")}</div>
    <div className="text-xs opacity-80">{consultation.type} | {consultation.status}</div>
  </div>
);

export default PromptFormBasicInfo;
