"use client";
import { LoginForm } from '@/components/auth';

export default function LoginPage() {
  return (
    <div className=" bg-gradient-to-br from-slate-50 via-white to-violet-50 flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}