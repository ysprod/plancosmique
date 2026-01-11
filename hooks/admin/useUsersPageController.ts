import { useCallback, useMemo } from 'react';
import { useAdminUsersPage } from '@/hooks/admin/useAdminUsersPage';

export function useUsersPageController() {
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    roleFilter,
    setRoleFilter,
    currentPage,
    setCurrentPage,
    showFilters,
    setShowFilters,
    deleteModal,
    setDeleteModal,
    isDeleting,
    deleteSuccess,
    isRefreshing,
    users,
    stats,
    total,
    loading,
    error,
    handleRefresh,
    handleResetFilters,
    handleDeleteUser,
    totalPages,
    containerVariants,
    cardVariants,
    modalVariants,
  } = useAdminUsersPage();

  const handleSearch = useCallback(
    (value: string) => {
      setSearchQuery(value);
      setCurrentPage(1);
    },
    [setSearchQuery, setCurrentPage]
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, [setSearchQuery]);

  const handleToggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, [setShowFilters]);

  const handleStatusChange = useCallback(
    (status: 'all' | 'active' | 'inactive') => {
      setStatusFilter(status);
      setCurrentPage(1);
    },
    [setStatusFilter, setCurrentPage]
  );

  const handleRoleChange = useCallback(
    (role: 'all' | 'USER' | 'ADMIN' | 'SUPER_ADMIN') => {
      setRoleFilter(role);
      setCurrentPage(1);
    },
    [setRoleFilter, setCurrentPage]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  const handleCloseModal = useCallback(() => {
    setDeleteModal({ show: false, user: null });
  }, [setDeleteModal]);

  const handleConfirmDelete = useCallback(() => {
    if (deleteModal.user?._id) {
      handleDeleteUser(deleteModal.user._id);
    }
  }, [deleteModal.user, handleDeleteUser]);

  const hasActiveFilters = useMemo(
    () => statusFilter !== 'all' || roleFilter !== 'all',
    [statusFilter, roleFilter]
  );

  const hasFilters = useMemo(
    () => searchQuery || hasActiveFilters,
    [searchQuery, hasActiveFilters]
  );

  const hasUsers = useMemo(() => users && users.length > 0, [users]);

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    roleFilter,
    setRoleFilter,
    currentPage,
    setCurrentPage,
    showFilters,
    setShowFilters,
    deleteModal,
    setDeleteModal,
    isDeleting,
    deleteSuccess,
    isRefreshing,
    users,
    stats,
    total,
    loading,
    error,
    handleRefresh,
    handleResetFilters,
    handleDeleteUser,
    totalPages,
    containerVariants,
    cardVariants,
    modalVariants,
    handleSearch,
    handleClearSearch,
    handleToggleFilters,
    handleStatusChange,
    handleRoleChange,
    handlePageChange,
    handleCloseModal,
    handleConfirmDelete,
    hasActiveFilters,
    hasFilters,
    hasUsers,
  };
}
