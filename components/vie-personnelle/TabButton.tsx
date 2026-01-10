import React, { memo } from "react";
import { CATEGORY_CONFIG } from "./OfferingStep.utils";

type Category = 'animal' | 'vegetal' | 'beverage';

interface TabButtonProps {
  category: Category;
  isActive: boolean;
  onClick: () => void;
  count: number;
}

const TabButton: React.FC<TabButtonProps> = memo(({ category, isActive, onClick }) => {
  const config = CATEGORY_CONFIG[category];
  return (
    <button
      onClick={onClick}
      className={`
        flex-1 relative py-3 px-4 rounded-xl font-semibold text-sm transition-all
        ${isActive
          ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
          : `${config.lightBg} ${config.darkBg} text-gray-700 dark:text-gray-300 hover:opacity-80`
        }
      `}
    >
      <span className="flex items-center justify-center gap-1.5">
        <span className="text-base">{config.icon}</span>
        <span>{config.label}</span>
      </span>
    </button>
  );
});
TabButton.displayName = 'TabButton';

export default TabButton;
