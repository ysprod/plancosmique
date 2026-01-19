import { memo } from 'react';
import { motion } from 'framer-motion';
import CategoryContextBanner from './CategoryContextBanner';
import ConsultationSummary from './ConsultationSummary';
import Slide4SectionGenereAnalyse from '../vie-personnelle/Slide4SectionGenereAnalyse';

interface GenereAnalyseContentProps {
    contextInfo: { rubrique?: any; choix?: any };
    consultation?: any;
}

const GenereAnalyseContent = memo<GenereAnalyseContentProps>(function GenereAnalyseContent({
    contextInfo,
    consultation
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

            <ConsultationSummary 
                consultation={consultation}
                choix={contextInfo.choix}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
            >
                <Slide4SectionGenereAnalyse />
            </motion.div>
        </motion.div>
    );
});

export default GenereAnalyseContent;
