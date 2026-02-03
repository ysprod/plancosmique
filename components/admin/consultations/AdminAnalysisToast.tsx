import React from "react";
import { AnimatePresence } from 'framer-motion';
import Toast from '@/components/consultations/Toast';

export default function AdminAnalysisToast({ toast, setToast }: { toast: any, setToast: (t: any) => void }) {
  return (
    <AnimatePresence>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </AnimatePresence>
  );
}
