
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import FilterBar from '@/components/wallet/FilterBar';
import LoadingScreen from '@/components/wallet/LoadingScreen';
import TransactionsList from '@/components/wallet/TransactionsList';
import UnusedOfferingsList from '@/components/wallet/UnusedOfferingsList';
import WalletActions from '@/components/wallet/WalletActions';
import WalletStats from '@/components/wallet/WalletStats';
import WalletTabs from '@/components/wallet/WalletTabs';
import { useWalletPage } from '@/components/wallet/useWalletPage';
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";
import SuccessBanner from "../../../components/wallet/SuccessBanner";

export type TransactionFilter = "all" | "simulation" | "real";
export type SortOrder = "newest" | "oldest" | "amount_high" | "amount_low";
export type OfferingCategory = "animal" | "vegetal" | "beverage";

export interface OfferingDetails {
  _id: string;
  name: string;
  price: number;
  category: OfferingCategory;
  icon: string;
  description?: string;
}

export interface TransactionItem {
  offeringId: OfferingDetails | string; // Peut être peuplé ou juste l'ID
}

export interface Stats {
  totalTransactions: number;
  simulatedTransactions: number;
  totalSpent: number;
  totalSimulated: number;
}

export interface Transaction {
  _id: string;
  transactionId: string;
  paymentToken: string;
  status: string;
  totalAmount: number;
  paymentMethod: string;
  completedAt: string;
  items: any[];
  createdAt: string;
  updatedAt: string;
}

// =====================================================
// MAIN COMPONENT
// =====================================================
function WalletPageContent() {
  const {
    isLoading,
    isRefreshing,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    sortOrder,
    setSortOrder,
    showSuccessBanner,
    setShowSuccessBanner,
    activeTab,
    setActiveTab,
    unusedOfferings,
    isLoadingUnused,
    unusedError,
    fetchTransactions,
    stats,
    filteredTransactions,
  } = useWalletPage();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className=" p-4 sm:p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-white dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950">
      <div className="max-w-4xl mx-auto space-y-6">
        <AnimatePresence>
          {showSuccessBanner && (
            <SuccessBanner onDismiss={() => setShowSuccessBanner(false)} />
          )}
        </AnimatePresence>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Mon Panier d'Offrandes</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Gérez vos offrandes et consultez l'historique de vos transactions</p>
        </motion.div>
        <WalletTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'transactions' && (
          <>
            <WalletStats stats={stats} />
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filter={filter}
              onFilterChange={setFilter}
              sortOrder={sortOrder}
              onSortChange={setSortOrder}
              onRefresh={() => fetchTransactions(true)}
              isRefreshing={isRefreshing}
            />
            <TransactionsList filteredTransactions={filteredTransactions} />
          </>
        )}
        {activeTab === 'unused-offerings' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 min-h-[300px] w-full">
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-center">Retrouve ici toutes les offrandes achetées mais pas encore utilisées pour une consultation.</p>
            <UnusedOfferingsList unusedOfferings={unusedOfferings} isLoadingUnused={isLoadingUnused} unusedError={unusedError} />
          </div>
        )}
        <WalletActions />
      </div>
    </div>
  );
}

export default function SecuredWalletPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <WalletPageContent />
    </Suspense>
  );
}
