'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import UserCard from '@/components/admin/users/UserCard';
import Pagination from '@/components/admin/users/Pagination';
import EmptyState from '@/components/admin/users/EmptyState';
import { User } from '@/lib/interfaces';

interface UsersGridProps {
  hasUsers: boolean;
  users: User[];
  containerVariants: any;
  cardVariants: any;
  setDeleteModal: (modal: any) => void;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  handlePageChange: (page: number) => void;
  hasFilters: boolean;
  handleResetFilters: () => void;
}

export const UsersGrid = memo(function UsersGrid({
  hasUsers,
  users,
  containerVariants,
  cardVariants,
  setDeleteModal,
  currentPage,
  totalPages,
  loading,
  handlePageChange,
  hasFilters,
  handleResetFilters,
}: UsersGridProps) {
  if (!hasUsers) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="flex justify-center"
      >
        <EmptyState hasFilters={hasFilters} onReset={handleResetFilters} />
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 justify-items-center"
      >
        {users.map((user: User, idx: number) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, type: 'spring', stiffness: 200 }}
            className="w-full max-w-sm"
          >
            <UserCard
              user={user}
              cardVariants={cardVariants}
              setDeleteModal={setDeleteModal}
            />
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center"
      >
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          loading={loading}
          onPageChange={handlePageChange}
        />
      </motion.div>
    </div>
  );
});
