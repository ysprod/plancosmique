import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import UserCard from '@/components/admin/users/UserCard';
import Pagination from '@/components/admin/users/Pagination';
import EmptyState from '@/components/admin/users/EmptyState';
import React from 'react';

export function UsersList({
  users,
  loading,
  hasUsers,
  hasFilters,
  overlayVariants,
  containerVariants,
  cardVariants,
  currentPage,
  totalPages,
  onPageChange,
  setDeleteModal
}: any) {
  return (
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
            {users.map((user: any) => (
              <UserCard
                key={user.id}
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
            onPageChange={onPageChange}
          />
        </div>
      ) : (
        <EmptyState hasFilters={hasFilters} onReset={() => { }} />
      )}
    </div>
  );
}