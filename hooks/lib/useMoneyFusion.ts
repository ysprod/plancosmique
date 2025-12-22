import { useCallback, useEffect, useState, useMemo } from 'react';
import { moneyFusionService } from '@/lib/api/services/moneyfusion.service';
import type { InitiatePaymentConfig, InitiatePaymentResult, PaymentState, PaymentStatus, VerifyPaymentResult } from '@/lib/types/moneyfusion.types';
const INITIAL_PAYMENT_STATE: PaymentState = {
    status: 'pending',
    token: null,
    paymentUrl: null,
    paymentDetails: null,
    loading: false,
    error: null,
};
export function useMoneyFusion(options = {}) {
    // ...existing code...
}
