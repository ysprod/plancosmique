"use client";
import AnalyseHoroscopePageUI from '@/components/analysehoroscope/AnalyseHoroscopePageUI';
import { useAnalyseHoroscopePage } from '@/hooks/commons/useAnalyseHoroscopePage';
import { useAuth } from '@/lib/auth/AuthContext';
import { useSearchParams } from 'next/navigation';

const AnalyseHoroscopePageComponent = () => {
    const params = useSearchParams();
    const { user } = useAuth();
    
    const hook = useAnalyseHoroscopePage(user, params);
    return <AnalyseHoroscopePageUI {...hook} />;
};

export default AnalyseHoroscopePageComponent;