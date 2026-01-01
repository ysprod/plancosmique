import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface ConsultationsFiltersProps {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  consultationsLength: number;
}

export default function ConsultationsFilters({ searchQuery, setSearchQuery, consultationsLength }: ConsultationsFiltersProps) {
  if (consultationsLength === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-purple-300 focus:outline-none focus:border-purple-400 transition-colors"
          />
        </div>
      </div>
    </motion.div>
  );
}
