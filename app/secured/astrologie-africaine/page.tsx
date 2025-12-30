"use client";
import { PageHeader } from '@/components/astrologie-africaine/PageHeader';
import { TabButton } from '@/components/astrologie-africaine/TabButton';
import { CalendrierLunaireContent, IncantationsContent, RituelsContent } from '@/components/astrologie-africaine/TabContents';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Moon, Sparkles } from 'lucide-react';
import React, { useCallback, useMemo, useState } from 'react';

type TabId = 'calendrier' | 'rituels' | 'incantations';

interface Tab {
  id: TabId;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
} 
 
export default function AstrologieAfricainePage() {
   const [activeTab, setActiveTab] = useState<TabId>('calendrier');
  
   const handleTabChange = useCallback((tabId: TabId) => {
    setActiveTab(tabId);
  }, []);

  const tabs = useMemo<Tab[]>(
    () => [
      {
        id: 'calendrier',
        icon: Moon,
        title: 'Calendrier Lunaire',
        description: 'Cycles et phases de la Lune'
      },
      {
        id: 'rituels',
        icon: Calendar,
        title: 'Rituels',
        description: 'Cérémonies sacrées'
      },
      {
        id: 'incantations',
        icon: Sparkles,
        title: 'Incantations',
        description: 'Invocations magiques'
      }
    ],
    []
  );

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case 'calendrier':
        return <CalendrierLunaireContent />;
      case 'rituels':
        return <RituelsContent />;
      case 'incantations':
        return <IncantationsContent />;
      default:
        return <CalendrierLunaireContent />;
    }
  }, [activeTab]);
 
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 z-50 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-pink-100/20 to-purple-100/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 max-w-6xl">
        <PageHeader />

        {/* Tabs navigation */}
        <div className="mb-6 sm:mb-8">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                onClick={() => handleTabChange(tab.id)}
              />
            ))}
          </div>
        </div>

        {/* Content area */}
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </div>
    </div>
  );
}