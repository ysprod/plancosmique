'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, User, Eye, Heart, MessageCircle, ArrowRight, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Author {
  name: string;
  avatar?: string;
}

interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category?: string;
  createdAt: string;
  featured?: boolean;
  trending?: boolean;
  readTime?: number;
  author: Author;
  views?: number;
  likes?: number;
  comments?: number;
  formattedDate: string;
}

interface Props {
  article: Article;
  formatDate: (date: string) => string;
}

export default function SpiritualiteFeaturedArticle({ article, formatDate }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-8 sm:mb-12"
    >
      <Link href={`/spiritualite/${article.id}`}>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
        >
          <div className="relative">
            {/* Badge Featured */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg flex items-center gap-1"
              >
                <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                À LA UNE
              </motion.div>
              {article.trending && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg flex items-center gap-1"
                >
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                  TENDANCE
                </motion.div>
              )}
            </div>
            <div className="h-48 sm:h-64 lg:h-80 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 relative overflow-hidden">
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
              />
            </div>
          </div>
          <div className="p-6 sm:p-8">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{article.formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} min de lecture</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>{article.author.name}</span>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 hover:text-purple-600 transition-colors">
              {article.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3">
              {article.description}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium">{article.views}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium">{article.likes}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium">{article.comments}</span>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-purple-600 font-semibold text-sm sm:text-base"
              >
                Lire l'article
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
