'use client';
import type { PaymentStatus } from '@/lib/types/moneyfusion.types';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Info,
  Loader2,
  Phone,
  Shield,
  User,
  XCircle,
} from 'lucide-react';

export interface PaymentButtonProps {
  /** Montant du paiement */
  amount: number;
  
  /** Fonction appelée au clic */
  onClick: () => void;
  
  /** État de chargement */
  loading?: boolean;
  
  /** Désactiver le bouton */
  disabled?: boolean;
  
  /** Texte personnalisé du bouton */
  text?: string;
  
  /** Afficher le montant sur le bouton */
  showAmount?: boolean;
  
  /** Classe CSS supplémentaire */
  className?: string;
  
  /** Taille du bouton */
  size?: 'sm' | 'md' | 'lg';
  
  /** Variante de style */
  variant?: 'primary' | 'secondary' | 'success';
}

/**
 * Bouton de paiement MoneyFusion
 */
export function PaymentButton({
  amount,
  onClick,
  loading = false,
  disabled = false,
  text = 'Payer maintenant',
  showAmount = true,
  className = '',
  size = 'md',
  variant = 'primary',
}: PaymentButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
    secondary: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
    success: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700',
  };

  const formatAmount = (amt: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amt);
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        text-white font-semibold rounded-xl
        shadow-lg transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        ${className}
      `}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Traitement...</span>
        </>
      ) : (
        <>
          <CreditCard className="w-5 h-5" />
          <span>{text}</span>
          {showAmount && <span className="font-bold">{formatAmount(amount)}</span>}
          <ArrowRight className="w-5 h-5" />
        </>
      )}
    </motion.button>
  );
}

// ==================== PAYMENTMODAL ====================

export interface PaymentModalProps {
  /** Modal ouvert */
  isOpen: boolean;
  
  /** Fonction pour fermer le modal */
  onClose: () => void;
  
  /** Fonction pour confirmer le paiement */
  onConfirm: () => void;
  
  /** Montant du paiement */
  amount: number;
  
  /** Nom du client */
  customerName: string;
  
  /** Numéro de téléphone */
  phoneNumber: string;
  
  /** Articles du panier */
  items?: Array<{ name: string; price: number }>;
  
  /** État de chargement */
  loading?: boolean;
  
  /** Erreur */
  error?: string;
}

/**
 * Modal de confirmation de paiement
 */
export function PaymentModal({
  isOpen,
  onClose,
  onConfirm,
  amount,
  customerName,
  phoneNumber,
  items,
  loading = false,
  error,
}: PaymentModalProps) {
  const formatAmount = (amt: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amt);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-6">
              {/* Header */}
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Confirmer le paiement
                </h2>
                <p className="text-gray-600 mt-2">
                  Paiement sécurisé par MoneyFusion
                </p>
              </div>

              {/* Détails du paiement */}
              <div className="space-y-4">
                {/* Client */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Client</p>
                    <p className="font-semibold text-gray-900">{customerName}</p>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Numéro</p>
                    <p className="font-semibold text-gray-900">{phoneNumber}</p>
                  </div>
                </div>

                {/* Articles */}
                {items && items.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700">Articles</p>
                    {items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.name}</span>
                        <span className="font-semibold text-gray-900">
                          {formatAmount(item.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-purple-600">
                      {formatAmount(amount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Erreur */}
              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {/* Info */}
              <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  Vous serez redirigé vers MoneyFusion pour finaliser le paiement en toute sécurité.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  onClick={onConfirm}
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Traitement...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirmer</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ==================== PAYMENTSTATUSCARD ====================

export interface PaymentStatusCardProps {
  /** Statut du paiement */
  status: PaymentStatus;
  
  /** Message personnalisé */
  message?: string;
  
  /** Montant */
  amount?: number;
  
  /** Référence */
  reference?: string;
  
  /** Action à effectuer */
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Carte d'affichage du statut de paiement
 */
export function PaymentStatusCard({
  status,
  message,
  amount,
  reference,
  action,
}: PaymentStatusCardProps) {
  const statusConfig: Record<PaymentStatus, {
    icon: typeof Info | typeof Loader2 | typeof CheckCircle2 | typeof XCircle | typeof AlertCircle;
    color: string;
    bgColor: string;
    borderColor: string;
    title: string;
    defaultMessage: string;
    animate?: string;
  }> = {
    pending: {
      icon: Info,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      borderColor: 'border-gray-300',
      title: 'En attente',
      defaultMessage: 'Le paiement est en attente de traitement.',
    },
    initiated: {
      icon: Info,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-300',
      title: 'Paiement initié',
      defaultMessage: 'Veuillez compléter le paiement.',
    },
    processing: {
      icon: Loader2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      borderColor: 'border-purple-300',
      title: 'Traitement en cours',
      defaultMessage: 'Nous vérifions votre paiement...',
      animate: 'animate-spin',
    },
    success: {
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      borderColor: 'border-emerald-300',
      title: 'Paiement réussi',
      defaultMessage: 'Votre paiement a été effectué avec succès!',
    },
    failed: {
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-300',
      title: 'Paiement échoué',
      defaultMessage: 'Le paiement a échoué. Veuillez réessayer.',
    },
    cancelled: {
      icon: XCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      borderColor: 'border-orange-300',
      title: 'Paiement annulé',
      defaultMessage: 'Le paiement a été annulé.',
    },
    expired: {
      icon: AlertCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-300',
      title: 'Paiement expiré',
      defaultMessage: 'Le lien de paiement a expiré.',
    },
    already_used: {
      icon: AlertCircle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
      borderColor: 'border-amber-300',
      title: 'Déjà traité',
      defaultMessage: 'Ce paiement a déjà été traité.',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  const formatAmount = (amt: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amt);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        border-2 ${config.borderColor} ${config.bgColor}
        rounded-2xl p-6 space-y-4
      `}
    >
      {/* Icon & Title */}
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${config.bgColor} rounded-full flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${config.color} ${config.animate || ''}`} />
        </div>
        <div>
          <h3 className={`text-xl font-bold ${config.color}`}>
            {config.title}
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            {message || config.defaultMessage}
          </p>
        </div>
      </div>

      {/* Details */}
      {(amount || reference) && (
        <div className="space-y-2 pt-4 border-t border-gray-200">
          {amount && (
            <div className="flex justify-between">
              <span className="text-gray-600">Montant</span>
              <span className="font-bold text-gray-900">{formatAmount(amount)}</span>
            </div>
          )}
          {reference && (
            <div className="flex justify-between">
              <span className="text-gray-600">Référence</span>
              <span className="font-mono text-sm text-gray-900">{reference}</span>
            </div>
          )}
        </div>
      )}

      {/* Action */}
      {action && (
        <button
          onClick={action.onClick}
          className={`
            w-full px-4 py-3 rounded-xl font-semibold
            ${status === 'success' 
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
              : 'bg-gray-900 hover:bg-gray-800 text-white'
            }
            transition-colors flex items-center justify-center gap-2
          `}
        >
          {action.label}
          <ArrowRight className="w-5 h-5" />
        </button>
      )}
    </motion.div>
  );
}
