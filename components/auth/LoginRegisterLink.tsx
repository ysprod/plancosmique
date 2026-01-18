'use client';
import Link from 'next/link';
import React from 'react';

export default function LoginRegisterLink() {
  return (
    <div className="mt-6 text-center">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Pas encore de compte ?{' '}
        <Link
          href="/auth/register"
          className="text-purple-600 dark:text-purple-400 font-semibold hover:underline transition-colors"
        >
          Inscription
        </Link>
      </p>
    </div>
  );
}