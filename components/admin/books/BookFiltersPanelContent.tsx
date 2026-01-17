'use client';
import { SortField, SortOrder } from '@/hooks/books/useAdminBooks';
import { motion } from 'framer-motion';

interface BookFiltersPanelContentProps {
    showFilters: boolean;
    selectedCategory: string;
    setSelectedCategory: (v: string) => void;
    statusFilter: 'all' | 'active' | 'inactive';
    setStatusFilter: (v: 'all' | 'active' | 'inactive') => void;
    sortField: SortField;
    setSortField: (v: SortField) => void;
    sortOrder: SortOrder;
    setSortOrder: (v: SortOrder) => void;
    categories: string[];
    setSearchQuery: (v: string) => void;
}

export default function BookFiltersPanelContent({
    showFilters,
    selectedCategory,
    setSelectedCategory,
    statusFilter,
    setStatusFilter,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    categories,
    setSearchQuery
}: BookFiltersPanelContentProps) {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-4 mt-4 border-t-2 border-gray-100"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Catégorie</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none font-medium transition-all"
                    >
                        <option value="all">Toutes les catégories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Statut</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none font-medium transition-all"
                    >
                        <option value="all">Tous les statuts</option>
                        <option value="active">Actifs uniquement</option>
                        <option value="inactive">Inactifs uniquement</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Trier par</label>
                    <div className="flex gap-2">
                        <select
                            value={sortField}
                            onChange={(e) => setSortField(e.target.value as SortField)}
                            className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none font-medium transition-all"
                        >
                            <option value="title">Titre</option>
                            <option value="price">Prix</option>
                            <option value="pageCount">Pages</option>
                            <option value="createdAt">Date</option>
                        </select>
                        <button
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
                            title={sortOrder === 'asc' ? 'Croissant' : 'Décroissant'}
                        >
                            {sortOrder === 'asc' ? '↑' : '↓'}
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        setStatusFilter('all');
                        setSortField('createdAt');
                        setSortOrder('desc');
                    }}
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-bold"
                >
                    Réinitialiser tous les filtres
                </button>
            </div>
        </motion.div>
    );
}