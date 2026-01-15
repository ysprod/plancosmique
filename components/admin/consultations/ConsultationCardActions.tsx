"use client";

import { Edit, Mail } from "lucide-react";
import { memo } from "react";
import ActionButton from "./ActionButton";

interface ConsultationCardActionsProps {
  isNotified: boolean;
  onNotify: () => void;
  onModify: () => void;
}

const ConsultationCardActions = memo(function ConsultationCardActions({
  isNotified,
  onNotify,
  onModify,
}: ConsultationCardActionsProps) {
  return (
    <div className="relative z-10 mx-auto mt-4 flex w-full flex-col justify-center gap-2 sm:flex-row sm:gap-3">
      <ActionButton
        onClick={onNotify}
        icon={Mail}
        label={isNotified ? "Déjà notifié" : "Notifier l'utilisateur"}
        gradient="from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
        disabled={isNotified}
      />
      <ActionButton
        onClick={onModify}
        icon={Edit}
        label="Modifier l'analyse"
        gradient="from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
      />
    </div>
  );
});

ConsultationCardActions.displayName = "ConsultationCardActions";
export default ConsultationCardActions;
