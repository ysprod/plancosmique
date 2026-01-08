import NoResults from '@/components/spiritualite/NoResults';

export default function SpiritualiteNoResultsSection({ onReset }: { onReset: () => void }) {
  return (
    <NoResults onReset={onReset} />
  );
}
