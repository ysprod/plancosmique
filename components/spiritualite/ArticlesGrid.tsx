'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, Eye, Heart, ArrowRight, Flame } from 'lucide-react';

interface ArticlesGridProps {
  articles: any[];
  formatDate: (dateString: string) => string;
  setSearchQuery: (q: string) => void;
  setSelectedCategory: (id: string) => void;
}

const ArticlesGrid = ({ articles, formatDate, setSearchQuery, setSelectedCategory }: ArticlesGridProps) => {
  if (!articles.length) return null;
  return (
    <motion.div
      key="articles-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
    >
      {articles.map((practice, index) => (
        <motion.div
          key={practice._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          whileHover={{ y: -8 }}
          className="group"
        >
          <Link href={`/spiritualite/${practice._id}`}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col cursor-pointer">
              {/* Image Header */}
              <div className="relative h-40 sm:h-48 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
                  transition={{ duration: 15, repeat: Infinity }}
                />
                {/* Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  {practice.trending && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1"
                    >
                      <Flame className="w-3 h-3" />
                      HOT
                    </motion.div>
                  )}
                </div>
              </div>
              {/* Content */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(practice.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{practice.readTime} min</span>
                  </div>
                </div>
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                  {practice.title}
                </h3>
                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
                  {practice.description}
                </p>
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span className="text-xs font-medium">{practice.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span className="text-xs font-medium">{practice.likes}</span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="text-purple-600 group-hover:text-purple-700"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ArticlesGrid;
