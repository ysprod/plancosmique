import PromptForm from '@/components/admin/prompts/PromptForm';

export const dynamic = 'force-dynamic';

export default function CreatePromptPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <PromptForm />
    </div>
  );
}
