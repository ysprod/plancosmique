import { memo } from 'react';
import DeleteUserModal from '@/components/users/DeleteUserModal';
import PageHeader from '@/components/admin/users/PageHeader';
import RefreshBanner from '@/components/admin/users/RefreshBanner';
import { BackgroundOrbs } from '@/components/admin/users/BackgroundOrbs';
import { StatsSection } from '@/components/admin/users/StatsSection';
import { SearchSection } from '@/components/admin/users/SearchSection';
import { LoadingOverlay } from '@/components/admin/users/LoadingOverlay';
import { UsersGrid } from '@/components/admin/users/UsersGrid';
import { AnimatePresence, motion } from 'framer-motion';

export const UsersPageContent = memo(function UsersPageContent({
  controller
}: {
  controller: any;
}) {
  const {
    deleteModal,
    isDeleting,
    deleteSuccess,
    handleCloseModal,
    handleConfirmDelete,
    modalVariants,
    total,
    isRefreshing,
    loading,
    handleRefresh,
    stats,
    searchQuery,
    handleSearch,
    handleClearSearch,
    showFilters,
    hasActiveFilters,
    handleToggleFilters,
    statusFilter,
    roleFilter,
    handleStatusChange,
    handleRoleChange,
    handleResetFilters,
    users,
    containerVariants,
    cardVariants,
    setDeleteModal,
    currentPage,
    totalPages,
    handlePageChange,
    hasUsers,
    hasFilters,
  } = controller;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/40 dark:from-gray-900 dark:via-purple-950/30 dark:to-blue-950/40 overflow-hidden">
      <BackgroundOrbs />
      
      <DeleteUserModal
        show={deleteModal.show}
        user={deleteModal.user}
        isDeleting={isDeleting}
        deleteSuccess={deleteSuccess}
        onClose={handleCloseModal}
        onDelete={handleConfirmDelete}
        modalVariants={modalVariants}
      />
      
      <PageHeader
        total={total}
        isRefreshing={isRefreshing}
        loading={loading}
        onRefresh={handleRefresh}
      />
      
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 py-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="flex justify-center"
        >
          <AnimatePresence>
            <RefreshBanner
              loading={loading}
              isRefreshing={isRefreshing}
              hasUsers={hasUsers}
            />
          </AnimatePresence>
        </motion.div>

        <StatsSection stats={stats} />

        <SearchSection
          searchQuery={searchQuery}
          loading={loading}
          handleSearch={handleSearch}
          handleClearSearch={handleClearSearch}
          showFilters={showFilters}
          hasActiveFilters={hasActiveFilters}
          handleToggleFilters={handleToggleFilters}
          statusFilter={statusFilter}
          roleFilter={roleFilter}
          handleStatusChange={handleStatusChange}
          handleRoleChange={handleRoleChange}
          handleResetFilters={handleResetFilters}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <LoadingOverlay loading={loading} users={users} />
          
          <UsersGrid
            hasUsers={hasUsers}
            users={users}
            containerVariants={containerVariants}
            cardVariants={cardVariants}
            setDeleteModal={setDeleteModal}
            currentPage={currentPage}
            totalPages={totalPages}
            loading={loading}
            handlePageChange={handlePageChange}
            hasFilters={hasFilters}
            handleResetFilters={handleResetFilters}
          />
        </motion.div>
      </div>
    </div>
  );
});
