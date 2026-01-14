'use client';

import { RegisterForm } from '@/components/auth';

export default function RegisterPageClient() {
  return (
    <div className=" bg-gradient-to-br from-slate-60 via-white to-violet-50 flex items-center justify-center p-4">
      <RegisterForm />
    </div>
  );
}
