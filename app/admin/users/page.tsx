'use client';
import { useUsersPageController } from '@/hooks/admin/useUsersPageController';
import { UsersPageError, UsersPageLoading } from '@/components/admin/users/UsersPageStates';
import { UsersPageContent } from '@/components/admin/users/UsersPageContent';

export default function UsersPage() {
  const controller = useUsersPageController();

  if (controller.error) {
    return <UsersPageError error={controller.error} handleRefresh={controller.handleRefresh} isRefreshing={controller.isRefreshing} />;
  }
  if (controller.loading) { return <UsersPageLoading />; }
  return <UsersPageContent controller={controller} />;
}