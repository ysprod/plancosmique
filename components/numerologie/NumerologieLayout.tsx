'use client';
import React from 'react';

interface NumerologieLayoutProps {
  children: React.ReactNode;
}

const NumerologieLayout: React.FC<NumerologieLayoutProps> = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 px-4 flex items-center justify-center">
    <div className="max-w-xl w-full">
      {children}
    </div>
  </div>
);

export default NumerologieLayout;
