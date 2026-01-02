import SpiritualiteLoading from '@/components/spiritualite/SpiritualiteLoading';
import SpiritualiteError from '@/components/spiritualite/SpiritualiteError';

export function SpiritualiteLoadingState() {
  return <SpiritualiteLoading />;
}

export function SpiritualiteErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return <SpiritualiteError error={error} onRetry={onRetry} />;
}
