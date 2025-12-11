// ==================== EXPORTS CENTRALISÉS ====================

// Composants visuels
export { BackgroundBlobs } from './BackgroundBlobs';
export { CompletionBanner } from './CompletionBanner';
export { StatusCard } from './StatusCard';
export { ActionButtons } from './ActionButtons';
export { SecurityNote } from './SecurityNote';

// Hooks
export { usePaymentCallback } from './usePaymentCallback';
export { useAnimationVariants } from './useAnimationVariants';
export { useAnalysisProgress } from '@/hooks/useAnalysisProgress';
// Types
export type {
  PaymentStatus,
  PaymentData,
  StatusConfig,
  AnalysisStage,
  AnalysisProgressData,
} from './types';