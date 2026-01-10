import { memo } from "react";
import { CATEGORY_CONFIG } from "./OfferingStep";
import type { Category } from "./OfferingStep";
import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import type { OfferingAlternative } from "@/lib/interfaces";

interface TabButtonProps {
  category: Category;
  isActive: boolean;
  onClick: () => void;
  count: number;
}

export const TabButton = memo(({ category, isActive, onClick, count }: TabButtonProps) => {
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
TabButton.displayName = "TabButton";

interface OfferingCardProps {
  offering: OfferingAlternative;
  isSelected: boolean;
  availableQuantity: number;
  onSelect: () => void;
  index: number;
}

export const OfferingCard = memo(({ offering, isSelected, availableQuantity, onSelect, index }: OfferingCardProps) => {
  const isSufficient = availableQuantity >= offering.quantity;
  const config = CATEGORY_CONFIG[offering.category];
  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={isSufficient ? onSelect : undefined}
      disabled={!isSufficient}
      className={`
        w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left
        ${isSelected
          ? `border-purple-500 ${config.lightBg} ${config.darkBg} shadow-md`
          : isSufficient
            ? "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300 active:scale-[0.98]"
            : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-50 cursor-not-allowed"
        }
      `}
    >
      <div className="flex-shrink-0">
        {isSelected ? (
          <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        ) : (
          <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600" />
        )}
      </div>
      <div className={`
        w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0
        ${isSelected
          ? `bg-gradient-to-br ${config.gradient} text-white shadow-sm`
          : "bg-gray-100 dark:bg-gray-700"
        }
      `}>
        {offering.icon || config.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
          {offering.name || `${config.label} ${index + 1}`}
        </h4>
        <div className="flex items-center gap-2 text-[11px] text-gray-600 dark:text-gray-400">
          <span>Requis: <strong>{offering.quantity}</strong></span>
          <span>•</span>
          <span className={isSufficient ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
            Dispo: <strong>{availableQuantity}</strong>
          </span>
        </div>
      </div>
    </motion.button>
  );
});
OfferingCard.displayName = "OfferingCard";
