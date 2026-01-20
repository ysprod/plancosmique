import { ReactNode } from 'react';

interface ConsultationChoicesSectionProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export const ConsultationChoicesSection = ({ icon, title, children }: ConsultationChoicesSectionProps) => (
  <div className="w-full max-w-3xl mx-auto">
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">{title}</h2>
    </div>
    <div className="flex flex-col gap-3 items-center">
      {children}
    </div>
  </div>
);
