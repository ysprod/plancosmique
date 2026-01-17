"use client";
import { Calendar, Clock } from "lucide-react";

interface SubjectInfoLineProps {
  dateNaissance: string;
  heureNaissance: string;
}

export default function SubjectInfoLine({ dateNaissance, heureNaissance }: SubjectInfoLineProps) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs opacity-90">
      <div className="flex items-center gap-1">
        <Calendar className="w-3 h-3" />
        {new Date(dateNaissance).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </div>
      <div className="flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {heureNaissance}
      </div>
    </div>
  );
}