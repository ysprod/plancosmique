import { Search, RefreshCw } from "lucide-react";
import { TransactionFilter, SortOrder } from '@/components/wallet/types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  filter: TransactionFilter;
  onFilterChange: (v: TransactionFilter) => void;
  sortOrder: SortOrder;
  onSortChange: (v: SortOrder) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const FilterBar = ({ searchQuery, onSearchChange, filter, onFilterChange, sortOrder, onSortChange, onRefresh, isRefreshing }: FilterBarProps) => (
  <div className="space-y-3">
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher par ID, nom d'offrande..."
          className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all"
        />
      </div>
      <button
        onClick={onRefresh}
        disabled={isRefreshing}
        className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-all"
      >
        <RefreshCw className={`w-4 h-4 text-gray-600 dark:text-gray-400 ${isRefreshing ? "animate-spin" : ""}`} />
      </button>
    </div>
    <div className="flex flex-wrap gap-2">
      <select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value as TransactionFilter)}
        className="h-9 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium focus:ring-2 focus:ring-purple-500 transition-all"
      >
        <option value="all">Toutes les transactions</option>
        <option value="simulation">Simulations uniquement</option>
        <option value="real">Réelles uniquement</option>
      </select>
      <select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value as SortOrder)}
        className="h-9 px-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium focus:ring-2 focus:ring-purple-500 transition-all"
      >
        <option value="newest">Plus récent</option>
        <option value="oldest">Plus ancien</option>
        <option value="amount_high">Montant décroissant</option>
        <option value="amount_low">Montant croissant</option>
      </select>
    </div>
  </div>
);

export default FilterBar;