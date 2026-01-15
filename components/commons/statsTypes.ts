export interface Stats {
  subscribers: number;
  visits: number;
}

export interface StatCardProps {
  value: number | null;
  label: string;
  icon: React.ReactNode;
  loading: boolean;
  color: 'purple' | 'fuchsia';
}
