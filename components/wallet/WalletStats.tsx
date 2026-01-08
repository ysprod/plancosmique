import { Stats } from './types';
import StatsCard from './StatsCard';
import { ShoppingBag, Sparkles, TrendingUp } from 'lucide-react'; 

interface WalletStatsProps {
  stats: Stats;
}

export default function WalletStats({ stats }: WalletStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard label="Total transactions" value={stats.totalTransactions} icon={ShoppingBag} />
      <StatsCard label="Simulations" value={stats.simulatedTransactions} icon={Sparkles} />
      <StatsCard label="Total dépensé" value={`${stats.totalSpent.toLocaleString()} F`} icon={TrendingUp} />
      <StatsCard label="Total simulé" value={`${stats.totalSimulated.toLocaleString()} F`} icon={Sparkles} trend={stats.simulatedTransactions > 0 ? "+12%" : undefined} />
    </div>
  );
}
