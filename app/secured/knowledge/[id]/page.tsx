'use client';
import KnowledgeContent from '@/components/knowledge/KnowledgeContent';
import KnowledgeFooter from '@/components/knowledge/KnowledgeFooter';
import KnowledgeHeader from '@/components/knowledge/KnowledgeHeader';
import KnowledgeImage from '@/components/knowledge/KnowledgeImage';
import KnowledgeLoading from '@/components/knowledge/KnowledgeLoading';
import KnowledgeMeta from '@/components/knowledge/KnowledgeMeta';
import KnowledgeNotFound from '@/components/knowledge/KnowledgeNotFound';
import KnowledgeTags from '@/components/knowledge/KnowledgeTags';
import { useKnowledgeDetail } from '@/hooks/knowledge/useKnowledgeDetail';
import { motion } from 'framer-motion';
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
  const { knowledge, handleShare, isLoading, isLiked, handleLike } = useKnowledgeDetail(id);

  if (isLoading) { return <KnowledgeLoading />; }
  if (!knowledge) { return <KnowledgeNotFound />; }

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