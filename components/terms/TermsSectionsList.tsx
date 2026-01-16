'use client';

import React from 'react';
import Section from './Section';

interface TermsSectionsListProps {
  sections: Array<any>;
}

const TermsSectionsList: React.FC<TermsSectionsListProps> = ({ sections }) => (
  <>
    {sections.map(section => (
      <Section
        key={section.number}
        number={section.number}
        title={section.title}
        icon={section.icon}
        iconColor={section.iconColor}
      >
        {section.content}
      </Section>
    ))}
  </>
);

export default TermsSectionsList;
