'use client';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, FileText, Mail, MapPin, Phone, Shield, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';

const Header = memo(() => (
    <div className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl 
                border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 
                 hover:text-purple-700 dark:hover:text-purple-300 transition-colors mb-3"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Accueil</span>
            </Link>

            <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 truncate">
                        Conditions d'utilisation
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Mise à jour : 21 déc. 2025
                    </p>
                </div>
            </div>
        </div>
    </div>
));
Header.displayName = 'Header';

const IntroAlert = memo(() => (
    <div className="mb-6 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl 
                border border-purple-200 dark:border-purple-800">
        <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                En utilisant <strong>Mon Étoile</strong>, vous acceptez ces conditions.
                Si vous n'êtes pas d'accord, veuillez ne pas utiliser notre plateforme.
            </p>
        </div>
    </div>
));
IntroAlert.displayName = 'IntroAlert';

interface SectionProps {
    number: string;
    title: string;
    icon: React.ElementType;
    iconColor: string;
    children: React.ReactNode;
}

const Section = memo<SectionProps>(({ number, title, icon: Icon, iconColor, children }) => (
    <section className="mb-6 scroll-mt-24" id={`section-${number}`}>
        <div className="flex items-center gap-2.5 mb-3">
            <div className={`p-1.5 ${iconColor} rounded-lg flex-shrink-0`}>
                <Icon className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                {number}. {title}
            </h2>
        </div>
        <div className="pl-8 space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {children}
        </div>
    </section>
));
Section.displayName = 'Section';

const List = memo(({ items }: { items: string[] }) => (
    <ul className="space-y-1.5 ml-4">
        {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
                <span className="text-purple-500 mt-1 flex-shrink-0">•</span>
                <span>{item}</span>
            </li>
        ))}
    </ul>
));
List.displayName = 'List';

const ContactInfo = memo(() => (
    <section className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
            Contact
        </h2>
        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-3">
            Pour toute question sur ces conditions :
        </p>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <a href="mailto:contact@monetoile.fr"
                    className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    contact@monetoile.org
                </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <a href="tel:+33123456789"
                    className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    +225 07 58 38 53 87
                </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">
                    Mon Étoile, Abidjan, Côte d'Ivoire
                </span>
            </div>
        </div>
    </section>
));
ContactInfo.displayName = 'ContactInfo';

const ActionButtons = memo(() => (
    <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Link
            href="/auth/register"
            className="flex-1 py-2.5 px-6 bg-gradient-to-r from-purple-600 to-pink-600 
               hover:from-purple-700 hover:to-pink-700 text-white font-semibold 
               rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 
               text-center text-sm"
        >
            Créer un compte
        </Link>
        <Link
            href="/auth/login"
            className="flex-1 py-2.5 px-6 bg-white dark:bg-gray-800 
               hover:bg-gray-50 dark:hover:bg-gray-700 
               text-gray-900 dark:text-gray-100 font-semibold 
               rounded-xl border-2 border-gray-200 dark:border-gray-700 
               hover:border-purple-500 dark:hover:border-purple-500
               transition-all duration-200 text-center text-sm"
        >
            Se connecter
        </Link>
    </div>
));
ActionButtons.displayName = 'ActionButtons';
 
export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 
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
                            'Lectures de tarot et d\'oracles',
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
                            'Harceler ou nuire à d\'autres utilisateurs',
                            'Collecter des données sur d\'autres utilisateurs',
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
                            'L\'exactitude absolue des prédictions',
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