import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Loader2, Trash2 } from 'lucide-react';
import { UserData } from '@/lib/interfaces';

type DeleteUserModalProps = {
  show: boolean;
  user: UserData | null;
  isDeleting: boolean;
  deleteSuccess: boolean;
  onClose: () => void;
  onDelete: () => void;
  modalVariants: any;
};

export default function DeleteUserModal({
  show,
  user,
  isDeleting,
  deleteSuccess,
  onClose,
  onDelete,
  modalVariants,
}: DeleteUserModalProps) {
  return (
    <AnimatePresence>
      {show && user && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => !isDeleting && onClose()}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            {deleteSuccess ? (
              <div className="p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Utilisateur supprimé !
                </h3>
                <p className="text-sm text-gray-600">
                  L'utilisateur a été supprimé avec succès.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">Confirmer la suppression</h3>
                  </div>
                  <p className="text-sm text-white/90">
                    Cette action est irréversible
                  </p>
                </div>
                <div className="p-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-700 mb-2">
                      Êtes-vous sûr de vouloir supprimer cet utilisateur ?
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user.username[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {user.username}
                        </p>
                        <p className="text-xs text-gray-600">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-gray-600">Rôle :</span>
                        <span className="font-semibold text-gray-900 ml-1">
                          {user.role}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Consultations :</span>
                        <span className="font-semibold text-gray-900 ml-1">
                          {user.totalConsultations}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Statut :</span>
                        <span className="font-semibold text-gray-900 ml-1">
                          {user.isActive ? 'Actif' : 'Inactif'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Crédits :</span>
                        <span className="font-semibold text-gray-900 ml-1">
                          {user.credits}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={onClose}
                      disabled={isDeleting}
                      className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={onDelete}
                      disabled={isDeleting}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Suppression...
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          Supprimer
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
