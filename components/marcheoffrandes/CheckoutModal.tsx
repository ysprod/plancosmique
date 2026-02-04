"use client";
import { api } from "@/lib/api/client";
import { useAuth } from "@/lib/hooks";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ShoppingCart, CreditCard, Sparkles, CheckCircle2, Loader2, AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Array<{
    _id: string;
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
    icon: string;
  }>;
  totalAmount: number;
  onClearCart: () => void;
  consultationId?: string;
  categoryId?: string;
}

type SimulationStep = "idle" | "processing" | "validating" | "saving" | "success";

const SIMULATION_STEPS = {
  processing: { duration: 1200, label: "Traitement de la commande..." },
  validating: { duration: 800, label: "Validation des offrandes..." },
  saving: { duration: 600, label: "Enregistrement de la transaction..." },
  success: { duration: 800, label: "Commande simulée avec succès !" },
};


const SimulationProgress = ({ step }: { step: SimulationStep }) => {
  const steps: SimulationStep[] = ["processing", "validating", "saving", "success"];
  const currentIndex = steps.indexOf(step);

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: "0%" }}
          animate={{
            width: step === "idle" ? "0%" :
              step === "processing" ? "25%" :
                step === "validating" ? "50%" :
                  step === "saving" ? "75%" : "100%"
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between items-center">
        {steps.map((s, idx) => {
          const isActive = idx <= currentIndex;
          const isCurrent = s === step;

          return (
            <motion.div
              key={s}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isActive ? 1 : 0.4,
                scale: isCurrent ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                  ${isActive
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                  }`}
              >
                {isCurrent && <Loader2 className="w-4 h-4 animate-spin" />}
                {isActive && !isCurrent && <CheckCircle2 className="w-4 h-4" />}
              </div>
              <span className={`text-xs font-medium ${isActive ? "text-gray-900 dark:text-gray-100" : "text-gray-400"}`}>
                {idx + 1}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Current Step Label */}
      <motion.p
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {SIMULATION_STEPS[step as keyof typeof SIMULATION_STEPS]?.label || "Préparation..."}
      </motion.p>
    </div>
  );
};

const ErrorAlert = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
               rounded-lg p-4 flex items-start gap-3"
  >
    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
    <div className="flex-1">
      <p className="text-sm font-medium text-red-800 dark:text-red-200">
        Erreur de simulation
      </p>
      <p className="text-xs text-red-600 dark:text-red-300 mt-1">{message}</p>
      <button
        onClick={onRetry}
        className="mt-2 text-xs font-semibold text-red-700 dark:text-red-400 
                   hover:text-red-900 dark:hover:text-red-200 underline"
      >
        Réessayer
      </button>
    </div>
  </motion.div>
);

// =====================================================
// MAIN COMPONENT
// =====================================================
export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  totalAmount,
  onClearCart,
  consultationId,
  categoryId,
}: CheckoutModalProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [simulationStep, setSimulationStep] = useState<SimulationStep>("idle");
  const [error, setError] = useState<string | null>(null);

  // =====================================================
  // SIMULATION HANDLER
  // =====================================================
  const handleSimulatedPayment = useCallback(async () => {
    setError(null);
    setSimulationStep("processing");

    try {
      // Étape 1 : Traitement (1.2s)
      await new Promise((resolve) => setTimeout(resolve, SIMULATION_STEPS.processing.duration));
      setSimulationStep("validating");

      // Étape 2 : Validation (0.8s)
      await new Promise((resolve) => setTimeout(resolve, SIMULATION_STEPS.validating.duration));

      // Validation des données
      if (cart.length === 0) {
        throw new Error("Le panier est vide");
      }
      if (totalAmount <= 0) {
        throw new Error("Montant invalide");
      }

      setSimulationStep("saving");

      // Étape 3 : Génération des identifiants de simulation
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
      const paymentToken = `SIM-${timestamp}-${randomSuffix}`;
      const transactionId = `TXN-SIM-${timestamp}`;

      // ✅ CORRECTION : Préparation des données avec _id OU id
      const transactionData = {
        userId: user?._id,
        transactionId,
        paymentToken,
        status: "completed",
        totalAmount,
        items: cart.map((item) => {
          const offeringId = item._id || item.id; // ✅ Support _id ET id

          return {
            offeringId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            category: item.category,
            icon: item.icon,
            unitPrice: item.price,
            totalPrice: item.price * item.quantity,


          };
        }),
        paymentMethod: "simulation",
        completedAt: new Date().toISOString(),
      };

      await new Promise((resolve) => setTimeout(resolve, SIMULATION_STEPS.saving.duration));

      const response = await api.post("/wallet/transactions", transactionData);

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(response.data?.message || "Échec de l'enregistrement");
      }

      // ✅ NOUVEAU : Ajouter les offrandes au wallet
      try {
        await api.post("/wallet/offerings/add", {
          items: cart.map((item) => ({
            offeringId: item._id || item.id,
            quantity: item.quantity,
          })),
        });
      } catch (walletErr) {
        console.error("⚠️ [CheckoutModal] Erreur ajout wallet:", walletErr);
      }

      localStorage.setItem("last_simulated_purchase", JSON.stringify(transactionData));
      localStorage.setItem("payment_token", paymentToken);
      localStorage.setItem("transaction_id", transactionId);

      // Étape 5 : Succès (0.8s)
      setSimulationStep("success");
      await new Promise((resolve) => setTimeout(resolve, SIMULATION_STEPS.success.duration));

      // Nettoyage et redirection
      onClearCart();
      let walletUrl = "/star/wallet";
      const params = [];
      if (consultationId) params.push(`consultationId=${encodeURIComponent(consultationId)}`);
      if (categoryId) params.push(`categoryId=${encodeURIComponent(categoryId)}`);
      if (params.length > 0) walletUrl += `?${params.join("&")}`;
      window.location.href = walletUrl;
    } catch (err: any) {
      console.error("❌ [CheckoutModal] Erreur simulation:", err);
      setError(err.message || "Une erreur est survenue lors de la simulation");
      setSimulationStep("idle");
    }
  }, [cart, totalAmount, onClearCart, router, user]);

  const handleRetry = useCallback(() => {
    setError(null);
    setSimulationStep("idle");
  }, []);

  const handleClose = useCallback(() => {
    if (simulationStep !== "idle" && simulationStep !== "success") {
      return; // Empêcher la fermeture pendant la simulation
    }
    onClose();
    setError(null);
    setSimulationStep("idle");
  }, [simulationStep, onClose]);

  if (!isOpen) return null;

  // =====================================================
  // RENDER
  // =====================================================
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-[9999] w-full max-w-lg bg-white dark:bg-gray-900 
                     rounded-2xl shadow-2xl max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="relative px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 
                               flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Finaliser l'achat
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Mode Premium activé
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                disabled={simulationStep !== "idle" && simulationStep !== "success"}
                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 
                         hover:bg-gray-200 dark:hover:bg-gray-700 
                         flex items-center justify-center transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Simulation Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute -top-3 right-6 px-3 py-1 rounded-full 
                       bg-gradient-to-r from-purple-500 to-pink-500 
                       text-white text-xs font-semibold shadow-lg 
                       flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3" />
              <span>Mode Premium</span>
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {error ? (
              <ErrorAlert message={error} onRetry={handleRetry} />
            ) : simulationStep !== "idle" ? (
              <SimulationProgress step={simulationStep} />
            ) : (
              <div className="space-y-4">
                {/* Récapitulatif */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Récapitulatif
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
                    {cart.map((item, idx) => {
                      const itemId = item._id || item.id;
                      return (
                        <motion.div
                          key={itemId}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{item.icon}</span>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Qté: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                            {(item.price * item.quantity).toLocaleString()} FCFA
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between p-4 
                               bg-gradient-to-r from-purple-50 to-pink-50 
                               dark:from-purple-900/20 dark:to-pink-900/20 
                               rounded-lg border border-purple-200 dark:border-purple-800">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Total à payer
                  </span>
                  <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    {totalAmount.toLocaleString()} FCFA
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {simulationStep === "idle" && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSimulatedPayment}
                disabled={cart.length === 0}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 
                         hover:from-purple-700 hover:to-pink-700 
                         text-white font-semibold shadow-lg 
                         flex items-center justify-center gap-2 transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CreditCard className="w-5 h-5" />
                <span>Effectuer le paiement ({cart.length} item{cart.length > 1 ? 's' : ''})</span>
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
