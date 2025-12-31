import { Tab, TabId } from './useAstrologieAfricainePage';
import { TabButton } from './TabButton';
import React from 'react';

interface AstrologieAfricaineTabsProps {
  tabs: Tab[];
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
}

const AstrologieAfricaineTabs = ({ tabs, activeTab, onTabChange }: AstrologieAfricaineTabsProps) => (
  <div className="mb-6 sm:mb-8">
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          tab={tab}
          isActive={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        />
      ))}
    </div>
  </div>
);

export default AstrologieAfricaineTabs;
