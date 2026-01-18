"use client";
import AnalyseHoroscopePageUI from '@/components/analysehoroscope/AnalyseHoroscopePageUI';
import { useAnalyseHoroscopePage } from '@/hooks/analysehoroscope/useAnalyseHoroscopePage';
import { useAuth } from '@/lib/auth/AuthContext';
import { useSearchParams } from 'next/navigation';

export default function AnalyseHoroscopePageClient() {
    const params = useSearchParams();
    const { user } = useAuth();
    const hook = useAnalyseHoroscopePage(user, params || new URLSearchParams());
    return <AnalyseHoroscopePageUI {...hook} />;
}
