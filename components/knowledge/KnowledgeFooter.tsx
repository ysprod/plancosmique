'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface KnowledgeFooterProps {
  publishedAt?: string;
  createdAt: string;
  isLiked: boolean;
  onLike: () => void;
}

const KnowledgeFooter: React.FC<KnowledgeFooterProps> = ({ publishedAt, createdAt, isLiked, onLike }) => (
  <div className="mt-12 pt-8 border-t border-white/10">
    <div className="flex items-center justify-between">
      <p className="text-gray-400 text-sm">
        Publié le {new Date(publishedAt ?? createdAt).toLocaleDateString('fr-FR', {
          day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
        })}
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLike}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${isLiked ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
      >
        <svg className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        {isLiked ? 'Vous aimez' : "J'aime"}
      </motion.button>
    </div>
  </div>
);

export default KnowledgeFooter;
