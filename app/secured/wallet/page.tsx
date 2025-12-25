/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { api } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  Package,
  RefreshCw,
  Search,
  ShoppingBag,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import StatsCard from "./components/StatsCard";
import SuccessBanner from "./components/SuccessBanner";

type TransactionFilter = "all" | "simulation" | "real";
type SortOrder = "newest" | "oldest" | "amount_high" | "amount_low";
type OfferingCategory = "animal" | "vegetal" | "beverage";

interface OfferingDetails {
  _id: string;
  name: string;
  price: number;
  category: OfferingCategory;
  icon: string;
}

interface TransactionItem {
  offeringId: OfferingDetails | string; // Peut être peuplé ou juste l'ID
  quantity: number;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  // Fallback pour anciennes transactions sans populate
  name?: string;
  price?: number;
  category?: string;
  icon?: string;
}

interface Transaction {
  _id: string;
  transactionId: string;
  paymentToken: string;
  status: string;
  totalAmount: number;
  paymentMethod: string;
  completedAt: string;
  items: TransactionItem[];
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  totalTransactions: number;
  simulatedTransactions: number;
  totalSpent: number;
  totalSimulated: number;
}

// =====================================================
// HELPERS
// =====================================================
const getCategoryConfig = (category: string) => {
  const configs = {
    animal: {
      label: "Animal",
      color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
      gradient: "from-amber-500 to-orange-500",
    },
    vegetal: {
      label: "Végétal",
      color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
      gradient: "from-green-500 to-emerald-500",
    },
    beverage: {
      label: "Boisson",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
      gradient: "from-blue-500 to-cyan-500",
    },
  };
  return configs[category as keyof typeof configs] || configs.animal;
};

const normalizeItem = (item: TransactionItem) => {
  // Si offeringId est un objet peuplé
  if (typeof item.offeringId === "object" && item.offeringId !== null) {
    return {
      _id: item.offeringId._id,
      name: item.offeringId.name,
      price: item.offeringId.price,
      category: item.offeringId.category,
      icon: item.offeringId.icon,
      quantity: item.quantity,
    };
  }

  // Fallback : anciennes transactions avec données plates
  return {
    _id: typeof item.offeringId === "string" ? item.offeringId : "",
    name: item.name || "Offrande inconnue",
    price: item.price || 0,
    category: item.category || "animal",
    icon: item.icon || "📦",
    quantity: item.quantity,
  };
};

// =====================================================
// SUB-COMPONENTS
// =====================================================
const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen flex flex-col items-center justify-center p-4 
               bg-gradient-to-br from-purple-50 via-pink-50 to-white 
               dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 rounded-full border-4 border-purple-200 dark:border-purple-800 
                 border-t-purple-600 dark:border-t-purple-400"
    />
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400 
                 flex items-center gap-2"
    >
      <Sparkles className="w-4 h-4 text-purple-500" />
      <span>Chargement de vos transactions...</span>
    </motion.p>
  </motion.div>
);



const FilterBar = ({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
  sortOrder,
  onSortChange,
  onRefresh,
  isRefreshing,
}: any) => (
  <div className="space-y-3">
    {/* Barre de recherche avec refresh */}
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher par ID, nom d'offrande..."
          className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-800 text-sm 
                   focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 
                   focus:border-transparent transition-all"
        />
      </div>
      <button
        onClick={onRefresh}
        disabled={isRefreshing}
        className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 
                 border border-gray-300 dark:border-gray-600 
                 flex items-center justify-center
                 hover:bg-gray-50 dark:hover:bg-gray-700 
                 disabled:opacity-50 transition-all"
      >
        <RefreshCw className={`w-4 h-4 text-gray-600 dark:text-gray-400 
                             ${isRefreshing ? "animate-spin" : ""}`} />
      </button>
    </div>

    <div className="flex flex-wrap gap-2">
      <select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value as TransactionFilter)}
        className="h-9 px-3 rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-800 text-sm font-medium 
                 focus:ring-2 focus:ring-purple-500 transition-all"
      >
        <option value="all">Toutes les transactions</option>
        <option value="simulation">Simulations uniquement</option>
        <option value="real">Réelles uniquement</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value as SortOrder)}
        className="h-9 px-3 rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-800 text-sm font-medium 
                 focus:ring-2 focus:ring-purple-500 transition-all"
      >
        <option value="newest">Plus récent</option>
        <option value="oldest">Plus ancien</option>
        <option value="amount_high">Montant décroissant</option>
        <option value="amount_low">Montant croissant</option>
      </select>
    </div>
  </div>
);

