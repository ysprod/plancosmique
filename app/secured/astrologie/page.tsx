"use client";
import AstrologieHeader from "@/components/astrologie/AstrologieHeader";
import AstrologySectionCard from "@/components/astrologie/AstrologySectionCard";
import { useAstrologiePage } from "@/components/astrologie/useAstrologiePage";
import { motion } from "framer-motion";

export default function AstrologiePage() {
  const { astrologySections } = useAstrologiePage();

  return (
    <div className="bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-pink-500 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6 py-8 sm:py-12 max-w-6xl mx-auto">
        <AstrologieHeader />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {astrologySections.map((section, index) => (
            <AstrologySectionCard key={section.id} section={section} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}