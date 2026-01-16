'use client';
import { Tag, Eye, Heart, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Knowledge, KnowledgeCategory } from '@/lib/types/knowledge.types';

const categoryLabels: Record<KnowledgeCategory, string> = {
  ASTROLOGIE: 'Astrologie',
  NUMEROLOGIE: 'Numérologie',
  TAROT: 'Tarot',
  SPIRITUALITE: 'Spiritualité',
  MEDITATION: 'Méditation',
  DEVELOPPEMENT_PERSONNEL: 'Développement Personnel',
  RITUELS: 'Rituels',
  AUTRES: 'Autres',
};

const categoryColors: Record<KnowledgeCategory, string> = {
  ASTROLOGIE: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
  NUMEROLOGIE: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  TAROT: 'from-violet-500/20 to-fuchsia-500/20 border-violet-500/30',
  SPIRITUALITE: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
  MEDITATION: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  DEVELOPPEMENT_PERSONNEL: 'from-teal-500/20 to-cyan-500/20 border-teal-500/30',
  RITUELS: 'from-rose-500/20 to-pink-500/20 border-rose-500/30',
  AUTRES: 'from-gray-500/20 to-slate-500/20 border-gray-500/30',
};

export default function KnowledgeGrid({ knowledges, onLike }: { knowledges: Knowledge[]; onLike: (e: React.MouseEvent, id: string) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {knowledges.map((knowledge, index) => (
        <motion.div
          key={knowledge._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Link href={`/secured/knowledge/${knowledge._id}`}>
            <div className={`group relative h-full p-6 rounded-2xl border backdrop-blur-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] bg-gradient-to-br ${categoryColors[knowledge.category]}`}>
              {knowledge.imageUrl && (
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                  <Image
                    src={knowledge.imageUrl}
                    alt={knowledge.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                  {categoryLabels[knowledge.category]}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                {knowledge.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {knowledge.content.substring(0, 150)}...
              </p>
              {knowledge.tags && knowledge.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {knowledge.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-2 py-1 rounded-lg text-xs bg-white/10 text-gray-300 flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {knowledge.viewsCount}
                  </span>
                  <button
                    onClick={(e) => onLike(e, knowledge._id)}
                    className="flex items-center gap-1 hover:text-red-400 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    {knowledge.likesCount}
                  </button>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar className="w-4 h-4" />
                  {new Date(knowledge.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </div>
              </div>
              {typeof knowledge.authorId !== 'string' && (
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-xs">
                    <p className="text-white font-medium">
                      {knowledge.authorId.firstName} {knowledge.authorId.lastName}
                    </p>
                    <p className="text-gray-400">{knowledge.authorId.role}</p>
                  </div>
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