const OfferingItemCard = ({ item, index }: { item: any; index: number }) => {
  const categoryConfig = getCategoryConfig(item.category);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative flex items-center gap-3 p-3 rounded-lg 
                 bg-gradient-to-br from-gray-50 to-gray-100 
                 dark:from-gray-700/50 dark:to-gray-800/50
                 hover:from-gray-100 hover:to-gray-200
                 dark:hover:from-gray-700/70 dark:hover:to-gray-800/70
                 border border-gray-200 dark:border-gray-600
                 transition-all duration-300"
    >
      {/* Icon avec gradient background */}
      <div className={`relative w-12 h-12 rounded-xl 
                      bg-gradient-to-br ${categoryConfig.gradient}
                      flex items-center justify-center flex-shrink-0
                      shadow-sm group-hover:shadow-md transition-shadow`}>
        <span className="text-2xl filter drop-shadow-sm">{item.icon}</span>

        {/* Badge quantité */}
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full 
                       bg-purple-600 dark:bg-purple-500 
                       flex items-center justify-center
                       border-2 border-white dark:border-gray-800
                       shadow-sm">
          <span className="text-[10px] font-bold text-white">{item.quantity}</span>
        </div>
      </div>

      {/* Infos offrande */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
            {item.name}
          </p>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold 
                          ${categoryConfig.color} whitespace-nowrap`}>
            {categoryConfig.label}
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {typeof item.quantity === 'number' && typeof item.price === 'number'
            ? `${item.quantity} × ${item.price.toLocaleString()} FCFA`
            : '—'}
        </p>
      </div>

      {/* Prix total */}
      <div className="flex flex-col items-end">
        <p className="text-sm font-bold text-purple-600 dark:text-purple-400">
          {typeof item.quantity === 'number' && typeof item.price === 'number'
            ? (item.quantity * item.price).toLocaleString()
            : '—'}
        </p>
        <p className="text-[10px] text-gray-400 dark:text-gray-500">FCFA</p>
      </div>
    </motion.div>
  );
};

const TransactionCard = ({ transaction, index }: { transaction: Transaction; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isSimulated = transaction.paymentMethod === "simulation";

  // Normaliser tous les items
  const normalizedItems = useMemo(
    () => transaction.items.map(normalizeItem),
    [transaction.items]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 
                 shadow-sm hover:shadow-md transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <p className="text-sm font-mono font-semibold text-gray-900 dark:text-gray-100">
              {transaction.transactionId}
            </p>
            {isSimulated && (
              <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 
                             text-purple-700 dark:text-purple-300 text-xs font-semibold 
                             flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Simulé
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(transaction.completedAt).toLocaleString("fr-FR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
            {transaction.totalAmount.toLocaleString()}
          </p>
          <p className="text-[10px] text-gray-400 dark:text-gray-500">FCFA</p>
        </div>
      </div>

      {/* Items Preview avec icônes */}
      <div className="space-y-2">
        {/* Mini preview (fermé) */}
        {!isExpanded && (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex -space-x-2">
              {normalizedItems.slice(0, 3).map((item, idx) => (
                <div
                  key={idx}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500
                           flex items-center justify-center text-sm
                           border-2 border-white dark:border-gray-800 shadow-sm"
                >
                  {item.icon}
                </div>
              ))}
              {normalizedItems.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700
                               flex items-center justify-center text-xs font-semibold
                               border-2 border-white dark:border-gray-800 shadow-sm
                               text-gray-600 dark:text-gray-400">
                  +{normalizedItems.length - 3}
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {normalizedItems.map(i => i.name).slice(0, 2).join(", ")}
              {normalizedItems.length > 2 && "..."}
            </span>
          </div>
        )}

        {/* Bouton expand */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg
                   text-sm font-medium 
                   text-gray-700 dark:text-gray-300 
                   hover:bg-gray-50 dark:hover:bg-gray-700/50
                   transition-colors"
        >
          <span className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            {normalizedItems.length} offrande(s)
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 
                       ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>

        {/* Liste détaillée (expandée) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2 overflow-hidden"
            >
              {normalizedItems.map((item, idx) => (
                <OfferingItemCard key={item._id || idx} item={item} index={idx} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};



// =====================================================
// MAIN COMPONENT
// =====================================================
function WalletPageContent() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<TransactionFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  // Onglet actif : "transactions" ou "unused-offerings"
  const [activeTab, setActiveTab] = useState<'transactions' | 'unused-offerings'>('unused-offerings');
  // Offrandes non utilisées
  const [unusedOfferings, setUnusedOfferings] = useState<any[]>([]);
  const [isLoadingUnused, setIsLoadingUnused] = useState(false);
  const [unusedError, setUnusedError] = useState<string | null>(null);

  // Fetch offrandes non utilisées
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

  // Charger la liste quand on passe sur l'onglet
  useEffect(() => {
    if (activeTab === 'unused-offerings' && user?._id) {
      fetchUnusedOfferings();
    }
  }, [activeTab, user?._id, fetchUnusedOfferings]);

  // =====================================================
  // FETCH TRANSACTIONS
  // =====================================================
  const fetchTransactions = useCallback(async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) {
        setIsRefreshing(true);
      }

      if (!user?._id) {
        console.warn("⚠️ User ID manquant");
        setIsLoading(false);
        return;
      }

      const response = await api.get(`/wallet/transactions?userId=${user._id}`);

      if (response.status === 200) {
        const txData = response.data.transactions || response.data || [];
        setTransactions(Array.isArray(txData) ? txData : []);

        // Vérifier si une nouvelle transaction a été ajoutée
        const lastPurchase = localStorage.getItem("last_simulated_purchase");
        if (lastPurchase) {
          const purchaseData = JSON.parse(lastPurchase);
          const exists = txData.some(
            (t: Transaction) => t.transactionId === purchaseData.transactionId
          );
          if (exists) {
            setShowSuccessBanner(true);
            localStorage.removeItem("last_simulated_purchase");
          }
        }
      }
    } catch (err) {
      console.error("❌ Erreur fetch transactions:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [user?._id]);

  // =====================================================
  // INITIAL LOAD
  // =====================================================
  useEffect(() => {
    if (user?._id) {
      fetchTransactions(false);
    }
  }, [user?._id, fetchTransactions]);

  // =====================================================
  // STATS & FILTERING
  // =====================================================
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

    // Filtre par type
    if (filter === "simulation") {
      filtered = filtered.filter((t) => t.paymentMethod === "simulation");
    } else if (filter === "real") {
      filtered = filtered.filter((t) => t.paymentMethod !== "simulation");
    }

    // Recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((t) => {
        const matchId = t.transactionId.toLowerCase().includes(query);
        const matchItems = t.items.some((item) => {
          const normalized = normalizeItem(item);
          return normalized.name.toLowerCase().includes(query);
        });
        return matchId || matchItems;
      });
    }

    // Tri
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

  // =====================================================
  // RENDER
  // =====================================================
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-white \
                    dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Success Banner */}
        <AnimatePresence>
          {showSuccessBanner && (
            <SuccessBanner onDismiss={() => setShowSuccessBanner(false)} />
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Mon Panier d'Offrandes
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Gérez vos offrandes et consultez l'historique de vos transactions
          </p>
        </motion.div>

        {/* Onglets navigation */}
        <div className="flex gap-2 mb-4">
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-all \
              ${activeTab === 'unused-offerings' ? 'border-pink-500 text-pink-700 dark:text-pink-300 bg-white dark:bg-gray-800' : 'border-transparent text-gray-500 dark:text-gray-400 bg-transparent'}`}
            onClick={() => setActiveTab('unused-offerings')}
          >
            Offrandes disponibles
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-all \
              ${activeTab === 'transactions' ? 'border-purple-600 text-purple-700 dark:text-purple-300 bg-white dark:bg-gray-800' : 'border-transparent text-gray-500 dark:text-gray-400 bg-transparent'}`}
            onClick={() => setActiveTab('transactions')}
          >
            Dernières transactions
          </button>

        </div>

        {/* Contenu selon l'onglet */}
        {activeTab === 'transactions' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard label="Total transactions" value={stats.totalTransactions} icon={ShoppingBag} />
              <StatsCard label="Simulations" value={stats.simulatedTransactions} icon={Sparkles} />
              <StatsCard
                label="Total dépensé"
                value={`${stats.totalSpent.toLocaleString()} F`}
                icon={TrendingUp}
              />
              <StatsCard
                label="Total simulé"
                value={`${stats.totalSimulated.toLocaleString()} F`}
                icon={Sparkles}
                trend={stats.simulatedTransactions > 0 ? "+12%" : undefined}
              />
            </div>

            {/* Filters */}
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

            {/* Transactions List */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 \
                           flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Historique ({filteredTransactions.length})
              </h3>

              {filteredTransactions.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center \
                           border border-gray-200 dark:border-gray-700"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 \
                               flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium mb-2">
                    Aucune transaction trouvée
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Vos achats apparaîtront ici
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {filteredTransactions.map((transaction, index) => (
                    <TransactionCard key={transaction._id} transaction={transaction} index={index} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'unused-offerings' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 min-h-[300px] w-full">
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-center">Retrouve ici toutes les offrandes achetées mais pas encore utilisées pour une consultation.</p>
            {isLoadingUnused ? (
              <div className="text-gray-400 dark:text-gray-500 italic animate-pulse text-center">Chargement...</div>
            ) : unusedError ? (
              <div className="text-red-500 dark:text-red-400 italic text-center">{unusedError}</div>
            ) : unusedOfferings.length === 0 ? (
              <div className="text-gray-400 dark:text-gray-500 italic text-center">Aucune offrande à afficher</div>
            ) : (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {unusedOfferings.map((item, idx) => {
                  const o = item.offering;
                  const category = getCategoryConfig(o?.category || "animal");
                  return (
                    <motion.div
                      key={o?._id || idx}
                      whileHover={{ y: -4, boxShadow: "0 8px 32px 0 rgba(80,0,80,0.10)" }}
                      className={`relative bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl transition-all p-5 flex flex-col gap-2`}
                    >
                      {/* Badge quantité */}
                      <span className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                        x{item.quantity}
                      </span>
                      {/* Icône */}
                      <div className="text-5xl mb-2 text-center select-none">
                        {o?.icon || "📦"}
                      </div>
                      {/* Nom + catégorie */}
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{o?.name}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${category.color}`}>{category.label}</span>
                      </div>
                      {/* Description */}
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2 min-h-[32px]">{o?.description}</p>
                      {/* Prix */}
                      <div className="text-center mb-1">
                        <span className="text-base font-bold text-purple-600 dark:text-purple-300">{o?.price?.toLocaleString()} F</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/secured/marcheoffrandes")}
            className="flex-1 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 \
                     hover:from-purple-700 hover:to-pink-700 \
                     text-white font-semibold shadow-lg transition-all"
          >
            Retour au marché
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/secured/profil")}
            className="flex-1 h-12 rounded-xl bg-white dark:bg-gray-800 \
                     border border-gray-300 dark:border-gray-600 \
                     text-gray-700 dark:text-gray-300 font-semibold \
                     hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            Mon profil
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// Wrapper avec Suspense
export default function SecuredWalletPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <WalletPageContent />
    </Suspense>
  );
}
