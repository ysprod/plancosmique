import { AnimatePresence } from 'framer-motion';
import { CalendrierLunaireContent, IncantationsContent, RituelsContent } from './TabContents';
import { TabId } from '../../hooks/useAstrologieAfricainePage';

interface AstrologieAfricaineContentProps {
  activeTab: TabId;
}

const AstrologieAfricaineContent = ({ activeTab }: AstrologieAfricaineContentProps) => {
  const renderContent = () => {
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
  };
  return <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>;
};

export default AstrologieAfricaineContent;
