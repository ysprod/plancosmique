'use client';

import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

interface UsersEmptyStateProps {
    searchQuery?: string;
    statusFilter: string;
    roleFilter: string;
    handleResetFilters: () => void;
}

const UsersEmptyState = ({ searchQuery, statusFilter, roleFilter, handleResetFilters }: UsersEmptyStateProps) => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <Users className="w-14 h-14 text-gray-300 mx-auto mb-3" />
        <h3 className="text-base font-bold text-gray-900 mb-1">Aucun utilisateur trouvé</h3>
        <p className="text-sm text-gray-500 mb-4">
            {searchQuery || statusFilter !== 'all' || roleFilter !== 'all' ? 'Aucun résultat ne correspond à vos critères' : 'Commencez par ajouter votre premier utilisateur'}
        </p>
        {(searchQuery || statusFilter !== 'all' || roleFilter !== 'all') && (
            <button onClick={handleResetFilters} className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm rounded-lg font-medium hover:shadow-md transition-all">Réinitialiser les filtres</button>
        )}
    </motion.div>
);

export default UsersEmptyState;
