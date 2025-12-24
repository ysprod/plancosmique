import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

 
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { token } = body;

        if (!token) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Token manquant' 
                },
                { status: 400 }
            );
        }

        // URL de vérification MoneyFusion (endpoint public de notification)
        const verifyUrl = `https://www.pay.moneyfusion.net/paiementNotif/${token}`;
        // Appel à l'API MoneyFusion pour vérifier le paiement
        const response = await axios.get(
            verifyUrl,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 30000, // 30 secondes
            }
        );
        // Traiter la réponse selon la structure MoneyFusion
        const data = response.data;

        if (data.statut && data.code_statut === 1) {
            // Paiement réussi
            return NextResponse.json({
                success: true,
                status: 'success',
                payment: data.data,
                message: data.message || 'Paiement vérifié avec succès',
            });
        } else if (data.code_statut === 2) {
            // Paiement déjà utilisé
            return NextResponse.json({
                success: false,
                status: 'already_used',
                message: data.message || 'Ce paiement a déjà été traité',
            });
        } else if (data.code_statut === 3) {
            // Paiement en attente
            return NextResponse.json({
                success: false,
                status: 'pending',
                message: data.message || 'Paiement en attente de confirmation',
            });
        } else {
            // Autres erreurs
            return NextResponse.json({
                success: false,
                status: 'failed',
                error: data.message || 'Échec de la vérification du paiement',
            });
        }
    } catch (error) {
        console.error('[MoneyFusion API] Erreur lors de la vérification:', error);

        if (axios.isAxiosError(error)) {
            if (error.response) {
                return NextResponse.json(
                    {
                        success: false,
                        status: 'failed',
                        error: error.response.data?.message || 'Erreur lors de la vérification du paiement',
                    },
                    { status: error.response.status }
                );
            } else if (error.request) {
                return NextResponse.json(
                    {
                        success: false,
                        status: 'failed',
                        error: 'Impossible de contacter le service de paiement',
                    },
                    { status: 503 }
                );
            }
        }

        return NextResponse.json(
            {
                success: false,
                status: 'failed',
                error: 'Erreur interne du serveur',
            },
            { status: 500 }
        );
    }
}
