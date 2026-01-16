'use client';

import { User } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import { Ban, Calendar, CheckCircle, Edit, Globe, Mail, Phone, Shield, Star, Trash2, User as UserIcon } from 'lucide-react';
import Link from 'next/link';

type UserCardProps = {
  user: User;
  cardVariants: any;
  setDeleteModal: (modal: { show: boolean; user: User | null }) => void;
};

export default function UserCard({ user, cardVariants, setDeleteModal }: UserCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
      className="bg-white rounded-lg border border-gray-200 p-3 transition-all"
    >
      {/* En-tête utilisateur */}
      <div className="flex items-center gap-2.5 mb-2.5">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
            {user.username[0]?.toUpperCase() || 'U'}
          </div>
          {user.isActive && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-900 truncate">{user.username}</h3>
        </div>
      </div>

      <div className="space-y-1 mb-2.5 pb-2.5 border-b border-gray-100">
        <p className="text-xs text-gray-500 truncate flex items-center gap-1">
          <Mail className="w-3 h-3 flex-shrink-0" />
          {user.email}
        </p>
        {user.phone && (
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Phone className="w-3 h-3 flex-shrink-0" />
            {user.phone}
          </div>
        )}
        {user.country && (
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Globe className="w-3 h-3 flex-shrink-0" />
            {user.country}
          </div>
        )}
        {user.gender && (
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <UserIcon className="w-3 h-3 flex-shrink-0" />
            {user.gender === 'male' ? 'Homme' : 'Femme'}
          </div>
        )}
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <Calendar className="w-3 h-3 flex-shrink-0" />
          {new Date(user.createdAt).toLocaleString('fr-FR', { 
            dateStyle: 'long', 
            timeStyle: 'long' 
          })}
        </div>
       
      </div>
      {/* Métriques utilisateur */}
      <div className="grid grid-cols-3 gap-1.5 mb-2.5 pb-2.5 border-b border-gray-100">
        <div className="text-center">
          <p className="text-xs text-gray-500">Consultations</p>
          <p className="text-sm font-bold text-gray-900">{user.totalConsultations}</p>
        </div> 
      </div>
      {/* Badges compacts */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-medium ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
          {user.role === 'ADMIN' && <Shield className="w-2.5 h-2.5" />}
          {user.role}
        </span>
        <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
          {user.isActive ? (
            <CheckCircle className="w-2.5 h-2.5" />
          ) : (
            <Ban className="w-2.5 h-2.5" />
          )}
          {user.isActive ? 'Actif' : 'Inactif'}
        </span>
        {user.premium && (
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-300">
            ⭐ Premium
          </span>
        )}
        {!user.premium && (
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-300">
            ⭐ Debutant
          </span>
        )}

        {user.emailVerified && (
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="w-2.5 h-2.5" />
            Vérifié
          </span>
        )}
        {user.preferences?.notifications && (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-blue-50">
            🔔
          </span>
        )}
      </div>

      <div className="flex gap-1.5">
        <Link
          href={`/admin/users/${user._id}/edit`}
          className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-blue-600 text-white text-xs rounded font-medium hover:bg-blue-700 transition-colors"
        >
          <Edit className="w-3 h-3" />
          Modifier
        </Link>
        <button
          onClick={() => setDeleteModal({ show: true, user })}
          className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-red-600 text-white text-xs rounded font-medium hover:bg-red-700 transition-colors"
        >
          <Trash2 className="w-3 h-3" />
          Supprimer
        </button>
      </div>
    </motion.div>
  );
}