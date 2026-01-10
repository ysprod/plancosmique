import { useCallback, useMemo, useState } from 'react';
import api from '@/lib/api/client';
import { useAdminUsers } from '@/hooks/admin/useAdminUsers';
import { User } from '@/lib/interfaces';

export type UserStatus = 'all' | 'active' | 'inactive';
export type UserRole = 'all' | 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export function useAdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<UserStatus>('all');
  const [roleFilter, setRoleFilter] = useState<UserRole>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; user: User | null }>({ show: false, user: null });
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { users: apiUsers, total, loading, error, refetch } = useAdminUsers({
    search: searchQuery,
    status: statusFilter,
    role: roleFilter,
    page: currentPage,
    limit: 18,
  });

  const mapUserToUserData = (user: any): User => ({
    id: user.id,
    email: user.email,
    nom: user.nom ?? user.lastName ?? '',
    prenom: user.prenom ?? user.firstName ?? '',
    username: user.username,
    phone: user.phone ?? user.telephone,
    status: user.status ?? 'active',
    isActive: user.isActive,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin ?? '',
    consultationsCount: user.consultationsCount ?? 0,
    totalConsultations: user.totalConsultations ?? user.consultationsCount ?? 0,
    rating: user.rating ?? 0,
    credits: user.credits ?? 0,
    country: user.country ?? '',
    gender: user.gender === 'M' || user.gender === 'F' || user.gender === 'Other' ? user.gender : 'Other',
    premium: user.premium || false,
    role: user.role,
    avatar: user.avatar ?? '',
    customPermissions: user.customPermissions ?? [],
    dateOfBirth: user.dateOfBirth ?? undefined,
    updatedAt: user.updatedAt ?? new Date(),
  });

  const users: User[] = useMemo(() => (apiUsers ? apiUsers.map(mapUserToUserData) : []), [apiUsers]);
  const stats = useMemo(() => {
    if (!users) return null;
    return {
      total: users.length,
      active: users.filter(u => u.isActive).length,
      inactive: users.filter(u => !u.isActive).length,
      admins: users.filter(u => u.role === 'ADMIN').length,
      verified: users.filter(u => u.emailVerified).length,
    };
  }, [users]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [refetch]);

  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setStatusFilter('all');
    setRoleFilter('all');
    setCurrentPage(1);
  }, []);

  const handleDeleteUser = useCallback(async (userId: string) => {
    setIsDeleting(true);
    try {
      await api.delete(`/admin/users/${userId}`);
      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteModal({ show: false, user: null });
        setDeleteSuccess(false);
        setIsDeleting(false);
        refetch();
      }, 1500);
    } catch (error: any) {
      console.error('Erreur suppression:', error);
      alert(error?.response?.data?.message || error?.message || 'Erreur lors de la suppression');
      setIsDeleting(false);
    }
  }, [refetch]);

  const totalPages = Math.ceil(total / 18);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.03 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } }
  };

  return {
    searchQuery, setSearchQuery,
    statusFilter, setStatusFilter,
    roleFilter, setRoleFilter,
    currentPage, setCurrentPage,
    showFilters, setShowFilters,
    deleteModal, setDeleteModal,
    isDeleting, setIsDeleting,
    deleteSuccess, setDeleteSuccess,
    isRefreshing, setIsRefreshing,
    users, stats, total, loading, error, refetch,
    handleRefresh, handleResetFilters, handleDeleteUser,
    totalPages, containerVariants, cardVariants, modalVariants
  };
}
