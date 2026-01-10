import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

interface CategoryCardProps {
  category: {
    id: string;
    title: string;
    subtitle: string;
    icon: any;
    color: string;
    gradient: string;
    badge: string;
    badgeColor: string;
    description: string;
    link: string;
    stats: string;
  };
  index: number;
}

const CategoryCard = memo(({ category, index }: CategoryCardProps) => {
  const CategoryIcon = category.icon;
  return (
    <Link href={category.link}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 shadow-sm hover:shadow-xl transition-all duration-300 h-full overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/50 dark:via-purple-900/20 to-transparent opacity-0 group-hover:opacity-100"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.7 }}
        />
        <div className="relative z-10 flex flex-col h-full items-center justify-center text-center">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg mb-3 sm:mb-4 group-hover:shadow-xl transition-shadow`}
          >
            <CategoryIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
          </motion.div>
          <h2 className={`text-xs sm:text-sm md:text-base font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-1 sm:mb-1.5 leading-tight`}>
            {category.title}
          </h2>
          <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3 sm:mb-4 flex-grow line-clamp-2 sm:line-clamp-3">
            {category.description}
          </p>
          <div className="flex items-center justify-center mt-auto w-full">
            <motion.div
              className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 justify-center"
              whileHover={{ x: 2 }}
            >
              <span className="hidden sm:inline">Decouvrir</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </motion.div>
          </div>
        </div>
        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl`} />
      </motion.div>
    </Link>
  );
});

CategoryCard.displayName = 'CategoryCard';

export default CategoryCard;
