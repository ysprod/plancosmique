'use client';
import { AnalyseHoroscopeErrorToast } from '@/components/analysehoroscope/AnalyseHoroscopeErrorToast';
import { AnalyseHoroscopeHeader } from '@/components/analysehoroscope/AnalyseHoroscopeHeader';
import { AnalyseHoroscopeLoadingOverlay } from '@/components/analysehoroscope/AnalyseHoroscopeLoadingOverlay';
import { AnalyseHoroscopeSteps } from '@/components/analysehoroscope/AnalyseHoroscopeSteps';
import CosmicLoader from '@/components/analysehoroscope/CosmicLoader';
import { useAnalyseHoroscopePage } from '@/hooks/analysehoroscope/useAnalyseHoroscopePage';

const AnalyseHoroscopePageUI = () => {
    const {
        step, loading, paymentLoading, error, consultation, walletOfferings,
        handleOfferingValidation, handleCloseError, handleBack,
    } = useAnalyseHoroscopePage();

    if (loading) { return (<CosmicLoader />); }

    return (
        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-4 px-3">
            <AnalyseHoroscopeHeader />
            <div className="relative overflow-hidden">
                <div className="max-w-4xl mx-auto py-6">
                    <AnalyseHoroscopeSteps
                        step={step}
                        paymentLoading={paymentLoading}
                        consultation={consultation}
                        walletOfferings={walletOfferings}
                        handleOfferingValidation={handleOfferingValidation}
                        handleBack={handleBack}
                    />
                </div>
                <AnalyseHoroscopeLoadingOverlay paymentLoading={paymentLoading} step={step} />
            </div>
            <AnalyseHoroscopeErrorToast error={error} handleCloseError={handleCloseError} />
        </div>
    );
};

export default AnalyseHoroscopePageUI;