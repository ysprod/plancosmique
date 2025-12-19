'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Eye, Calendar, User, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { knowledgeService } from '@/lib/api/services';
import type { Knowledge } from '@/types/knowledge.types';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const categoryLabels = {
  ASTROLOGIE: 'Astrologie',
  NUMEROLOGIE: 'Numérologie',
  TAROT: 'Tarot',
  SPIRITUALITE: 'Spiritualité',
  MEDITATION: 'Méditation',
  DEVELOPPEMENT_PERSONNEL: 'Développement Personnel',
  RITUELS: 'Rituels',
  AUTRES: 'Autres',
};

export default function KnowledgeDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const [knowledge, setKnowledge] = useState<Knowledge | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (id) {
      loadKnowledge();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadKnowledge = async () => {
    try {
      setIsLoading(true);
      const data = await knowledgeService.getById(id);
      setKnowledge(data);
      // Vérifier si l'utilisateur a liké (à implémenter selon votre logique d'auth)
      // setIsLiked(data.likedBy.includes(currentUserId));
    } catch (error) {
      console.error('Erreur lors du chargement de la connaissance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (!knowledge) return;
    try {
      const result = await knowledgeService.toggleLike(knowledge._id);
      setIsLiked(result.liked);
      setKnowledge({
        ...knowledge,
        likesCount: result.likesCount,
      });
    } catch (error) {
      console.error('Erreur lors du like:', error);
    }
  };

  const handleShare = () => {
    if (navigator.share && knowledge) {
      navigator.share({
        title: knowledge.title,
        text: knowledge.content.substring(0, 100),
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback: copier dans le presse-papier
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier !');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!knowledge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-20 h-20 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Connaissance introuvable</h2>
          <Link href="/secured/knowledge">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors"
            >
              Retour aux connaissances
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/secured/knowledge">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Retour
              </motion.button>
            </Link>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-4 py-8">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Image principale */}
          {knowledge.imageUrl && (
            <div className="relative w-full h-96 mb-8 rounded-2xl overflow-hidden">
              <Image
                src={knowledge.imageUrl}
                alt={knowledge.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Badge catégorie */}
          <div className="mb-4">
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {categoryLabels[knowledge.category]}
            </span>
          </div>

          {/* Titre */}
          <h1 className="text-4xl font-bold text-white mb-6">
            {knowledge.title}
          </h1>

          {/* Méta informations */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-white/10">
            {/* Auteur */}
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

            {/* Stats */}
            <div className="flex items-center gap-4 text-gray-400">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {new Date(knowledge.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                {knowledge.viewsCount} vues
              </span>
            </div>

            {/* Bouton Like */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                isLiked
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              {knowledge.likesCount}
            </motion.button>
          </div>

          {/* Tags */}
          {knowledge.tags && knowledge.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {knowledge.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg text-sm bg-white/10 text-gray-300 flex items-center gap-1"
                >
                  <Tag className="w-4 h-4" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Contenu */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div
              className="text-gray-300 leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: knowledge.content.replace(/\n/g, '<br />') }}
            />
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">
                Publié le {new Date(knowledge.publishedAt || knowledge.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                  isLiked
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                {isLiked ? 'Vous aimez' : 'J\'aime'}
              </motion.button>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
