import KnowledgeDetailPageClient from '@/components/secured/knowledge/KnowledgeDetailPageClient';

interface PageProps {
  params: { id: string };
}

export default function KnowledgeDetailPage({ params }: PageProps) {
  return <KnowledgeDetailPageClient id={params.id} />;
}

