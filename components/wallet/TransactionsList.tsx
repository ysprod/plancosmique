import TransactionCard from './TransactionCard';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import type { Transaction } from '@/app/secured/wallet/page';

interface TransactionsListProps {
  filteredTransactions: Transaction[];
}

export default function TransactionsList({ filteredTransactions }: TransactionsListProps) {
  if (filteredTransactions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-700"
      >
        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 dark:text-gray-400 font-medium mb-2">Aucune transaction trouvée</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">Vos achats apparaîtront ici</p>
      </motion.div>
    );
  }
  return (
    <div className="space-y-3">
      {filteredTransactions.map((transaction, index) => (
        <TransactionCard key={transaction._id} transaction={transaction} index={index} />
      ))}
    </div>
  );
}
