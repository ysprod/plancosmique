interface RubriqueErrorDisplayProps {
  error: string;
}

export default function RubriqueErrorDisplay({ error }: RubriqueErrorDisplayProps) {
  return (
    <div className="mt-4 p-4 rounded-xl bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50 text-red-700 dark:text-red-300">
      <p className="text-sm font-medium">{error}</p>
    </div>
  );
}
