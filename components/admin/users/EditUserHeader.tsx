import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, User } from 'lucide-react';

export function EditUserHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour aux utilisateurs
      </Link>
      <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
        <User className="w-8 h-8 text-violet-600" />
        Modifier l'utilisateur
      </h1>
      <p className="text-slate-600 mt-2">
        Modifiez les informations de l'utilisateur
      </p>
    </motion.div>
  );
}
