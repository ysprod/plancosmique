"use client";

import React, { memo, useCallback, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSearchParams } from "next/navigation";

import FilterBar from "@/components/wallet/FilterBar";
import LoadingScreen from "@/components/wallet/LoadingScreen";
import TransactionsList from "@/components/wallet/TransactionsList";
import UnusedOfferingsList from "@/components/wallet/UnusedOfferingsList";
import WalletActions from "@/components/wallet/WalletActions";
import WalletStats from "@/components/wallet/WalletStats";
import WalletTabs from "@/components/wallet/WalletTabs";
import SuccessBanner from "@/components/wallet/SuccessBanner";
import { useWalletPage } from "@/components/wallet/useWalletPage";

function cx(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}

const pageVariants = {
  initial: { opacity: 0, y: 10, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.18 } },
};

const cardVariants = {
  initial: { opacity: 0, y: 8, scale: 0.995 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.14 } },
  exit: { opacity: 0, y: 8, scale: 0.995, transition: { duration: 0.12 } },
};

const Header = memo(function Header() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center gap-2">
      <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-zinc-50">
        Mon Panier d&apos;Offrandes
      </h1>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300">
        Gérez vos offrandes et consultez l’historique de vos transactions
      </p>
    </div>
  );
});

const TransactionsTab = memo(function TransactionsTab(props: {
  stats: any;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  filter: any;
  setFilter: (v: any) => void;
  sortOrder: any;
  setSortOrder: (v: any) => void;
  isRefreshing: boolean;
  onRefresh: () => void;
  filteredTransactions: any[];
}) {
  const {
    stats,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    sortOrder,
    setSortOrder,
    isRefreshing,
    onRefresh,
    filteredTransactions,
  } = props;

  return (
    <div className="w-full space-y-4">
      <WalletStats stats={stats} />
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filter={filter}
        onFilterChange={setFilter}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onRefresh={onRefresh}
        isRefreshing={isRefreshing}
      />
      <TransactionsList filteredTransactions={filteredTransactions} />
    </div>
  );
});

const UnusedTab = memo(function UnusedTab(props: {
  unusedOfferings: any[];
  isLoadingUnused: boolean;
  unusedError: any;
}) {
  const { unusedOfferings, isLoadingUnused, unusedError } = props;

  return (
    <div
      className={cx(
        "mx-auto w-full",
        "rounded-[28px] border p-4 sm:p-6",
        "border-slate-200/70 bg-white/75 shadow-xl shadow-black/5 backdrop-blur",
        "dark:border-zinc-800/70 dark:bg-zinc-950/45 dark:shadow-black/35",
        "min-h-[300px]"
      )}
    >
      <p className="mb-4 text-center text-sm text-slate-600 dark:text-zinc-300">
        Retrouve ici toutes les offrandes achetées mais pas encore utilisées pour une consultation.
      </p>
      <UnusedOfferingsList
        unusedOfferings={unusedOfferings}
        isLoadingUnused={isLoadingUnused}
        unusedError={unusedError}
      />
    </div>
  );
});

export default function WalletPageContent() {
  const reduceMotion = useReducedMotion();

  const searchParams = useSearchParams();
  const consultationId = searchParams?.get("consultationId") || undefined;
  const categoryId = searchParams?.get("categoryId") || undefined;

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

  // Handlers stables (anti rerender enfants)
  const dismissBanner = useCallback(() => setShowSuccessBanner(false), [setShowSuccessBanner]);
  const onRefresh = useCallback(() => fetchTransactions(true), [fetchTransactions]);

  const toConsultation = useMemo(() => Boolean(consultationId), [consultationId]);

  if (isLoading) return <LoadingScreen />;

  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className={cx(
        "min-h-[80vh] w-full",
        "px-3 py-4 sm:px-4 sm:py-6 lg:px-6",
        "bg-gradient-to-br from-purple-50 via-pink-50 to-white",
        "dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950"
      )}
    >
      <div className="mx-auto w-full max-w-4xl space-y-4 sm:space-y-6">
        {/* Success banner centré */}
        <AnimatePresence mode="wait">
          {showSuccessBanner && (
            <motion.div key="banner" variants={cardVariants} initial="initial" animate="animate" exit="exit">
              <SuccessBanner onDismiss={dismissBanner} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <Header />

        {/* Tabs */}
        <div className="mx-auto flex w-full justify-center">
          <WalletTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "transactions" ? (
            <motion.section
              key="transactions"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={cx(
                "mx-auto w-full",
                "rounded-[28px] border p-3 sm:p-5",
                "border-slate-200/70 bg-white/75 shadow-xl shadow-black/5 backdrop-blur",
                "dark:border-zinc-800/70 dark:bg-zinc-950/45 dark:shadow-black/35"
              )}
            >
              <TransactionsTab
                stats={stats}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filter={filter}
                setFilter={setFilter}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                onRefresh={onRefresh}
                isRefreshing={isRefreshing}
                filteredTransactions={filteredTransactions}
              />
            </motion.section>
          ) : (
            <motion.section
              key="unused"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <UnusedTab
                unusedOfferings={unusedOfferings}
                isLoadingUnused={isLoadingUnused}
                unusedError={unusedError}
              />
            </motion.section>
          )}
        </AnimatePresence>

        {/* Actions (toujours en bas, centré) */}
        <div className="mx-auto flex w-full justify-center">
          <WalletActions
            toConsultation={toConsultation}
            consultationId={consultationId}
            categoryId={categoryId}
          />
        </div>

        {/* Fine accent line (léger) */}
        {!reduceMotion && (
          <motion.div
            className="mx-auto h-[2px] w-28 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-emerald-500/80"
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
    </motion.main>
  );
}
