"use client";
import AstrologySectionCard from "@/components/astrologie/AstrologySectionCard";
import { useNumerologiePage } from "@/components/numerologie/useNumerologiePage";
import { motion } from "framer-motion";

export default function NumerologiePage() {
  const { numerologieSections } = useNumerologiePage();

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

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent mb-4 tracking-tight">
            NUMÉROLOGIE
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les secrets cachés dans vos nombres personnels et votre destinée chiffrée
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {numerologieSections.map((section, index) => (
            <AstrologySectionCard key={section.id} section={section} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
