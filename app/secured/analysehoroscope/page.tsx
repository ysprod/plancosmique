"use client";
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { useAnalyseHoroscopePage } from '@/components/analysehoroscope/useAnalyseHoroscopePage';
import AnalyseHoroscopePageUI from '@/components/analysehoroscope/AnalyseHoroscopePageUI';

const AnalyseHoroscopePageComponent = () => {
    const params = useSearchParams();
    const { user } = useAuth();
    const hook = useAnalyseHoroscopePage(user, params);
    return <AnalyseHoroscopePageUI {...hook} />;
};

export default AnalyseHoroscopePageComponent;