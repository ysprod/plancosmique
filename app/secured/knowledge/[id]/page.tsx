'use client';
import KnowledgeContent from '@/components/knowledge/KnowledgeContent';
import KnowledgeFooter from '@/components/knowledge/KnowledgeFooter';
import KnowledgeHeader from '@/components/knowledge/KnowledgeHeader';
import KnowledgeImage from '@/components/knowledge/KnowledgeImage';
import KnowledgeLoading from '@/components/knowledge/KnowledgeLoading';
import KnowledgeMeta from '@/components/knowledge/KnowledgeMeta';
import KnowledgeTags from '@/components/knowledge/KnowledgeTags';
import { useKnowledgeDetail } from '@/hooks/knowledge/useKnowledgeDetail';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useParams } from 'next/navigation';

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
  const { knowledge, isLoading, isLiked, handleLike } = useKnowledgeDetail(id);

  const handleShare = () => {
    if (navigator.share && knowledge) {
      navigator.share({
        title: knowledge.title,
        text: knowledge.content.substring(0, 100),
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier !');
    }
  };

  if (isLoading) {
    return <KnowledgeLoading />;
  }

  if (!knowledge) {
    return (
      <div className=" bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-20 h-20 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Connaissance introuvable</h2>

          <a href="/secured/knowledge">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors"
            >
              Retour aux connaissances
            </motion.button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <KnowledgeHeader onShare={handleShare} />
      <div className="container mx-auto px-4 py-8">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <KnowledgeImage imageUrl={knowledge.imageUrl} title={knowledge.title} />
          <div className="mb-4">
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {categoryLabels[knowledge.category as keyof typeof categoryLabels]}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-6">{knowledge.title}</h1>

          <KnowledgeMeta knowledge={knowledge} isLiked={isLiked} onLike={handleLike} />
          {knowledge.tags && knowledge.tags.length > 0 && <KnowledgeTags tags={knowledge.tags} />}
          <KnowledgeContent content={knowledge.content} />
          <KnowledgeFooter publishedAt={knowledge.publishedAt ?? undefined} createdAt={knowledge.createdAt} isLiked={isLiked} onLike={handleLike} />
        </motion.article>
      </div>
    </div>
  );
}
