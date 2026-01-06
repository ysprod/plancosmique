import { useAstrologieAfricainePage } from '@/components/astrologie-africaine/useAstrologieAfricainePage';

export function useAstrologieAfricaineTabs() {
  const { activeTab, handleTabChange, tabs } = useAstrologieAfricainePage();
  return { activeTab, handleTabChange, tabs };
}
