import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api/client';
import { Book } from '@/lib/interfaces';

export interface BookFormData {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  pageCount: string;
  category: string;
  author: string;
  isActive: boolean;
}

export type SortField = 'title' | 'price' | 'pageCount' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

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

export function useAdminBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
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
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    try {
      await api.delete(`/books/${bookId}`);
      fetchBooks();
      setDeleteConfirm(null);
    } catch (error) {
      alert('Erreur lors de la suppression du livre');
    }
  };

  const validateStep1 = (): boolean => {
    const errors: Partial<BookFormData> = {};
    if (!formData.title.trim()) errors.title = 'Le titre est requis';
    if (!formData.subtitle.trim()) errors.subtitle = 'Le sous-titre est requis';
    if (!formData.description.trim()) {
      errors.description = 'La description est requise';
    } else if (formData.description.length < 50) {
      errors.description = 'La description doit contenir au moins 50 caractères';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errors: Partial<BookFormData> = {};
    if (!formData.author.trim()) errors.author = 'L\'auteur est requis';
    if (!formData.category.trim()) errors.category = 'La catégorie est requise';
    const price = parseFloat(formData.price);
    if (!formData.price || isNaN(price) || price <= 0) errors.price = 'Le prix doit être un nombre positif';
    const pageCount = parseInt(formData.pageCount);
    if (!formData.pageCount || isNaN(pageCount) || pageCount <= 0) errors.pageCount = 'Le nombre de pages doit être un nombre positif';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      setFormErrors({});
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
    setFormErrors({});
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
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
      setFormData(initialFormData);
      setFormErrors({});
      setCurrentStep(1);
      setShowAddModal(false);
      fetchBooks();
      alert('Livre ajouté avec succès !');
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMsg = error.response?.data?.message || 'Erreur lors de l\'ajout du livre';
      alert(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const openAddModal = () => {
    setFormData(initialFormData);
    setFormErrors({});
    setCurrentStep(1);
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    if (submitting) return;
    setShowAddModal(false);
    setFormData(initialFormData);
    setFormErrors({});
    setCurrentStep(1);
  };

  const categories = useMemo(() => {
    const cats = new Set(books.map(b => b.category));
    return Array.from(cats).sort();
  }, [books]);

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

  return {
    books,
    loading,
    seeding,
    error,
    setError,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    statusFilter,
    setStatusFilter,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    showFilters,
    setShowFilters,
    deleteConfirm,
    setDeleteConfirm,
    showAddModal,
    setShowAddModal,
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    submitting,
    setSubmitting,
    fetchBooks,
    handleSeedBooks,
    handleToggleActive,
    handleDeleteBook,
    validateStep1,
    validateStep2,
    handleNextStep,
    handlePrevStep,
    handleAddBook,
    openAddModal,
    closeAddModal,
    categories,
    filteredAndSortedBooks,
    stats,
    initialFormData,
  };
}
