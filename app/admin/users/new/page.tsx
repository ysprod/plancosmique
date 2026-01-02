'use client';
import { NewUserForm } from '@/components/admin/users/NewUserForm';
import { NewUserHeader } from '@/components/admin/users/NewUserHeader';
import { NewUserToast } from '@/components/admin/users/NewUserToast';
import { useNewUserPage } from '@/hooks/useNewUserPage';

export default function NewUserPage() {
  const {
    saving, toast, setToast, errors, formData, handleChange, handleSubmit,
    isFormValid
  } = useNewUserPage();

  return (
    <div className=" bg-gradient-to-br from-slate-50 via-violet-50 to-purple-50 dark:from-slate-900 dark:via-violet-900/20 dark:to-purple-900/20 p-3 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <NewUserHeader />
        <NewUserToast toast={toast} onClose={() => setToast(null)} />

        <NewUserForm
          formData={formData}
          errors={errors}
          saving={saving}
          isFormValid={!!isFormValid}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
