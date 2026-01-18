'use client';
import CosmicLoader from '@/components/analysehoroscope/CosmicLoader';
import { AnalyseHoroscopeHeader } from '@/components/analysehoroscope/AnalyseHoroscopeHeader';
import { AnalyseHoroscopeSteps } from '@/components/analysehoroscope/AnalyseHoroscopeSteps';
import { AnalyseHoroscopeErrorToast } from '@/components/analysehoroscope/AnalyseHoroscopeErrorToast';
import { AnalyseHoroscopeLoadingOverlay } from '@/components/analysehoroscope/AnalyseHoroscopeLoadingOverlay';
import { useAnalyseHoroscopePageUI } from '@/hooks/analysehoroscope/useAnalyseHoroscopePageUI';
import { OfferingAlternative, WalletOffering } from '@/lib/interfaces';
import { StepType } from '@/hooks/analysehoroscope/useAnalyseHoroscopePage';

interface AnalyseHoroscopePageUIProps {
    step: StepType;
    loading: boolean;
    paymentLoading: boolean;
    error: string | null;
    consultation: any;
    walletOfferings: WalletOffering[];
    handleOfferingValidation: (selected: OfferingAlternative) => void;
    handleCloseError: () => void;
}

const AnalyseHoroscopePageUI = ({
    step,
    loading,
    paymentLoading,
    error,
    consultation,
    walletOfferings,
    handleOfferingValidation,
    handleCloseError,
}: AnalyseHoroscopePageUIProps) => {
    const { handleBack } = useAnalyseHoroscopePageUI();

    if (loading) {
        return (
            <div className="flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
                <CosmicLoader />
            </div>
        );
    }

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