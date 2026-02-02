import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            token,
            montant,
            numeroSend,
            nomclient,
            reference,
            date_paiement,
            statut,
            code_statut,
            message,
            personal_Info,
        } = body;

        if (!token) {
            console.error('[MoneyFusion Webhook] Token manquant dans la notification');
            return NextResponse.json(
                { success: false, error: 'Token manquant' },
                { status: 400 }
            );
        }

        let metadata = null;
        if (personal_Info && Array.isArray(personal_Info) && personal_Info.length > 0) {
            metadata = personal_Info[0];
        }

        if (code_statut === 1) {
            // Paiement réussi
            // TODO: Mettre à jour la base de données selon le type de paiement
            if (metadata?.type === 'OFFRANDES') {
                // Marquer la commande comme payée
                // Envoyer notification au client
                // Enregistrer la transaction
            } else if (metadata?.type === 'CONSULTATION') {
                // Marquer la consultation comme payée
                // TODO: Mettre à jour le statut dans la DB
                // await db.consultations.updateOne(
                //   { _id: metadata.consultationId },
                //   { $set: { status: 'paid', paymentToken: token, paidAt: new Date() }}
                // );

                // L'analyse a déjà été générée AVANT le paiement
                // On ne déclenche plus la génération ici

                // Optionnel: Envoyer un email de confirmation de paiement
                // (différent de l'email d'analyse déjà envoyé)

                // Enregistrer la transaction
            }

            return NextResponse.json({
                success: true,
                message: 'Webhook traité avec succès',
            });
        } else if (code_statut === 2) {
            return NextResponse.json({
                success: true,
                message: 'Paiement déjà traité',
            });
        } else if (code_statut === 3) {
            return NextResponse.json({
                success: true,
                message: 'Paiement en attente',
            });
        } else {
            return NextResponse.json({
                success: true,
                message: 'Notification reçue',
            });
        }
    } catch (error) {
        console.error('[MoneyFusion Webhook] Erreur lors du traitement:', error);

        // Toujours retourner 200 pour éviter que MoneyFusion réessaie indéfiniment
        return NextResponse.json({
            success: false,
            error: 'Erreur interne',
            message: error instanceof Error ? error.message : 'Erreur inconnue',
        }, { status: 200 });
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'Webhook MoneyFusion - Utilisez POST pour envoyer des notifications',
        endpoint: '/api/webhooks/moneyfusion',
    });
}
