"use client";
import StatsCounter from "@/components/commons/StatsCounter";
import AnimatedBackground from "@/components/profil/AnimatedBackground";
import ProfilCategories from "@/components/profil/ProfilCategories";
import ProfilHighlightCards from "@/components/profil/ProfilHighlightCards";
import ProfilNonPremiumSection from "@/components/profil/ProfilNonPremiumSection";
import TopProgressBar from "@/components/profil/TopProgressBar";
import { useProfilUser } from "@/hooks/commons/useProfilUser";
import { useProfilCategories } from "@/hooks/profil/useProfilCategories";
import { useProfilHighlightCards } from "@/hooks/profil/useProfilHighlightCards";
import { useQueryClient } from "@tanstack/react-query";

export default function ProfilPageClient() {
  const { userdata, loading } = useProfilUser();
  const highlightCards = useProfilHighlightCards();
  const categories = useProfilCategories();
  const queryClient = useQueryClient();
  
  // Récupérer tout le cache
  const cache = queryClient.getQueryCache();
  const allQueries = cache.getAll();
  console.log("All Queries in Cache:", allQueries);
  console.log("User Data:", cache);

  return (
    <div>
      <AnimatedBackground />
      <TopProgressBar />

      <div className="relative z-10 px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl mx-auto">
        {/* Debug Cache TanStack Query */}
        <div className="mb-6 p-4 bg-gray-900/90 backdrop-blur rounded-xl border border-purple-500/30 shadow-lg">
          <h2 className="text-xl font-bold text-purple-400 mb-3">🔍 Cache TanStack Query</h2>
          <div className="text-xs text-gray-300 space-y-2 max-h-96 overflow-y-auto">
            <p className="text-green-400 font-semibold">Total queries en cache: {allQueries.length}</p>
            {allQueries.map((query, index) => {
              const queryKey = query.queryKey;
              const queryState = query.state;
              return (
                <div key={index} className="p-3 bg-gray-800/50 rounded border border-gray-700 hover:border-purple-500/50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-purple-300">Query #{index + 1}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      queryState.status === 'success' ? 'bg-green-600/30 text-green-300' :
                      queryState.status === 'error' ? 'bg-red-600/30 text-red-300' :
                      queryState.status === 'pending' ? 'bg-yellow-600/30 text-yellow-300' :
                      'bg-gray-600/30 text-gray-300'
                    }`}>
                      {queryState.status}
                    </span>
                  </div>
                  <div className="mb-1">
                    <span className="text-gray-400">Key:</span>{' '}
                    <code className="text-blue-300">{JSON.stringify(queryKey)}</code>
                  </div>
                  <div className="mb-1">
                    <span className="text-gray-400">Data Updated:</span>{' '}
                    <span className="text-pink-300">
                      {queryState.dataUpdatedAt ? new Date(queryState.dataUpdatedAt).toLocaleString('fr-FR') : 'N/A'}
                    </span>
                  </div>
                  {(queryState.data as any) && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-cyan-400 hover:text-cyan-300">Voir les données</summary>
                      <pre className="mt-2 p-2 bg-black/50 rounded text-[10px] overflow-x-auto">
                        {JSON.stringify(queryState.data as any, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {userdata?.premium && (
          <>
            <ProfilHighlightCards cards={highlightCards} />
            <ProfilCategories categories={categories} />
          </>
        )}
        {!userdata?.premium && !loading && <ProfilNonPremiumSection userdata={userdata} />}
      </div>

      <StatsCounter />
      <div className="h-16 sm:h-20" />
    </div>
  );
}
