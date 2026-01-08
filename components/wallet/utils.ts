import { OfferingCategory, TransactionItem } from "./types";
 
export function getCategoryConfig(category: OfferingCategory) {
  switch (category) {
    case 'animal':
      return { label: 'Animal', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' };
    case 'vegetal':
      return { label: 'Végétal', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' };
    case 'beverage':
      return { label: 'Boisson', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' };
    default:
      return { label: 'Autre', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' };
  }
}

export function normalizeItem(item: TransactionItem & { quantity?: number; price?: number; name?: string; icon?: string; }) {
  // If item.offeringId is populated, use its details
  if (typeof item.offeringId === 'object' && item.offeringId !== null) {
    return {
      ...item.offeringId,
      quantity: item.quantity,
      price: item.price ?? item.offeringId.price,
      name: item.offeringId.name,
      icon: item.offeringId.icon,
    };
  }
  // Fallback for string offeringId
  return {
    ...item,
    name: item.name ?? 'Offrande',
    icon: item.icon ?? '🎁',
  };
}
