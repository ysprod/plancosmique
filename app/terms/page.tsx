'use client';
import ActionButtons from '@/components/terms/ActionButtons';
import ContactInfo from '@/components/terms/ContactInfo';
import Header from '@/components/terms/Header';
import IntroAlert from '@/components/terms/IntroAlert';
import List from '@/components/terms/List';
import Section from '@/components/terms/Section';
import { motion } from 'framer-motion';
import { AlertCircle, FileText, Shield, UserCheck } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
    return (
        <div className=" bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 
                    dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
            <Header />
            <div className="max-w-4xl mx-auto px-4 py-6 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl 
                   shadow-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800"
                >
                    <IntroAlert />

                    <Section
                        number="1"
                        title="Acceptation des conditions"
                        icon={UserCheck}
                        iconColor="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                    >
                        <p>
                            L'utilisation de Mon Étoile implique l'acceptation pleine et entière de ces
                            conditions. Nous pouvons les modifier à tout moment ; consultez-les régulièrement.
                        </p>
                    </Section>

                    <Section
                        number="2"
                        title="Description du service"
                        icon={Shield}
                        iconColor="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
                    >
                        <p>Mon Étoile propose des services de voyance, astrologie, numérologie et guidance spirituelle :</p>
                        <List items={[
                            'Consultations avec des professionnels qualifiés',
                            'Analyses astrologiques et numérologiques',
                            "Lectures de tarot et d'oracles",
                            'Pratiques spirituelles et développement personnel',
                            'Boutique de livres et ressources spirituelles'
                        ]} />
                    </Section>

                    <Section
                        number="3"
                        title="Compte utilisateur"
                        icon={UserCheck}
                        iconColor="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    >
                        <p>Pour accéder à certains services, créez un compte. Vous vous engagez à :</p>
                        <List items={[
                            'Fournir des informations exactes et à jour',
                            'Maintenir la confidentialité de vos identifiants',
                            'Être responsable des activités sur votre compte',
                            'Nous informer de toute utilisation non autorisée'
                        ]} />
                    </Section>

                    <Section
                        number="4"
                        title="Utilisation acceptable"
                        icon={Shield}
                        iconColor="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                    >
                        <p>Vous acceptez de ne pas :</p>
                        <List items={[
                            'Utiliser le service à des fins illégales',
                            'Accéder à des comptes non autorisés',
                            'Transmettre des virus ou codes malveillants',
                            "Harceler ou nuire à d'autres utilisateurs",
                            "Collecter des données sur d'autres utilisateurs",
                            'Reproduire le contenu sans autorisation'
                        ]} />
                    </Section>

                    <Section
                        number="5"
                        title="Paiements et remboursements"
                        icon={Shield}
                        iconColor="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                    >
                        <p>
                            Les tarifs sont indiqués en devise locale. Paiements sécurisés. Remboursements possibles :
                        </p>
                        <List items={[
                            'Annulation avant prestation : remboursement intégral',
                            'Service non rendu : remboursement intégral',
                            'Insatisfaction : évaluation au cas par cas'
                        ]} />
                    </Section>

                    <Section
                        number="6"
                        title="Propriété intellectuelle"
                        icon={FileText}
                        iconColor="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                    >
                        <p>
                            Tous les contenus (textes, images, logos, vidéos) sont protégés par les droits
                            de propriété intellectuelle. Reproduction interdite sans autorisation écrite.
                        </p>
                    </Section>

                    <Section
                        number="7"
                        title="Limitation de responsabilité"
                        icon={AlertCircle}
                        iconColor="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    >
                        <p>Mon Étoile fournit des services de guidance et divertissement. Nous ne garantissons pas :</p>
                        <List items={[
                            "L'exactitude absolue des prédictions",
                            'Des résultats spécifiques',
                            'La disponibilité continue du service'
                        ]} />
                        <p className="mt-3 font-semibold text-red-700 dark:text-red-400">
                            ⚠️ Nos services ne remplacent pas un avis médical, juridique ou financier professionnel.
                        </p>
                    </Section>

                    <Section
                        number="8"
                        title="Protection des données"
                        icon={Shield}
                        iconColor="bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
                    >
                        <p>
                            Nous protégeons vos données conformément aux réglementations. Consultez notre{' '}
                            <Link href="/privacy" className="text-purple-600 dark:text-purple-400 hover:underline font-semibold">
                                politique de confidentialité
                            </Link>.
                        </p>
                    </Section>

                    <Section
                        number="9"
                        title="Modification des conditions"
                        icon={FileText}
                        iconColor="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                    >
                        <p>
                            Nous pouvons modifier ces conditions à tout moment. Les modifications sont
                            effectives dès publication. Votre utilisation continue constitue votre acceptation.
                        </p>
                    </Section>

                    <Section
                        number="10"
                        title="Résiliation"
                        icon={AlertCircle}
                        iconColor="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
                    >
                        <p>
                            Nous pouvons suspendre ou résilier votre compte en cas de violation,
                            sans préavis et sans remboursement.
                        </p>
                    </Section>

                    <Section
                        number="11"
                        title="Loi applicable"
                        icon={Shield}
                        iconColor="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
                    >
                        <p>
                            Ces conditions sont régies par le droit ivoirien. Les litiges seront
                            soumis aux tribunaux compétents.
                        </p>
                    </Section>

                    <ContactInfo />
                    <ActionButtons />

                </motion.div>
            </div>
        </div>
    );
}