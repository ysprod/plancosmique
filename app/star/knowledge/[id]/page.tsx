import KnowledgeDetailPageClient from '@/components/secured/knowledge/KnowledgeDetailPageClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function KnowledgeDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <KnowledgeDetailPageClient id={id} />;
}