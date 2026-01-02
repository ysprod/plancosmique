"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNumerologyForm } from "@/hooks/numerologie/useNumerologyForm";
import { useNumerologyCalculator } from "@/hooks/numerologie/useNumerologyCalculator";
import { useSacredNumbers } from "@/hooks/numerologie/useSacredNumbers";
import { NumerologyTabs } from "@/components/numerologie/NumerologyTabs";
import { NumerologyForm } from "@/components/numerologie/NumerologyForm";
import { NumerologyResultCard } from "@/components/numerologie/NumerologyResult";
import { SacredNumberDetails } from "@/components/numerologie/SacredNumberDetails";
import { NumerologyEmptyCard } from "@/components/numerologie/NumerologyEmptyCard";
import { useAstrologiePage } from "@/components/astrologie/useAstrologiePage";
import AstrologySectionCard from "@/components/astrologie/AstrologySectionCard";

export default function NumerologiePage() {
  const [activeTab, setActiveTab] = useState<string>("calculator");
  const { formData, setFormData, loading, setLoading, error, setError, fetchUserData } = useNumerologyForm();
  const { calculateNumerology } = useNumerologyCalculator();
  const { sacredNumbers } = useSacredNumbers();
  const [result, setResult] = useState<any>(null);
  const { astrologySections } = useAstrologiePage();
  // Pré-remplir le formulaire avec les données utilisateur
  useState(() => {
    fetchUserData();
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!formData.firstName || !formData.lastName || !formData.birthDate) {
        throw new Error("Veuillez remplir tous les champs");
      }
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const fullName = `${formData.firstName} ${formData.lastName}`;
      const numerologyData = calculateNumerology(fullName, formData.birthDate);
      setResult(numerologyData);
    } catch (err: any) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const activeSacredNumber = sacredNumbers.find((num) => num.id === activeTab);

  return (
    <div className="relative  bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 overflow-hidden">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 z-50 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />
      {/* Background subtil */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 lg:py-16 max-w-7xl">
        <>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center shadow-lg">
                {/* Hash icon */}
                <span className="w-10 h-10 lg:w-12 lg:h-12 text-white text-5xl font-black">#</span>
              </div>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent mb-4 tracking-tight">
              NUMÉROLOGIE
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les secrets cachés dans vos nombres personnels et votre destinée chiffrée
            </p>
          </motion.div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {astrologySections.map((section, index) => (
            <AstrologySectionCard key={section.id} section={section} index={index} />
          ))}
        </div>
          {/* Navigation par onglets */}
          <NumerologyTabs activeTab={activeTab} setActiveTab={setActiveTab} sacredNumbers={sacredNumbers} />
          {/* Contenu de l'onglet actif */}
          <AnimatePresence mode="wait">
            {activeTab === "calculator" ? (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                  {/* Formulaire */}
                  <NumerologyForm
                    formData={formData}
                    setFormData={setFormData}
                    loading={loading}
                    error={error}
                    onSubmit={handleSubmit}
                  />
                  {/* Résultats */}
                  {result ? (
                    <NumerologyResultCard result={result} />
                  ) : (
                    <NumerologyEmptyCard />
                  )}
                </div>
              </motion.div>
            ) :
              activeSacredNumber && (
                <SacredNumberDetails
                  sacredNumber={activeSacredNumber}
                  onBack={() => setActiveTab("calculator")}
                />
              )}
          </AnimatePresence>
        </>
      </div>
      {/* CTA flottant */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <button
          onClick={() => setActiveTab("calculator")}
          className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center gap-2"
        >
          {/* Calculator icon */}
          <span className="w-5 h-5">🧮</span>
          <span className="hidden sm:inline">Calculer</span>
        </button>
      </motion.div>
    </div>
  );
}
