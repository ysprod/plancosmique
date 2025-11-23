'use client';

import { ProtectedRoute, RoleGuard } from "@/components/auth";
import UsersList from "@/components/users/UsersList";
import { Role } from "@/types/auth.types";

 

export default function UsersManagementPage() {
  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={[Role.SUPER_ADMIN, Role.ADMIN]}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 p-6">
          <div className="max-w-7xl mx-auto">
            <UsersList 
              onCreateUser={() => {
                // Rediriger vers la page de création
                window.location.href = '/dashboard/admin/users/create';
              }}
              onUserSelect={(user) => {
                // Rediriger vers la page de détails
                window.location.href = `/dashboard/admin/users/${user._id}`;
              }}
            />
          </div>
        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
}
