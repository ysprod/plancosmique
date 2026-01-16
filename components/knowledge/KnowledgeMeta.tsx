'use client';
import React from 'react';
import { Calendar, Eye, User } from 'lucide-react';
import type { Knowledge } from '@/lib/types/knowledge.types';

const KnowledgeMeta: React.FC<{ knowledge: Knowledge; isLiked: boolean; onLike: () => void; }>
  = ({ knowledge, isLiked, onLike }) => (
  <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-white/10">
    {typeof knowledge.authorId !== 'string' && (
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-white font-medium">
            {knowledge.authorId.firstName} {knowledge.authorId.lastName}
          </p>
          <p className="text-xs text-gray-400">{knowledge.authorId.role}</p>
        </div>
      </div>
    )}
    <div className="flex items-center gap-4 text-gray-400">
      <span className="flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        {new Date(knowledge.createdAt).toLocaleDateString('fr-FR', {
          day: 'numeric', month: 'long', year: 'numeric',
        })}
      </span>
      <span className="flex items-center gap-2">
        <Eye className="w-5 h-5" />
        {knowledge.viewsCount} vues
      </span>
    </div>
    <button
      onClick={onLike}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${isLiked ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
    >
      <svg className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      {knowledge.likesCount}
    </button>
  </div>
);

export default KnowledgeMeta;
