import React, { memo } from 'react';

interface SectionProps {
    number: string;
    title: string;
    icon: React.ElementType;
    iconColor: string;
    children: React.ReactNode;
}

const Section = memo<SectionProps>(({ number, title, icon: Icon, iconColor, children }) => (
    <section className="mb-6 scroll-mt-24" id={`section-${number}`}>
        <div className="flex items-center gap-2.5 mb-3">
            <div className={`${iconColor} p-1.5 rounded-lg flex-shrink-0`}>
                <Icon className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                {number}. {title}
            </h2>
        </div>
        <div className="pl-8 space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {children}
        </div>
    </section>
));
Section.displayName = 'Section';

export default Section;
