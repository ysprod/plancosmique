'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api/client';
import Link from 'next/link';
import type { AxiosError } from 'axios';
import {
  Heart,
  Loader2,
  ArrowLeft,
  BookOpen,
  Search,
  Filter,
  Star
} from 'lucide-react';

interface FavoritePractice {
  _id: string;
  slug: string;
  title: string;
  description: string;
  category?: string;
  createdAt?: string;
}

interface ApiResponse {
  success: boolean;
  data: FavoritePractice[];
  count: number;
}

const categoryColors: Record<string, { gradient: string; bg: string; text: string }> = {
  'bases': { gradient: 'from-purple-600 to-indigo-600', bg: 'bg-purple-50', text: 'text-purple-700' },
  'protection': { gradient: 'from-blue-600 to-cyan-600', bg: 'bg-blue-50', text: 'text-blue-700' },
  'abondance': { gradient: 'from-yellow-600 to-amber-600', bg: 'bg-yellow-50', text: 'text-yellow-700' },
  'ancetres': { gradient: 'from-orange-600 to-red-600', bg: 'bg-orange-50', text: 'text-orange-700' },
  'meditations': { gradient: 'from-pink-600 to-rose-600', bg: 'bg-pink-50', text: 'text-pink-700' },
};

export default function MesFavorisPage() {
  const [favorites, setFavorites] = useState<FavoritePractice[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<FavoritePractice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tous les favoris' },
    { id: 'bases', label: 'Bases' },
    { id: 'protection', label: 'Protection' },
    { id: 'abondance', label: 'Abondance' },
    { id: 'ancetres', label: 'Ancêtres' },
    { id: 'meditations', label: 'Méditations' },
  ];

  // Charger les favoris
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const { data } = await api.get<ApiResponse>('/spiritualite');
        if (data?.data && Array.isArray(data.data)) {
          // Pour cette démo, on affiche toutes les pratiques comme favoris
          // En production, il faudrait une vraie API /favorites
          setFavorites(data.data);
        }
      } catch (err) {
        // Erreur silencieuse - la page affiche un message vide
        console.error('Erreur de chargement:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // Filtrer et rechercher
  useEffect(() => {
    let filtered = favorites;

    // Filtre par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(fav => fav.category === selectedCategory);
    }

    // Recherche
    if (searchQuery.trim()) {
      filtered = filtered.filter(fav =>
        fav.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fav.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredFavorites(filtered);
  }, [favorites, searchQuery, selectedCategory]);

  const handleRemoveFavorite = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce favori ?')) {
      return;
    }

    setFavorites(favorites.filter(fav => fav._id !== id));
    // En production: await api.delete(`/favorites/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-orange-50 pt-20 px-4">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
            <p className="text-slate-600 font-semibold">Chargement de vos favoris...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-orange-50 pt-20 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-r from-pink-900 via-fuchsia-800 to-purple-900 text-white py-16 px-6"
      >
        <div className="absolute inset-0 opacity-20">
          <Heart className="absolute w-32 h-32 top-4 right-8 animate-pulse" />
          <Star className="absolute w-24 h-24 bottom-8 left-12 animate-pulse" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <Link
            href="/protected/profil"
            className="inline-flex items-center gap-2 text-pink-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour au profil
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 flex items-center gap-3">
              <Heart className="w-12 h-12 text-pink-400 fill-pink-400" />
              Mes Favoris
            </h1>
            <p className="text-xl text-pink-100 max-w-2xl">
              Retrouvez toutes les pratiques spirituelles que vous aimez
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Barre de recherche et filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 space-y-4"
        >
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher dans vos favoris..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 
                         focus:border-pink-500 focus:outline-none transition-colors
                         bg-white text-slate-900 placeholder-slate-400 font-medium"
            />
          </div>

          {/* Filtres par catégorie */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                    : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-pink-300'
                }`}
              >
                <Filter className="w-4 h-4 inline mr-2" />
                {cat.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Message vide */}
        {filteredFavorites.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-2xl font-bold text-slate-900 mb-2">
              Aucun favori trouvé
            </p>
            <p className="text-slate-600 mb-8">
              {searchQuery || selectedCategory !== 'all'
                ? 'Affinez votre recherche'
                : 'Commencez par ajouter des pratiques à vos favoris'}
            </p>
            <Link href="/protected/spiritualite">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 
                           text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                Découvrir les pratiques
              </motion.button>
            </Link>
          </motion.div>
        )}

        {/* Grille des favoris */}
        {filteredFavorites.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredFavorites.map((favorite, index) => {
                const colors = categoryColors[favorite.category || 'bases'] || categoryColors['bases'];
                
                return (
                  <motion.div
                    key={favorite._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative"
                  >
                    <Link href={`/protected/spiritualite/${favorite.slug}`}>
                      <div className={`relative bg-gradient-to-br ${colors.gradient} rounded-2xl overflow-hidden 
                                    shadow-lg hover:shadow-2xl transition-all hover:scale-105 cursor-pointer h-full`}>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />

                        <div className="relative p-8 h-80 flex flex-col justify-between">
                          <div>
                            {favorite.category && (
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`inline-block px-3 py-1 rounded-lg ${colors.bg} ${colors.text} 
                                           text-xs font-bold mb-3`}
                              >
                                {favorite.category}
                              </motion.div>
                            )}

                            <h3 className="text-2xl font-bold text-white mb-2">{favorite.title}</h3>
                            <p className="text-white/80 text-sm line-clamp-3">{favorite.description}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white/90 group-hover:text-white transition-colors">
                              <BookOpen className="w-5 h-5" />
                              <span className="text-sm font-semibold">Lire</span>
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.2, rotate: 15 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.preventDefault();
                                handleRemoveFavorite(favorite._id);
                              }}
                              className="p-2 rounded-lg bg-white/20 hover:bg-red-500 text-white 
                                        transition-all duration-300"
                              title="Supprimer des favoris"
                            >
                              <Heart className="w-5 h-5 fill-current" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Statistiques */}
        {filteredFavorites.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 p-6 bg-white rounded-2xl shadow-lg border-2 border-pink-100"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-black bg-gradient-to-r from-pink-600 to-rose-600 
                             text-transparent bg-clip-text">
                  {filteredFavorites.length}
                </p>
                <p className="text-slate-600 font-semibold mt-1">
                  {filteredFavorites.length === 1 ? 'Favori' : 'Favoris'}
                </p>
              </div>

              {selectedCategory !== 'all' && (
                <div>
                  <p className="text-3xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 
                               text-transparent bg-clip-text">
                    {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                  </p>
                  <p className="text-slate-600 font-semibold mt-1">Catégorie active</p>
                </div>
              )}

              <div>
                <p className="text-3xl font-black bg-gradient-to-r from-orange-600 to-pink-600 
                             text-transparent bg-clip-text">
                  {favorites.length}
                </p>
                <p className="text-slate-600 font-semibold mt-1">Total de favoris</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
