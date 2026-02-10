'use client';
interface ConsultationChoicesHeaderProps {
  withPrompt: number;
  withoutPrompt: number;
}

export const ConsultationChoicesHeader = ({ withPrompt, withoutPrompt }: ConsultationChoicesHeaderProps) => {
  const total = withPrompt + withoutPrompt;
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-zinc-100">Attribution des Prompts</h1>
        <p className="text-sm text-gray-600 dark:text-zinc-300 mt-1">
          {total} consultations • {withPrompt} avec prompt • {withoutPrompt} sans prompt
        </p>
      </div>
    </div>
  );
};
