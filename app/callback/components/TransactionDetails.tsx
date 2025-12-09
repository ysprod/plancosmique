/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion } from 'framer-motion';
import type { PaymentData } from './types';

interface TransactionDetailsProps {
  paymentData: PaymentData | null;
  showDetails: boolean;
  itemVariants: any;
}

/**
 * Composant pour afficher les détails de la transaction
 */
export function TransactionDetails({
  paymentData,
  showDetails,
  itemVariants,
}: TransactionDetailsProps) {
  if (!showDetails || !paymentData) return null;

  return (
    <motion.div
      variants={itemVariants}
      className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-6 mb-4 sm:mb-6 space-y-2 sm:space-y-3"
    >
      <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-4">
        Détails de la transaction
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-[10px] sm:text-sm">
        <div>
          <span className="text-gray-600">Montant :</span>
          <span className="font-semibold text-gray-900 ml-2">{paymentData.Montant.toLocaleString()} FCFA</span>
        </div>

        {paymentData.frais > 0 && (
          <div>
            <span className="text-gray-600">Frais :</span>
            <span className="font-semibold text-gray-900 ml-2">{paymentData.frais.toLocaleString()} FCFA</span>
          </div>
        )}

        {paymentData.numeroTransaction && (
          <div className="sm:col-span-2">
            <span className="text-gray-600">N° Transaction :</span>
            <span className="font-mono text-[9px] sm:text-xs text-gray-900 ml-2 break-all">
              {paymentData.numeroTransaction}
            </span>
          </div>
        )}

        {paymentData.moyen && (
          <div>
            <span className="text-gray-600">Moyen :</span>
            <span className="font-semibold text-gray-900 ml-2 capitalize">{paymentData.moyen}</span>
          </div>
        )}

        <div className="sm:col-span-2">
          <span className="text-gray-600">Client :</span>
          <span className="font-semibold text-gray-900 ml-2">{paymentData.nomclient}</span>
        </div>

        <div className="sm:col-span-2">
          <span className="text-gray-600">Date :</span>
          <span className="font-semibold text-gray-900 ml-2 text-[10px] sm:text-sm">
            {new Date(paymentData.createdAt).toLocaleString('fr-FR', {
              dateStyle: 'long',
              timeStyle: 'short',
            })}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
