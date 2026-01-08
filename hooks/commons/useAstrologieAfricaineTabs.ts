import { useAstrologieAfricainePage } from '@/hooks/useAstrologieAfricainePage';

export function useAstrologieAfricaineTabs() {
  const { activeTab, handleTabChange, tabs } = useAstrologieAfricainePage();
  return { activeTab, handleTabChange, tabs };
}
