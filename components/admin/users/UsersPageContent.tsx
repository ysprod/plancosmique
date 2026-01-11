import DeleteUserModal from '@/components/users/DeleteUserModal';
import PageHeader from '@/components/admin/users/PageHeader';
import RefreshBanner from '@/components/admin/users/RefreshBanner';
import UsersStats from '@/components/users/UsersStats';
import SearchBar from '@/components/admin/users/SearchBar';
import FilterButton from '@/components/admin/users/FilterButton';
import FilterPanel from '@/components/admin/users/FilterPanel';
import UserCard from '@/components/users/UserCard';
import Pagination from '@/components/admin/users/Pagination';
import EmptyState from '@/components/admin/users/EmptyState';
import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { User } from '@/lib/interfaces';

export function UsersPageContent({
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

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.15 } },
    exit: { opacity: 0, transition: { duration: 0.1 } }
  };
console.log('Rendering UsersPageContent with users:', users);
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 space-y-4">
        <AnimatePresence>
          <RefreshBanner
            loading={loading}
            isRefreshing={isRefreshing}
            hasUsers={hasUsers}
          />
        </AnimatePresence>
        {stats && <UsersStats stats={stats} />}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex gap-2 mb-2">
            <SearchBar
              searchQuery={searchQuery}
              loading={loading}
              onSearch={handleSearch}
              onClear={handleClearSearch}
            />
            <FilterButton
              showFilters={showFilters}
              hasActiveFilters={hasActiveFilters}
              loading={loading}
              onClick={handleToggleFilters}
            />
          </div>
          <AnimatePresence>
            {showFilters && (
              <FilterPanel
                statusFilter={statusFilter}
                roleFilter={roleFilter}
                loading={loading}
                hasActiveFilters={hasActiveFilters}
                onStatusChange={handleStatusChange}
                onRoleChange={handleRoleChange}
                onReset={handleResetFilters}
              />
            )}
          </AnimatePresence>
        </motion.div>
        <div className="relative">
          <AnimatePresence>
            {loading && users && (
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 rounded-lg flex items-center justify-center"
              >
                <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                  <p className="text-sm font-semibold text-gray-900">Chargement...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {hasUsers ? (
            <div className="space-y-4">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
              >
                {users.map((user: User) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    cardVariants={cardVariants}
                    setDeleteModal={setDeleteModal}
                  />
                ))}
              </motion.div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                loading={loading}
                onPageChange={handlePageChange}
              />
            </div>
          ) : (
            <EmptyState hasFilters={hasFilters} onReset={handleResetFilters} />
          )}
        </div>
      </div>
    </div>
  );
}
