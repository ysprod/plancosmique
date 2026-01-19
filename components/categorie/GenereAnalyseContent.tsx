import { motion } from 'framer-motion';
import { memo } from 'react';
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
        >
            <Slide4SectionGenereAnalyse
                consultation={consultation}
                choix={contextInfo.choix}
            />
        </motion.div>
    );
});

export default GenereAnalyseContent;