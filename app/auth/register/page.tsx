"use client";
import { RegisterForm } from '@/components/auth';

export default function RegisterPage() {
  return (
    <div className=" bg-gradient-to-br from-slate-50 via-white to-violet-50 flex items-center justify-center p-4">
      <RegisterForm />
    </div>
  );
}