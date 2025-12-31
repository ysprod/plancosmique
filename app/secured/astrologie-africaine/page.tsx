"use client";
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/astrologie-africaine/PageHeader';
import { useAstrologieAfricainePage } from '@/components/astrologie-africaine/useAstrologieAfricainePage';
import AstrologieAfricaineTabs from '@/components/astrologie-africaine/AstrologieAfricaineTabs';
import AstrologieAfricaineContent from '@/components/astrologie-africaine/AstrologieAfricaineContent';

export default function AstrologieAfricainePage() {
  const { activeTab, handleTabChange, tabs } = useAstrologieAfricainePage();

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 z-50 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-pink-100/20 to-purple-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 max-w-6xl">
        <PageHeader />

        <AstrologieAfricaineTabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
        <AstrologieAfricaineContent activeTab={activeTab} />
      </div>
    </div>
  );
}