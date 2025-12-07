import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Package, Leaf, Wine, LucideIcon } from 'lucide-react';
import { Category } from './types';
import { staggerContainer, fadeInUp } from './animations';
import { offerings } from './data';

interface CategoryInfo {
    id: Category;
    name: string;
    icon: LucideIcon;
    count: number;
}

interface CategoryFiltersProps {
    selectedCategory: Category;
    onSelectCategory: (category: Category) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({ selectedCategory, onSelectCategory }) => {
    const categories: CategoryInfo[] = [
        { id: 'all' as const, name: 'Tout', icon: Sparkles, count: offerings.length },
        { id: 'animal' as const, name: 'Animales', icon: Package, count: offerings.filter(o => o.category === 'animal').length },
        { id: 'vegetal' as const, name: 'Végétales', icon: Leaf, count: offerings.filter(o => o.category === 'vegetal').length },
        { id: 'beverage' as const, name: 'Boissons', icon: Wine, count: offerings.filter(o => o.category === 'beverage').length }
    ];

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex overflow-x-auto gap-2 sm:gap-3 mb-6 sm:mb-8 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide"
        >
            {categories.map((cat) => (
                <motion.button
                    key={cat.id}
                    variants={fadeInUp}
                    onClick={() => onSelectCategory(cat.id)}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-shrink-0 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full sm:rounded-2xl font-bold flex items-center gap-2 transition-all text-sm sm:text-base shadow-sm ${selectedCategory === cat.id
                            ? 'bg-black text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95'
                        }`}
                >
                    <cat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{cat.name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${selectedCategory === cat.id ? 'bg-white/20' : 'bg-gray-300'
                        }`}>
                        {cat.count}
                    </span>
                </motion.button>
            ))}
        </motion.div>
    );
};
