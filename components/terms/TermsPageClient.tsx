'use client';
import ActionButtons from '@/components/terms/ActionButtons';
import ContactInfo from '@/components/terms/ContactInfo';
import Header from '@/components/terms/Header';
import IntroAlert from '@/components/terms/IntroAlert';
import List from '@/components/terms/List';
import TermsSectionsList from '@/components/terms/TermsSectionsList';
import { useTermsSections } from '@/hooks/commons/useTermsSections';
import Link from 'next/link';

export default function TermsPageClient() {
    const sections = useTermsSections(List, Link);

    return (
        <div className=" bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
            <Header />
            <div className="max-w-4xl mx-auto px-4 py-6 pb-20">
                <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800"                >
                    <IntroAlert />
                    <TermsSectionsList sections={sections} />
                    <ContactInfo />
                    <ActionButtons />
                </div>
            </div>
        </div>
    );
}