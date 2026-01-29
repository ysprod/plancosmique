import { memo } from "react";
import { AlertCircle } from "lucide-react";

const ApiErrorCard = memo(function ApiErrorCard({
  apiError,
}: {
  apiError: string;
}) {
  return (
    <div
      className="w-full rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3"
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start justify-center text-center gap-2">
        <span className="mt-0.5 h-8 w-8 rounded-xl grid place-items-center bg-rose-500/15 text-rose-700 dark:text-rose-300">
          <AlertCircle className="h-4 w-4" />
        </span>
        <div className="text-[12px] font-semibold text-rose-700 dark:text-rose-300">
          {apiError}
        </div>
      </div>
    </div>
  );
});
ApiErrorCard.displayName = "ApiErrorCard";

export default ApiErrorCard;
