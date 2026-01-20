import { Search } from 'lucide-react';

interface ConsultationChoicesSearchProps {
  search: string;
  setSearch: (v: string) => void;
}

export const ConsultationChoicesSearch = ({ search, setSearch }: ConsultationChoicesSearchProps) => (
  <div className="relative w-full max-w-2xl mx-auto">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Rechercher une consultation..."
      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
    />
  </div>
);
