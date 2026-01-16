'use client';

import { motion } from 'framer-motion';
import { memo, useMemo } from 'react';
import CollapsibleSection from './CollapsibleSection';
import { MissionDeVie } from '@/lib/interfaces'; 

const parseMarkdownToSections = (markdown: string) => {
  const sections = markdown.split('\n## ').filter(Boolean);
  return sections.map(section => {
    const lines = section.split('\n');
    const title = lines[0].replace(/^#+\s*/, '').replace(/^🌌\s*/, '');
    const content = lines.slice(1).join('\n').trim();
    return { title, content };
  });
};

const MissionSection = memo(({ missionDeVie }: { missionDeVie: MissionDeVie }) => {
  const sections = useMemo(
    () => parseMarkdownToSections(missionDeVie.contenu),
    [missionDeVie.contenu]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-3"
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <span className="text-2xl">✨</span>
        Mission de Vie
      </h3>

      {sections.map((section, idx) => (
        <CollapsibleSection
          key={idx}
          title={section.title}
          content={section.content}
          index={idx}
        />
      ))}
    </motion.div>
  );
});

MissionSection.displayName = 'MissionSection';

export default MissionSection;