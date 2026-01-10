import { useState, useEffect, useCallback } from 'react';
import { knowledgeService } from '@/lib/api/services';
import type { Knowledge } from '@/lib/types/knowledge.types';

export function useKnowledgeDetail(id: string) {
  const [knowledge, setKnowledge] = useState<Knowledge | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

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


  const loadKnowledge = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await knowledgeService.getById(id);
      setKnowledge(data);
      // setIsLiked(data.likedBy.includes(currentUserId));
    } catch (error) {
      console.error('Erreur lors du chargement de la connaissance:', error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) loadKnowledge();
  }, [id, loadKnowledge]);

  const handleLike = useCallback(async () => {
    if (!knowledge) return;
    try {
      const result = await knowledgeService.toggleLike(knowledge._id);
      setIsLiked(result.liked);
      setKnowledge({ ...knowledge, likesCount: result.likesCount });
    } catch (error) {
      console.error('Erreur lors du like:', error);
    }
  }, [knowledge]);

  return { knowledge, isLoading, isLiked, setIsLiked, setKnowledge, handleLike, handleShare };
}
