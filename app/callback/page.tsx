/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { api } from "@/lib/api/client";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, Info, Loader2, RefreshCw, Shield } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

// Types selon la doc MoneyFusion
interface MoneyFusionResponse {
    statut: boolean;
    message: string;
    code_statut: number;
    data?: {
        token: string;
        montant: number;
        numeroSend: string;
        nomclient: string;
        date_paiement?: string;
        reference?: string;
    };
}

function PaymentCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [token, setToken] = useState<string | null>(null);
    const [status, setStatus] = useState<"pending" | "success" | "error" | "already_used">("pending");
    const [details, setDetails] = useState<MoneyFusionResponse | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    const BACKEND_VERIFY_URL = "/payments/moneyfusion/verify";

    const generateAnalysisAfterPayment = useCallback(async (consultationId: string, t: string) => {
        try {
            console.log('🚀 Génération de l\'analyse après paiement validé:', consultationId);

            // 1. Récupérer les détails de la consultation
            const consultationRes = await api.get(`/consultations/${consultationId}`);
            const consultation = consultationRes.data;

            if (!consultation) {
                throw new Error('Consultation non trouvée');
            }

            // 2. Générer l'analyse
            const analysisResponse = await api.post(`/consultations/${consultationId}/generate-analysis`, {
                birthData: consultation.formData,
            });

            console.log('✅ Analyse générée avec succès');

            // 3. Sauvegarder l'analyse
            if (analysisResponse.data?.analyse) {
                await api.post(`/consultations/${consultationId}/save-analysis`, {
                    analyse: analysisResponse.data.analyse,
                    statut: 'completed',
                });
                console.log('💾 Analyse sauvegardée');
            }

            // 4. Marquer le paiement comme traité
            await api.post(`/consultations/${consultationId}/confirm-offering`, {
                paid: true,
                paymentToken: t,
            });

        } catch (err: any) {
            console.error('❌ Erreur génération analyse:', err);
        }
    }, []);

    const verifyPayment = useCallback(async (t: string) => {
        setLoading(true);
        setError("");
        setStatus("pending");

        try {
            // Appel à ton backend qui proxy la vérification MoneyFusion
            const response = await api.post(BACKEND_VERIFY_URL, { token: t });
            const data = response.data;

            if (data?.status === "success") {
                setStatus("success");
                setDetails(data.payment);

                // Sauvegarder le token et les infos de paiement
                localStorage.setItem("monetoile_payment_token", t);
                localStorage.setItem(
                    "monetoile_payment_details",
                    JSON.stringify(data.payment)
                );

                // Générer l'analyse après paiement validé
                const consultationId = searchParams.get("consultation_id");
                if (consultationId) {
                  generateAnalysisAfterPayment(consultationId, t);
                }
            } else if (data?.status === "already_used") {
                setStatus("already_used");
                setError(data.message || "Ce paiement a déjà été traité");
                setDetails(data.payment);
            } else {
                setStatus("error");
                setError(data.message || "Paiement non validé");
                setDetails(data.details);
            }
        } catch (err: any) {
            setStatus("error");
            setError(
                err.response?.data?.message ||
                err.message ||
                "Erreur de connexion au serveur de paiement"
            );
            setDetails(err.response?.data);
        } finally {
            setLoading(false);
        }
    }, [searchParams, generateAnalysisAfterPayment]);

    // Vérification du token à l'arrivée
    useEffect(() => {
        const t = searchParams.get("token");
        setToken(t);

        if (t) {
            verifyPayment(t);
        } else {
            setStatus("error");
            setError("Aucun token de paiement reçu");
        }
    }, [searchParams, verifyPayment]);

    // Redirection automatique après succès
    useEffect(() => {
        if (status === "success") {
            // Vérifier si c'est un achat de livre
            const bookId = searchParams.get("book_id");
            const paymentType = searchParams.get("type");
            const consultationId = searchParams.get("consultation_id");
            
            const timer = setTimeout(() => {
                if (bookId && paymentType === "book") {
                    router.replace(`/protected/livres/success?book_id=${bookId}`);
                } else if (consultationId) {
                    // Redirection vers la page vie-personnelle avec le flag de succès
                    router.replace(`/protected/vie-personnelle?consultation_id=${consultationId}&payment_success=true`);
                } else {
                    router.replace("/protected/profil");
                }
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [status, router, searchParams]);

    const handleRetry = () => {
        if (token && retryCount < 3) {
            setRetryCount(retryCount + 1);
            verifyPayment(token);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl p-10 border-2 border-black max-w-lg w-full"
                role="alert"
            >
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <Image
                        src="/logo.png"
                        alt="Mon Étoile"
                        width={60}
                        height={60}
                        className="rounded-2xl"
                        priority
                    />
                </div>

                <AnimatePresence mode="wait">
                    {loading || status === "pending" ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="inline-block mb-6"
                            >
                                <Loader2 className="w-20 h-20 text-black" aria-label="Chargement" />
                            </motion.div>
                            <h2 className="text-3xl font-black text-black mb-3">
                                Vérification en cours...
                            </h2>
                            <p className="text-gray-600 mb-6 font-medium">
                                Nous validons votre paiement auprès de MoneyFusion.
                                <br />
                                Merci de patienter.
                            </p>
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                <Shield className="w-4 h-4" />
                                <span className="font-bold">Connexion sécurisée</span>
                            </div>
                        </motion.div>
                    ) : status === "success" ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                <CheckCircle2
                                    className="w-20 h-20 text-green-600 mx-auto mb-6"
                                    aria-label="Succès"
                                />
                            </motion.div>
                            <h2 className="text-3xl font-black text-black mb-3">
                                Paiement Validé ! 🎉
                            </h2>
                            <p className="text-gray-700 mb-6 font-medium leading-relaxed">
                                Votre paiement a été traité avec succès.
                                <br />
                                Votre compte premium est maintenant actif !
                            </p>

                            {/* Détails du paiement */}
                            <div className="bg-gray-50 rounded-2xl p-6 mb-6 border-2 border-gray-200 text-left">
                                <h3 className="text-sm font-black text-gray-600 mb-4 uppercase tracking-wide">
                                    Détails de la transaction
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 font-bold">Montant :</span>
                                        <span className="text-black font-black text-lg">
                                            {details?.data?.montant || "N/A"} €
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 font-bold">Client :</span>
                                        <span className="text-black font-bold">
                                            {details?.data?.nomclient || "N/A"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 font-bold">Numéro :</span>
                                        <span className="text-black font-bold">
                                            {details?.data?.numeroSend || "N/A"}
                                        </span>
                                    </div>
                                    {details?.data?.reference && (
                                        <div className="flex justify-between items-center pt-3 border-t border-gray-300">
                                            <span className="text-gray-600 font-bold">Référence :</span>
                                            <span className="text-black font-mono text-sm font-bold">
                                                {details.data.reference}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Token (pour debug) */}
                            {token && (
                                <details className="mb-6 text-left">
                                    <summary className="text-xs text-gray-500 cursor-pointer hover:text-black font-bold">
                                        Informations techniques
                                    </summary>
                                    <p className="text-xs text-gray-400 break-all mt-2 font-mono bg-gray-100 p-3 rounded-lg">
                                        Token : {token}
                                    </p>
                                </details>
                            )}

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="text-sm text-gray-500 mb-6 font-medium"
                            >
                                Redirection automatique dans 5 secondes...
                            </motion.div>

                            <motion.button
                                onClick={() => router.replace("/protected/profil")}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-black text-white font-black shadow-lg hover:shadow-2xl transition-all"
                            >
                                Accéder à mon profil
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </motion.div>
                    ) : status === "already_used" ? (
                        <motion.div
                            key="already_used"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-center"
                        >
                            <Info className="w-20 h-20 text-blue-600 mx-auto mb-6" aria-label="Info" />
                            <h2 className="text-3xl font-black text-black mb-3">
                                Paiement Déjà Traité
                            </h2>
                            <p className="text-gray-700 mb-6 font-medium">
                                Ce paiement a déjà été validé précédemment.
                                <br />
                                Vérifiez votre compte ou contactez le support si nécessaire.
                            </p>

                            <div className="bg-blue-50 rounded-2xl p-6 mb-6 border-2 border-blue-200">
                                <p className="text-sm text-blue-800 font-bold">{error}</p>
                            </div>

                            <motion.button
                                onClick={() => router.replace("/protected/profil")}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-black text-white font-black shadow-lg hover:shadow-2xl transition-all"
                            >
                                Accéder à mon profil
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-center"
                        >
                            <AlertCircle className="w-20 h-20 text-red-600 mx-auto mb-6" aria-label="Erreur" />
                            <h2 className="text-3xl font-black text-black mb-3">
                                Paiement Non Validé
                            </h2>
                            <p className="text-gray-700 mb-6 font-medium">
                                {error || "Une erreur est survenue lors de la validation du paiement."}
                            </p>

                            {/* Détails de l'erreur */}
                            <div className="bg-red-50 rounded-2xl p-6 mb-6 border-2 border-red-200 text-left">
                                <h3 className="text-sm font-black text-red-800 mb-3 uppercase">
                                    Détails de l'erreur
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <p className="text-red-700 font-bold">
                                        <strong>Message :</strong> {details?.message || error}
                                    </p>
                                    {details?.code_statut && (
                                        <p className="text-red-700 font-bold">
                                            <strong>Code :</strong> {details.code_statut}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                {retryCount < 3 && (
                                    <motion.button
                                        onClick={handleRetry}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-black text-white font-black shadow-lg hover:shadow-2xl transition-all"
                                        aria-label="Réessayer"
                                    >
                                        <RefreshCw className="w-5 h-5" />
                                        Réessayer la vérification
                                    </motion.button>
                                )}

                                <motion.button
                                    onClick={() => router.replace("/")}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full px-8 py-4 rounded-xl bg-gray-200 text-black font-black shadow hover:shadow-lg transition-all"
                                    aria-label="Retour accueil"
                                >
                                    Retour à l'accueil
                                </motion.button>

                                {retryCount >= 3 && (
                                    <p className="text-xs text-red-600 font-bold mt-2">
                                        Nombre maximum de tentatives atteint. Contactez le support.
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer sécurité */}
                <div className="mt-8 pt-6 border-t-2 border-gray-200 flex items-center justify-center gap-3 text-xs text-gray-500">
                    <Shield className="w-4 h-4" />
                    <span className="font-bold">Paiement sécurisé par MoneyFusion</span>
                </div>
            </motion.div>
        </div>
    );
}

export default function PaymentCallbackPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <Loader2 className="w-16 h-16 text-black animate-spin" />
                </div>
            }
        >
            <PaymentCallbackContent />
        </Suspense>
    );
}