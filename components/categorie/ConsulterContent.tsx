import { memo } from 'react';
import { motion } from 'framer-motion';
import CategoryContextBanner from './CategoryContextBanner';
import Slide4SectionConsulter from '../vie-personnelle/Slide4SectionConsulter';
import type { OfferingAlternative, WalletOffering } from '@/lib/interfaces';

interface ConsulterContentProps {
    consultation: any;
    walletOfferings: WalletOffering[];
    contextInfo: { rubrique?: any; choix?: any };
    onOfferingValidation: (alternative: OfferingAlternative) => Promise<void>;
    onBack: () => void;
}

const ConsulterContent = memo<ConsulterContentProps>(function ConsulterContent({
    consultation,
    walletOfferings,
    contextInfo,
    onOfferingValidation,
    onBack
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 sm:space-y-6"
        >
            <CategoryContextBanner
                rubriqueTitre={contextInfo.rubrique?.titre}
                choixTitre={contextInfo.choix?.title || contextInfo.choix?.titre}
                choixDescription={contextInfo.choix?.description}
            />

            {consultation && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <Slide4SectionConsulter
                        consultation={consultation}
                        walletOfferings={walletOfferings}
                        handleOfferingValidation={onOfferingValidation}
                        handleBack={onBack}
                    />
                </motion.div>
            )}
        </motion.div>
    );
});

export default ConsulterContent;
