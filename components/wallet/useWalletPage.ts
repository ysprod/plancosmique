'use client';

import { useAuth } from "@/lib/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api/client";
import { SortOrder, Stats, Transaction, TransactionFilter } from "./types";
 
export function useWalletPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<TransactionFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [activeTab, setActiveTab] = useState<'transactions' | 'unused-offerings'>('unused-offerings');
  const [unusedOfferings, setUnusedOfferings] = useState<any[]>([]);
  const [isLoadingUnused, setIsLoadingUnused] = useState(false);
  const [unusedError, setUnusedError] = useState<string | null>(null);

  const fetchUnusedOfferings = useCallback(async () => {
    if (!user?._id) return;
    setIsLoadingUnused(true);
    setUnusedError(null);
    try {
      const res = await api.get(`/offering-stock/available?userId=${user._id}`);
      if (res.status === 200 && Array.isArray(res.data)) {
        setUnusedOfferings(res.data);
      } else if (res.data && Array.isArray(res.data.unusedOfferings)) {
        setUnusedOfferings(res.data.unusedOfferings);
      } else {
        setUnusedOfferings([]);
      }
    } catch (e) {
      setUnusedError("Erreur lors du chargement des offrandes non utilisées.");
      setUnusedOfferings([]);
    } finally {
      setIsLoadingUnused(false);
    }
  }, [user?._id]);

  useEffect(() => {
    if (activeTab === 'unused-offerings' && user?._id) {
      fetchUnusedOfferings();
    }
  }, [activeTab, user?._id, fetchUnusedOfferings]);

  const fetchTransactions = useCallback(async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) {
        setIsRefreshing(true);
      }
      if (!user?._id) {
        setIsLoading(false);
        return;
      }
      const response = await api.get(`/wallet/transactions?userId=${user._id}`);
      if (response.status === 200) {
        const txData = response.data.transactions || response.data || [];
        setTransactions(Array.isArray(txData) ? txData : []);
        const lastPurchase = localStorage.getItem("last_simulated_purchase");
        if (lastPurchase) {
          const purchaseData = JSON.parse(lastPurchase);
          const exists = txData.some((t: Transaction) => t.transactionId === purchaseData.transactionId);
          if (exists) {
            setShowSuccessBanner(true);
            localStorage.removeItem("last_simulated_purchase");
          }
        }
      }
    } catch (err) {
      // log error
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [user?._id]);

  useEffect(() => {
    if (user?._id) {
      fetchTransactions(false);
    }
  }, [user?._id, fetchTransactions]);

  const stats = useMemo<Stats>(() => {
    const simulated = transactions.filter((t) => t.paymentMethod === "simulation");
    return {
      totalTransactions: transactions.length,
      simulatedTransactions: simulated.length,
      totalSpent: transactions.reduce((sum, t) => sum + t.totalAmount, 0),
      totalSimulated: simulated.reduce((sum, t) => sum + t.totalAmount, 0),
    };
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;
    if (filter === "simulation") {
      filtered = filtered.filter((t) => t.paymentMethod === "simulation");
    } else if (filter === "real") {
      filtered = filtered.filter((t) => t.paymentMethod !== "simulation");
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((t) => {
        const matchId = t.transactionId.toLowerCase().includes(query);
        const matchItems = t.items.some((item) => {
          const normalized = (item.offeringId && typeof item.offeringId === 'object') ? item.offeringId : item;
          return normalized.name?.toLowerCase().includes(query);
        });
        return matchId || matchItems;
      });
    }
    filtered = [...filtered].sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
        case "oldest":
          return new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime();
        case "amount_high":
          return b.totalAmount - a.totalAmount;
        case "amount_low":
          return a.totalAmount - b.totalAmount;
        default:
          return 0;
      }
    });
    return filtered;
  }, [transactions, filter, searchQuery, sortOrder]);

  return {
    router,
    user,
    isLoading,
    isRefreshing,
    transactions,
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
    fetchUnusedOfferings
  };
}
