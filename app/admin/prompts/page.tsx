import PromptsList from '@/components/admin/prompts/PromptsList';

export const dynamic = 'force-dynamic';

export default function PromptsPage() {
  return (
    <div className="p-6">
      <PromptsList />
    </div>
  );
}
