"use client";
import AstrologieAfricaineBackground from '@/components/astrologie-africaine/AstrologieAfricaineBackground';
import AstrologieAfricaineContent from '@/components/astrologie-africaine/AstrologieAfricaineContent';
import AstrologieAfricaineProgressBar from '@/components/astrologie-africaine/AstrologieAfricaineProgressBar';
import AstrologieAfricaineTabs from '@/components/astrologie-africaine/AstrologieAfricaineTabs';
import { PageHeader } from '@/components/astrologie-africaine/PageHeader';
import { useAstrologieAfricaineTabs } from '@/hooks/commons/useAstrologieAfricaineTabs';

export default function AstrologieAfricainePage() {
  const { activeTab, handleTabChange, tabs } = useAstrologieAfricaineTabs();

  return (
    <div className="relative overflow-hidden">
      <AstrologieAfricaineProgressBar />
      <AstrologieAfricaineBackground />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12 max-w-6xl">
        <PageHeader />
        <AstrologieAfricaineTabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
        <AstrologieAfricaineContent activeTab={activeTab} />
      </div>
    </div>
  );
}