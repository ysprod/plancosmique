import TabButton from "./TabButton";
import type { Category } from "./useOfferingStepState";

interface OfferingStepTabsProps {
  activeTab: Category;
  categoryCounts: Record<Category, number>;
  onTabChange: (cat: Category) => void;
}

export default function OfferingStepTabs({ activeTab, categoryCounts, onTabChange }: OfferingStepTabsProps) {
  return (
    <div className="flex gap-2">
      {(['animal', 'vegetal', 'beverage'] as Category[]).map(cat => (
        <TabButton
          key={cat}
          category={cat}
          isActive={activeTab === cat}
          onClick={() => onTabChange(cat)}
          count={categoryCounts[cat]}
        />
      ))}
    </div>
  );
}
