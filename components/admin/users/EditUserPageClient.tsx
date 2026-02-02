'use client';
import { EditUserErrorAlert } from '@/components/admin/users/EditUserErrorAlert';
import { EditUserForm } from '@/components/admin/users/EditUserForm';
import { EditUserHeader } from '@/components/admin/users/EditUserHeader';
import { EditUserLoading } from '@/components/admin/users/EditUserLoading';
import { EditUserSuccessAlert } from '@/components/admin/users/EditUserSuccessAlert';
import { useEditUserPage } from '@/hooks/admin/useEditUserPage';

export default function EditUserPageClient() {
  const { formData, loading, saving, error, success, setError, setFormData, handleSubmit
  } = useEditUserPage();

  if (loading) { return <EditUserLoading />; }

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-slate-50 to-violet-50 p-4 sm:p-6">

      <EditUserHeader />

      {success && <EditUserSuccessAlert />}
      {error && <EditUserErrorAlert error={error} onClose={() => setError(null)} />}

      <EditUserForm
        formData={formData}
        setFormData={setFormData}
        saving={saving}
        success={success}
        onSubmit={handleSubmit}
      />
    </div>
  );
}