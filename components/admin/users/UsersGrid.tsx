import { AnimatePresence, motion } from 'framer-motion';
import { Users } from 'lucide-react';
import UsersPagination from '@/components/admin/users/UsersPagination';

interface UsersGridProps {
  users: Array<any>; // Replace 'any' with your User type if available
  cardVariants: any;
  setDeleteModal: (user: any) => void;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  loading: boolean;
}

const UsersGrid = ({ users, cardVariants, setDeleteModal, totalPages, currentPage, setCurrentPage, loading }: UsersGridProps) => (
  <div className="relative">
    <AnimatePresence>
      {loading && users && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 rounded-lg flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-600 animate-spin" />
            <p className="text-sm font-semibold text-gray-900">Chargement...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    {users && users.length > 0 ? (
      <div className="space-y-4">
        {/* <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.03 } } }} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3">
          {users.map(user => (
            <UserCard key={user.id} user={user} cardVariants={cardVariants} setDeleteModal={setDeleteModal} />
          ))}
        </motion.div> */}
        <UsersPagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          loading={loading}
        />
      </div>
    ) : null}
  </div>
);

export default UsersGrid;
