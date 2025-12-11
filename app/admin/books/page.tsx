'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Plus, Edit, Trash2, Eye, Loader2, RefreshCw, 
  Search, Filter, X, ChevronDown, Save, Upload, Image as ImageIcon,
  ArrowRight, ArrowLeft, CheckCircle
} from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { api } from '@/lib/api/client';

interface Book {
  _id: string;
  bookId: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  pageCount: number;
  category: string;
  author: string;
  isActive: boolean;
  createdAt: string;
}

interface BookFormData {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  pageCount: string;
  category: string;
  author: string;
  isActive: boolean;
}

type SortField = 'title' | 'price' | 'pageCount' | 'createdAt';
type SortOrder = 'asc' | 'desc';

const initialFormData: BookFormData = {
  title: '',
  subtitle: '',
  description: '',
  price: '',
  pageCount: '',
  category: '',
  author: '',
  isActive: true,
};

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filtres et recherche
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [showFilters, setShowFilters] = useState(false);

  // Modal de suppression
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Modal d'ajout/édition - Multi-étapes
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Partial<BookFormData>>({});
  const [submitting, setSubmitting] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/books');
      const booksData = Array.isArray(response.data) ? response.data : (response.data?.books || []);
      setBooks(booksData);
      setError(null);
    } catch (err) {
      console.error('Erreur chargement livres:', err);
      setError('Impossible de charger les livres');
    } finally {
      setLoading(false);
    }
  };

  const handleSeedBooks = async () => {
    if (!confirm('Voulez-vous initialiser les 4 livres par défaut ? Cette action ne peut être effectuée qu\'une seule fois.')) {
      return;
    }

    try {
      setSeeding(true);
      await api.post('/books/seed');
      alert('Livres initialisés avec succès !');
      fetchBooks();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMsg = error.response?.data?.message || 'Erreur lors de l\'initialisation des livres';
      alert(errorMsg);
    } finally {
      setSeeding(false);
    }
  };

  const handleToggleActive = async (bookId: string, currentStatus: boolean) => {
    try {
      await api.patch(`/books/${bookId}`, { isActive: !currentStatus });
      fetchBooks();
    } catch (error) {
      console.error('Erreur mise à jour statut:', error);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    try {
      await api.delete(`/books/${bookId}`);
      fetchBooks();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Erreur suppression livre:', error);
      alert('Erreur lors de la suppression du livre');
    }
  };

  // Validation de l'étape 1
  const validateStep1 = (): boolean => {
    const errors: Partial<BookFormData> = {};

    if (!formData.title.trim()) {
      errors.title = 'Le titre est requis';
    }

    if (!formData.subtitle.trim()) {
      errors.subtitle = 'Le sous-titre est requis';
    }

    if (!formData.description.trim()) {
      errors.description = 'La description est requise';
    } else if (formData.description.length < 50) {
      errors.description = 'La description doit contenir au moins 50 caractères';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validation de l'étape 2
  const validateStep2 = (): boolean => {
    const errors: Partial<BookFormData> = {};

    if (!formData.author.trim()) {
      errors.author = 'L\'auteur est requis';
    }

    if (!formData.category.trim()) {
      errors.category = 'La catégorie est requise';
    }

    const price = parseFloat(formData.price);
    if (!formData.price || isNaN(price) || price <= 0) {
      errors.price = 'Le prix doit être un nombre positif';
    }

    const pageCount = parseInt(formData.pageCount);
    if (!formData.pageCount || isNaN(pageCount) || pageCount <= 0) {
      errors.pageCount = 'Le nombre de pages doit être un nombre positif';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Passer à l'étape suivante
  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      setFormErrors({});
    }
  };

  // Revenir à l'étape précédente
  const handlePrevStep = () => {
    setCurrentStep(1);
    setFormErrors({});
  };

  // Gestion de l'ajout de livre
  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) {
      return;
    }

    try {
      setSubmitting(true);

      const bookData = {
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim(),
        description: formData.description.trim(),
        author: formData.author.trim(),
        category: formData.category.trim(),
        price: parseFloat(formData.price),
        pageCount: parseInt(formData.pageCount),
        isActive: formData.isActive,
      };

      await api.post('/books', bookData);
      
      // Réinitialiser le formulaire
      setFormData(initialFormData);
      setFormErrors({});
      setCurrentStep(1);
      setShowAddModal(false);
      
      // Rafraîchir la liste
      fetchBooks();
      
      alert('Livre ajouté avec succès !');
    } catch (err) {
      console.error('Erreur ajout livre:', err);
      const error = err as { response?: { data?: { message?: string } } };
      const errorMsg = error.response?.data?.message || 'Erreur lors de l\'ajout du livre';
      alert(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  // Ouvrir le modal d'ajout
  const openAddModal = () => {
    setFormData(initialFormData);
    setFormErrors({});
    setCurrentStep(1);
    setShowAddModal(true);
  };

  // Fermer le modal
  const closeAddModal = () => {
    if (submitting) return;
    setShowAddModal(false);
    setFormData(initialFormData);
    setFormErrors({});
    setCurrentStep(1);
  };

  // Catégories uniques
  const categories = useMemo(() => {
    const cats = new Set(books.map(b => b.category));
    return Array.from(cats).sort();
  }, [books]);

  // Filtrage et tri
  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter(book => {
      const matchesSearch = searchQuery === '' || 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;

      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'active' && book.isActive) ||
        (statusFilter === 'inactive' && !book.isActive);

      return matchesSearch && matchesCategory && matchesStatus;
    });

    filtered.sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];

      if (sortField === 'createdAt') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [books, searchQuery, selectedCategory, statusFilter, sortField, sortOrder]);

  // Stats
  const stats = useMemo(() => ({
    total: books.length,
    active: books.filter(b => b.isActive).length,
    totalRevenue: books.reduce((sum, b) => sum + b.price, 0),
    totalPages: books.reduce((sum, b) => sum + b.pageCount, 0),
    averagePrice: books.length > 0 ? Math.round(books.reduce((sum, b) => sum + b.price, 0) / books.length) : 0,
  }), [books]);

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-semibold">Chargement des livres...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              Gestion des Livres
            </h1>
            <p className="text-gray-600 mt-2">
              Gérez votre catalogue de {books.length} livre{books.length > 1 ? 's' : ''} PDF
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchBooks}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 
                       text-gray-700 rounded-xl font-semibold transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Actualiser
            </motion.button>

            {books.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openAddModal}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 
                         text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="w-5 h-5" />
                Ajouter un livre
              </motion.button>
            )}

            {books.length === 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSeedBooks}
                disabled={seeding}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 
                         text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {seeding ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Initialisation...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Initialiser les livres
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Message d'erreur */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-red-700 font-semibold">{error}</p>
              <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 border-2 border-indigo-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 font-semibold mb-1">Total Livres</p>
              <p className="text-3xl font-black text-gray-900">{stats.total}</p>
            </div>
            <BookOpen className="w-10 h-10 text-indigo-600 opacity-20" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 font-semibold mb-1">Actifs</p>
              <p className="text-3xl font-black text-green-600">{stats.active}</p>
            </div>
            <Eye className="w-10 h-10 text-green-600 opacity-20" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 font-semibold mb-1">Revenu Total</p>
              <p className="text-xl font-black text-gray-900">
                {stats.totalRevenue.toLocaleString('fr-FR')} F
              </p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 font-semibold mb-1">Total Pages</p>
              <p className="text-3xl font-black text-gray-900">{stats.totalPages}</p>
            </div>
            <div className="text-3xl">📄</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 font-semibold mb-1">Prix Moyen</p>
              <p className="text-xl font-black text-gray-900">
                {stats.averagePrice.toLocaleString('fr-FR')} F
              </p>
            </div>
            <div className="text-3xl">📊</div>
          </div>
        </motion.div>
      </div>

      {/* Barre de recherche et filtres */}
      {books.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-white rounded-2xl shadow-lg p-4 border-2 border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par titre, auteur, description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 
                           focus:outline-none font-medium transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  showFilters
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Filter className="w-5 h-5" />
                Filtres
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </motion.button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-4 mt-4 border-t-2 border-gray-100"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Catégorie
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-indigo-500 
                                 focus:outline-none font-medium transition-all"
                      >
                        <option value="all">Toutes les catégories</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Statut
                      </label>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-indigo-500 
                                 focus:outline-none font-medium transition-all"
                      >
                        <option value="all">Tous les statuts</option>
                        <option value="active">Actifs uniquement</option>
                        <option value="inactive">Inactifs uniquement</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Trier par
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={sortField}
                          onChange={(e) => setSortField(e.target.value as SortField)}
                          className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-indigo-500 
                                   focus:outline-none font-medium transition-all"
                        >
                          <option value="title">Titre</option>
                          <option value="price">Prix</option>
                          <option value="pageCount">Pages</option>
                          <option value="createdAt">Date</option>
                        </select>
                        <button
                          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
                          title={sortOrder === 'asc' ? 'Croissant' : 'Décroissant'}
                        >
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        setStatusFilter('all');
                        setSortField('createdAt');
                        setSortOrder('desc');
                      }}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-bold"
                    >
                      Réinitialiser tous les filtres
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {(searchQuery || selectedCategory !== 'all' || statusFilter !== 'all') && (
            <div className="mt-4 text-sm text-gray-600">
              <span className="font-semibold">{filteredAndSortedBooks.length}</span> résultat{filteredAndSortedBooks.length > 1 ? 's' : ''} trouvé{filteredAndSortedBooks.length > 1 ? 's' : ''}
            </div>
          )}
        </motion.div>
      )}

      {/* Liste des livres */}
      {books.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-gray-200"
        >
          <BookOpen className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Aucun livre disponible
          </h3>
          <p className="text-gray-600 mb-6">
            Cliquez sur "Initialiser les livres" pour ajouter les 4 livres par défaut
          </p>
        </motion.div>
      ) : filteredAndSortedBooks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-gray-200"
        >
          <Search className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Aucun résultat
          </h3>
          <p className="text-gray-600 mb-6">
            Essayez de modifier vos critères de recherche ou vos filtres
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedBooks.map((book, index) => (
              <motion.div
                key={book._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 
                         hover:border-indigo-300 hover:shadow-xl transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-xl 
                                    flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-8 h-8 text-indigo-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-black text-gray-900 mb-1 line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-sm font-semibold text-indigo-600 mb-2 line-clamp-1">
                          {book.subtitle}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
                          <span className="flex items-center gap-1">
                            👤 {book.author}
                          </span>
                          <span>•</span>
                          <span>{book.pageCount} pages</span>
                          <span>•</span>
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-bold">
                            {book.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleToggleActive(book.bookId, book.isActive)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex-shrink-0 ${
                        book.isActive
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {book.isActive ? '✓ Actif' : '✗ Inactif'}
                    </motion.button>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {book.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Prix de vente</p>
                      <p className="text-2xl font-black text-gray-900">
                        {book.price.toLocaleString('fr-FR')} 
                        <span className="text-sm font-normal text-gray-600"> FCFA</span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2.5 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all"
                        title="Modifier"
                        onClick={() => alert('Fonctionnalité de modification à implémenter')}
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2.5 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all"
                        title="Supprimer"
                        onClick={() => setDeleteConfirm(book.bookId)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-xs text-gray-400 font-mono">
                      ID: {book.bookId}
                    </p>
                    <p className="text-xs text-gray-400">
                      Créé le {new Date(book.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Modal d'ajout de livre - 2 étapes */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={closeAddModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header avec indicateur d'étapes */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl 
                                  flex items-center justify-center">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900">
                        Ajouter un nouveau livre
                      </h3>
                      <p className="text-sm text-gray-600">
                        Étape {currentStep} sur 2
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeAddModal}
                    disabled={submitting}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                {/* Indicateur de progression */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      currentStep === 1
                        ? 'bg-indigo-600 text-white'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {currentStep === 1 ? '1' : <CheckCircle className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                          initial={{ width: '0%' }}
                          animate={{ width: currentStep >= 1 ? '100%' : '0%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <p className="text-xs font-semibold text-gray-600 mt-1">
                        Informations principales
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      currentStep === 2
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      2
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                          initial={{ width: '0%' }}
                          animate={{ width: currentStep === 2 ? '100%' : '0%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <p className="text-xs font-semibold text-gray-600 mt-1">
                        Détails & Prix
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulaire */}
              <form onSubmit={handleAddBook}>
                <AnimatePresence mode="wait">
                  {/* Étape 1 : Informations principales */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-5"
                    >
                      {/* Titre */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Titre du livre <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-medium transition-all ${
                            formErrors.title
                              ? 'border-red-300 focus:border-red-500'
                              : 'border-gray-200 focus:border-indigo-500'
                          }`}
                          placeholder="Ex: Guide Complet du Développement Web"
                          disabled={submitting}
                        />
                        {formErrors.title && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
                        )}
                      </div>

                      {/* Sous-titre */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Sous-titre <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.subtitle}
                          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-medium transition-all ${
                            formErrors.subtitle
                              ? 'border-red-300 focus:border-red-500'
                              : 'border-gray-200 focus:border-indigo-500'
                          }`}
                          placeholder="Ex: De débutant à expert en 30 jours"
                          disabled={submitting}
                        />
                        {formErrors.subtitle && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.subtitle}</p>
                        )}
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Description complète <span className="text-red-500">*</span>
                          <span className="text-gray-400 font-normal ml-2">
                            (min. 50 caractères)
                          </span>
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={6}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-medium transition-all resize-none ${
                            formErrors.description
                              ? 'border-red-300 focus:border-red-500'
                              : 'border-gray-200 focus:border-indigo-500'
                          }`}
                          placeholder="Décrivez le contenu du livre en détail, les sujets abordés, ce que les lecteurs apprendront..."
                          disabled={submitting}
                        />
                        <div className="flex items-center justify-between mt-1">
                          {formErrors.description ? (
                            <p className="text-sm text-red-600">{formErrors.description}</p>
                          ) : (
                            <p className={`text-sm ${formData.description.length >= 50 ? 'text-green-600' : 'text-gray-500'}`}>
                              {formData.description.length} / 50 caractères {formData.description.length >= 50 && '✓'}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Bouton Suivant */}
                      <div className="flex justify-end pt-4">
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleNextStep}
                          className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 
                                   hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-bold 
                                   shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                        >
                          Suivant
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Étape 2 : Détails & Prix */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      {/* Auteur et Catégorie */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Auteur <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-medium transition-all ${
                              formErrors.author
                                ? 'border-red-300 focus:border-red-500'
                                : 'border-gray-200 focus:border-indigo-500'
                            }`}
                            placeholder="Ex: Jean Dupont"
                            disabled={submitting}
                          />
                          {formErrors.author && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.author}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Catégorie <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-medium transition-all ${
                              formErrors.category
                                ? 'border-red-300 focus:border-red-500'
                                : 'border-gray-200 focus:border-indigo-500'
                            }`}
                            placeholder="Ex: Programmation"
                            disabled={submitting}
                            list="categories-list"
                          />
                          {categories.length > 0 && (
                            <datalist id="categories-list">
                              {categories.map(cat => (
                                <option key={cat} value={cat} />
                              ))}
                            </datalist>
                          )}
                          {formErrors.category && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.category}</p>
                          )}
                        </div>
                      </div>

                      {/* Prix et Pages */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Prix de vente (FCFA) <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={formData.price}
                              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-medium transition-all ${
                                formErrors.price
                                  ? 'border-red-300 focus:border-red-500'
                                  : 'border-gray-200 focus:border-indigo-500'
                              }`}
                              placeholder="5000"
                              min="0"
                              step="100"
                              disabled={submitting}
                            />
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">
                              FCFA
                            </span>
                          </div>
                          {formErrors.price && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.price}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Nombre de pages <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            value={formData.pageCount}
                            onChange={(e) => setFormData({ ...formData, pageCount: e.target.value })}
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-medium transition-all ${
                              formErrors.pageCount
                                ? 'border-red-300 focus:border-red-500'
                                : 'border-gray-200 focus:border-indigo-500'
                            }`}
                            placeholder="250"
                            min="1"
                            disabled={submitting}
                          />
                          {formErrors.pageCount && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.pageCount}</p>
                          )}
                        </div>
                      </div>

                      {/* Statut d'activation */}
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-xl border-2 border-indigo-100">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-0.5"
                            disabled={submitting}
                          />
                          <label htmlFor="isActive" className="cursor-pointer flex-1">
                            <span className="text-sm font-bold text-gray-900 block mb-1">
                              Activer ce livre immédiatement
                            </span>
                            <span className="text-xs text-gray-600">
                              Le livre sera visible et disponible à l'achat dès sa création
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Boutons de navigation */}
                      <div className="flex gap-3 pt-4">
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handlePrevStep}
                          disabled={submitting}
                          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 
                                   rounded-xl font-bold transition-all disabled:opacity-50 
                                   flex items-center gap-2"
                        >
                          <ArrowLeft className="w-5 h-5" />
                          Précédent
                        </motion.button>
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={submitting}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 
                                   hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-bold 
                                   shadow-lg hover:shadow-xl transition-all disabled:opacity-50 
                                   flex items-center justify-center gap-2"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Ajout en cours...
                            </>
                          ) : (
                            <>
                              <Save className="w-5 h-5" />
                              Ajouter le livre
                            </>
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de confirmation de suppression */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">
                  Confirmer la suppression
                </h3>
                <p className="text-gray-600">
                  Êtes-vous sûr de vouloir supprimer ce livre ? Cette action est irréversible.
                </p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 
                           rounded-xl font-bold transition-all"
                >
                  Annuler
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeleteBook(deleteConfirm)}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white 
                           rounded-xl font-bold transition-all"
                >
                  Supprimer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
