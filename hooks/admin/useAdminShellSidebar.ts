import { usePathname } from 'next/navigation';
import { useAdminShell } from './useAdminShell';

export function useAdminShellSidebar() {
  const pathname = usePathname();
  const {
    user,
    isLoggingOut,
    showMobileSidebar,
    setShowMobileSidebar,
    handleLogout
  } = useAdminShell();

  return {
    user,
    isLoggingOut,
    showMobileSidebar,
    setShowMobileSidebar,
    handleLogout,
    pathname
  };
}
