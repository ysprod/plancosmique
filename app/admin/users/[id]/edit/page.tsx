'use client';
import { EditUserErrorAlert } from '@/components/admin/users/EditUserErrorAlert';
import { EditUserForm } from '@/components/admin/users/EditUserForm';
import { EditUserHeader } from '@/components/admin/users/EditUserHeader';
import { EditUserLoading } from '@/components/admin/users/EditUserLoading';
import { EditUserSuccessAlert } from '@/components/admin/users/EditUserSuccessAlert';
import { useEditUserPage } from '@/hooks/commons/useEditUserPage';

export default function EditUserPage() {
  const { formData, loading, saving, error, success, setError, setFormData, handleSubmit
  } = useEditUserPage();

  if (loading) { return <EditUserLoading />; }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-violet-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
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
    </div>
  );
}