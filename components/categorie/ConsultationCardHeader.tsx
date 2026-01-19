'use client';
import { memo } from 'react';

interface ConsultationCardHeaderProps {
  title: string;
  description: string;
}

export const ConsultationCardHeader = memo<ConsultationCardHeaderProps>(
  function ConsultationCardHeader({ title, description }) {
    return (
      <div className="text-center mb-4">
        <h3 className="font-bold text-purple-900 dark:text-purple-200 text-base sm:text-lg leading-tight mb-2 line-clamp-3">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-4">
          {description}
        </p>
      </div>
    );
  }
);
