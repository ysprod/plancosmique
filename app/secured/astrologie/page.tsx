"use client";
import AstrologieHeader from "@/components/astrologie/AstrologieHeader";
import AstrologySectionCard from "@/components/astrologie/AstrologySectionCard";
import AstrologieBackground from "@/components/astrologie/AstrologieBackground";
import { useAstrologiePageSections } from "@/hooks/useAstrologiePageSections";

export default function AstrologiePage() {
  const { astrologySections } = useAstrologiePageSections();

  return (
    <div className="bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <AstrologieBackground />
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