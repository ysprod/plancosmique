'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  FileText, 
  Target, 
  Lightbulb, 
  Shield, 
  Heart, 
  DollarSign, 
  Gem, 
  Calendar, 
  Sparkle,
  ArrowLeft
  
} from 'lucide-react';
import Link from 'next/link';

// Interface TypeScript pour les aspects de vie personnelle
interface PersonalLifeAspect {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  introduction: string;
  keyInsights: string[];
  deepAnalysis: string;
  whatYouLearn: string[];
  transformation: string;
  practicalExercise: string[];
  affirmation: string;
}

const ViePersonnellePage = () => {
  const [activeTab, setActiveTab] = useState<string>('theme');

  // Données des 10 aspects de vie personnelle
  const personalLifeAspects: PersonalLifeAspect[] = [
    {
      id: 'theme',
      title: 'Mon Thème Astral Complet',
      icon: <FileText className="w-5 h-5" />,
      description: "Carte du ciel et analyse complète de votre personnalité cosmique",
      introduction: "Votre thème astral est l'empreinte énergétique unique du ciel au moment exact de votre naissance. C'est votre ADN cosmique qui révèle qui vous êtes vraiment, au-delà des masques sociaux.",
      keyInsights: [
        "Position des 10 planètes dans les 12 signes du zodiaque",
        "Analyse détaillée de votre Soleil, Lune et Ascendant (la Trinité Sacrée)",
        "Vos 12 maisons astrologiques et les domaines de vie qu'elles gouvernent",
        "Aspects planétaires majeurs : harmoniques et défis",
        "Nœuds lunaires : votre chemin karmique et destinée",
        "Dominantes planétaires et élémentaires de votre personnalité",
        "Votre mission d'âme encodée dans votre configuration céleste"
      ],
      deepAnalysis: "Votre thème astral n'est pas une prédiction figée, mais une carte des potentiels et des défis que votre âme a choisi d'explorer dans cette incarnation. Chaque planète représente une fonction psychologique : le Soleil est votre essence, la Lune votre monde émotionnel, Mercure votre mental, Vénus votre amour, Mars votre action, Jupiter votre expansion, Saturne vos leçons, Uranus votre révolution, Neptune votre spiritualité, Pluton votre transformation. Les aspects entre ces planètes créent la symphonie unique de votre être. Un trigone harmonise, un carré challenge, une opposition polarise, une conjonction fusionne. Comprendre votre thème, c'est vous donner la clé pour naviguer votre vie avec conscience plutôt que de subir les événements.",
      whatYouLearn: [
        "Pourquoi vous agissez, pensez et ressentez comme vous le faites",
        "Vos talents innés et comment les maximiser dans votre vie",
        "Vos zones de vulnérabilité à transformer en forces",
        "Les cycles cosmiques qui influencent votre évolution",
        "Votre compatibilité amoureuse et relationnelle profonde",
        "Le timing optimal pour vos décisions importantes (transits)"
      ],
      transformation: "En comprenant votre thème astral, vous cessez de vous juger et commencez à vous accepter pleinement. Vous découvrez que ce que vous pensiez être des défauts sont en réalité des défis d'évolution. Vous devenez l'acteur conscient de votre vie plutôt que la victime des circonstances.",
      practicalExercise: [
        "Méditez 10 minutes sur votre signe solaire, lunaire et ascendant",
        "Identifiez dans votre quotidien les manifestations de vos planètes dominantes",
        "Tenez un journal des transits planétaires et observez leurs effets sur vous",
        "Célébrez votre retour solaire (anniversaire) comme un nouveau cycle cosmique",
        "Étudiez les thèmes de vos proches pour mieux comprendre vos dynamiques relationnelles",
        "Consultez régulièrement votre thème lors de décisions importantes"
      ],
      affirmation: "Je suis une manifestation unique de l'intelligence cosmique. Mon thème astral est ma boussole spirituelle. Je m'accepte dans toute ma complexité divine.",
    },
    {
      id: 'mission',
      title: 'Ma Mission de Vie',
      icon: <Target className="w-5 h-5" />,
      description: "Ce pour quoi vous êtes venu(e) sur Terre - votre contribution unique au monde",
      introduction: "Votre mission de vie est encodée dans votre Nœud Nord astrologique. C'est la direction que votre âme a choisie pour cette incarnation, le cadeau unique que vous êtes venu offrir à l'humanité.",
      keyInsights: [
        "Nœud Nord : votre destination évolutive dans cette vie",
        "Nœud Sud : vos acquis karmiques des vies passées (zone de confort)",
        "La tension créative entre confort (Sud) et croissance (Nord)",
        "Talents karmiques à développer dans cette incarnation",
        "Les défis principaux sur le chemin de votre mission",
        "Signes de l'univers confirmant que vous êtes aligné(e)",
        "Comment votre mission se manifeste concrètement dans votre vie"
      ],
      deepAnalysis: "Le Nœud Nord représente le territoire inconnu et inconfortable que votre âme désire explorer. C'est votre zone de croissance maximale. Le Nœud Sud, à l'opposé, est ce que vous maîtrisez déjà (vies passées ou enfance), mais qui peut devenir un piège si vous vous y réfugiez trop. Votre mission n'est pas une profession spécifique, mais une qualité d'être à incarner, une fréquence vibratoire à atteindre. Par exemple, un Nœud Nord en Balance cherche à développer l'harmonie et le partenariat après des vies de guerrier solitaire (Nœud Sud en Bélier). Quand vous suivez votre Nœud Nord, la vie devient magique : les synchronicités s'amplifient, les bonnes personnes apparaissent, les portes s'ouvrent mystérieusement. Résister à votre mission crée stagnation et frustration existentielle.",
      whatYouLearn: [
        "Votre raison d'être profonde au-delà du succès matériel",
        "Pourquoi certains chemins vous semblent faciles (Nœud Sud) et d'autres challengeants (Nœud Nord)",
        "Les leçons karmiques que vous êtes venu intégrer",
        "Comment sortir de vos schémas répétitifs limitants",
        "Le sens caché derrière vos épreuves de vie",
        "Votre contribution irremplaçable au collectif humain"
      ],
      transformation: "En embrassant votre mission de vie, vous passez de la survie à l'épanouissement, du hasard à la destinée, de la confusion au sens. Vous réalisez que chaque expérience, même douloureuse, vous préparait à votre mission. Vous devenez qui vous êtes vraiment venu être.",
      practicalExercise: [
        "Écrivez une lettre à votre moi futur vivant pleinement sa mission",
        "Identifiez 3 actions concrètes alignées avec votre Nœud Nord cette semaine",
        "Observez quand vous retombez dans votre Nœud Sud (confort) par peur",
        "Créez un vision board représentant votre mission accomplie",
        "Demandez des signes clairs à l'univers sur votre direction",
        "Partagez votre mission avec quelqu'un de confiance pour l'ancrer"
      ],
      affirmation: "Je suis sur Terre pour une raison sacrée. Ma mission se dévoile à chaque pas que je fais dans la foi. L'univers conspire pour mon accomplissement.",
    },
    {
      id: 'vocation',
      title: 'Ma Vocation Professionnelle',
      icon: <Briefcase className="w-5 h-5" />,
      description: "Le métier qui vous fait vibrer et qui honore votre âme",
      introduction: "Votre vocation est révélée par votre Milieu-du-Ciel (MC) : le point culminant de votre thème astral. C'est la carrière qui vous permet d'exprimer votre essence tout en servant le monde.",
      keyInsights: [
        "Milieu-du-Ciel (MC) : votre destinée publique et professionnelle",
        "Signe et maître du MC : la nature de votre vocation",
        "Maison 10 : comment vous brillez dans le monde",
        "Maison 6 : votre environnement de travail idéal",
        "Carrières alignées avec votre configuration astrologique unique",
        "Timing optimal pour les changements professionnels (transits)",
        "Équilibre entre passion de l'âme et stabilité matérielle"
      ],
      deepAnalysis: "Le Milieu-du-Ciel n'indique pas UN métier précis, mais un archétype professionnel à incarner. Un MC en Gémeaux excellera dans la communication, un MC en Scorpion dans la transformation profonde, un MC en Poissons dans l'aide humanitaire ou artistique. Votre vraie vocation est au croisement de vos talents naturels (Soleil), vos besoins émotionnels (Lune), votre image publique (Ascendant) et votre contribution sociale (MC). Quand vous suivez votre vocation, le travail ne ressemble plus à du travail : vous êtes dans le flow, le temps passe vite, vous êtes énergisé plutôt qu'épuisé. L'argent suit naturellement car vous offrez quelque chose d'authentique et de valeur. Les transits de Saturne et Jupiter sur votre MC marquent les moments clés de votre carrière.",
      whatYouLearn: [
        "Votre vocation authentique au-delà des conditionnements familiaux et sociaux",
        "Les métiers et secteurs où votre énergie s'exprime naturellement",
        "Les périodes favorables pour évoluer professionnellement",
        "Comment transformer vos passions en revenus abondants",
        "Votre style de leadership et d'autorité naturel",
        "L'équilibre parfait entre vie pro et vie perso selon votre thème"
      ],
      transformation: "En embrassant votre vraie vocation, vous cessez de 'travailler pour vivre' et commencez à vivre pleinement à travers votre travail. Vous vous réveillez excité le lundi matin. Votre carrière devient une extension de votre mission d'âme.",
      practicalExercise: [
        "Listez 10 activités où vous perdez la notion du temps (état de flow)",
        "Identifiez vos 5 compétences naturelles que vous sous-estimez",
        "Recherchez des professionnels vivant votre vocation rêvée",
        "Visualisez votre journée de travail idéale dans 3 ans",
        "Créez un plan d'action en 5 étapes vers cette vocation",
        "Testez votre vocation via un projet pilote ou bénévolat"
      ],
      affirmation: "Ma vocation est la rencontre sacrée entre mes dons et les besoins du monde. Je mérite d'être rémunéré(e) abondamment pour être moi-même.",
    },
    {
      id: 'talents',
      title: 'Mes Talents Naturels',
      icon: <Lightbulb className="w-5 h-5" />,
      description: "Ces dons innés que vous possédez (souvent cachés ou oubliés)",
      introduction: "Vos talents naturels sont révélés par vos aspects harmonieux (trigones, sextiles) et vos planètes dominantes. Ce sont les cadeaux cosmiques que vous avez apportés dans cette incarnation.",
      keyInsights: [
        "Identification de vos 3-5 talents majeurs selon votre configuration",
        "Dons innés que vous trouvez 'normaux' mais qui sont exceptionnels",
        "Talents cachés non exploités à réveiller",
        "Comment vos talents servent votre mission de vie",
        "Différence entre talents innés (acquis) et compétences à développer",
        "Synergie entre vos différents dons pour créer votre unicité",
        "Stratégie pour monétiser vos talents authentiques"
      ],
      deepAnalysis: "Vos talents naturels sont si évidents pour vous que vous ne réalisez souvent pas leur valeur. 'Tout le monde peut faire ça, non ?' Erreur ! Ce qui est facile pour vous est difficile pour 90% des gens. Ces talents sont liés aux planètes bien aspectées dans votre thème. Un Mercure fort donne l'éloquence naturelle, une Vénus harmonieuse le sens artistique inné, un Mars puissant le leadership spontané, un Jupiter généreux la capacité à inspirer et enseigner. Ces dons ne demandent pas d'effort car ils font partie de votre essence d'âme. Quand vous les utilisez, vous vous sentez vivant, dans votre élément, énergisé. Le piège : croire qu'ils n'ont pas de valeur parce qu'ils vous viennent facilement. Combiner plusieurs de vos talents crée votre avantage unique et inimitable sur le marché.",
      whatYouLearn: [
        "Vos 3-5 super-pouvoirs que vous sous-estimez actuellement",
        "Ce que les autres admirent en vous (et que vous trouvez banal)",
        "Vos talents d'enfance que vous avez abandonnés à tort",
        "Comment créer une offre professionnelle unique avec vos talents",
        "Pourquoi vous n'avez pas besoin d'être 'le meilleur' pour réussir",
        "Comment vos talents servent les autres et créent de la valeur"
      ],
      transformation: "En reconnaissant et honorant vos talents naturels, vous stoppez l'épuisement de vouloir devenir quelqu'un d'autre. Vous commencez à rayonner depuis votre centre. Les opportunités parfaites vous trouvent naturellement.",
      practicalExercise: [
        "Demandez à 10 personnes : 'Quel est mon plus grand talent selon toi ?'",
        "Revisitez vos passions d'enfance : que faisiez-vous naturellement ?",
        "Notez les compliments récurrents que vous recevez depuis des années",
        "Testez un talent négligé pendant 30 jours (défi personnel)",
        "Créez une offre de service basée sur votre talent principal",
        "Enseignez votre talent à quelqu'un (enseigner révèle la maîtrise)"
      ],
      affirmation: "Mes talents sont des cadeaux divins qui m'ont été confiés. En les partageant généreusement, je bénis le monde et m'enrichis simultanément.",
    },
    {
      id: 'blessures',
      title: 'Mes Blessures Karmiques',
      icon: <Shield className="w-5 h-5" />,
      description: "Ce que votre âme est venue guérir dans cette vie",
      introduction: "Chiron, l'astéroïde du 'guérisseur blessé', révèle votre blessure fondamentale. C'est la douleur que vous transformez en médecine pour les autres.",
      keyInsights: [
        "Position de Chiron : votre blessure primordiale par signe et maison",
        "Schémas répétitifs douloureux à briser dans cette vie",
        "Origine karmique possible de votre souffrance (vies antérieures)",
        "Leçons d'âme cachées dans vos épreuves",
        "Passage du statut de victime à celui de guérisseur",
        "Comment votre douleur devient votre plus grand don",
        "Protocole de guérison profonde adapté à votre Chiron"
      ],
      deepAnalysis: "Chiron représente la blessure qui ne guérit jamais complètement, mais qui, acceptée et intégrée, devient votre source de sagesse et de compassion les plus profondes. C'est souvent une douleur existentielle : sentiment d'abandon (Chiron en 4), de rejet (Chiron en 5), d'impuissance (Chiron en 8), d'inadéquation (Chiron en 10). Cette blessure se manifeste de façon récurrente jusqu'à ce que vous en compreniez le message spirituel. Paradoxalement, c'est précisément dans ce domaine que vous développez une sensibilité et une expertise qui vous permettent d'aider les autres. Votre plus grande faiblesse devient votre super-pouvoir. Le voyage de Chiron est l'alchimie spirituelle : transformer le plomb de la souffrance en or de la guérison. Vous attirez naturellement les personnes ayant des blessures similaires.",
      whatYouLearn: [
        "Pourquoi vous revivez certaines douleurs encore et encore",
        "Le message caché derrière vos plus grandes souffrances",
        "Comment vos épreuves ont développé en vous une force invisible",
        "La différence entre guérir et accepter la blessure",
        "Votre don de guérison unique né de votre propre douleur",
        "Comment votre vulnérabilité devient votre authenticité magnétique"
      ],
      transformation: "En embrassant votre blessure chironienne, vous cessez de fuir la douleur et commencez à l'utiliser comme carburant d'évolution. Vous devenez un phare pour ceux qui souffrent dans l'obscurité. Votre histoire inspire.",
      practicalExercise: [
        "Identifiez le schéma douloureux qui se répète dans votre vie",
        "Écrivez une lettre de pardon à ceux qui ont activé cette blessure",
        "Pratiquez l'auto-compassion face à votre vulnérabilité",
        "Trouvez quelqu'un souffrant similairement et offrez votre écoute",
        "Créez un rituel de libération (écrire et brûler, enterrer)",
        "Consultez un thérapeute spécialisé en astrologie karmique"
      ],
      affirmation: "Ma blessure est sacrée. Elle m'a ouvert le cœur et donné la capacité de toucher profondément les âmes. Je transforme ma douleur en médecine.",
    },
      {
      id: 'amour',
      title: 'Ma Manière d\'Aimer',
      icon: <Heart className="w-5 h-5" />,
      description: "Comment j'aime et comment je souhaite être aimé(e)",
      introduction: "Vénus, Mars et la Lune révèlent votre style amoureux unique : comment vous donnez l'amour, comment vous désirez, et ce dont vous avez besoin pour vous sentir aimé(e).",
      keyInsights: [
        "Vénus : votre langage amoureux et façon de donner/recevoir l'amour",
        "Mars : votre style de séduction et désir sexuel",
        "Lune : vos besoins émotionnels profonds dans l'intimité",
        "Maison 7 : ce que vous recherchez chez un partenaire idéal",
        "Maison 5 : votre romantisme et façon de courtiser",
        "Compatibilités amoureuses favorables selon votre configuration",
        "Défis relationnels récurrents et leurs solutions astrologiques"
      ],
      deepAnalysis: "Votre façon d'aimer est unique et parfaite pour VOUS, même si elle ne correspond pas aux standards romantiques. Vénus en Verseau aime différemment de Vénus en Cancer, et c'est OK ! Vénus montre votre langage amoureux (cadeaux, mots, temps, contact, actes selon son signe). Mars indique ce qui éveille votre passion et désir. La Lune révèle vos besoins de sécurité émotionnelle non-négociables. Les relations difficiles arrivent souvent quand nos Vénus ou Lunes sont en conflit (ex: Vénus Gémeaux avec Vénus Scorpion). Comprendre votre blueprint amoureux vous permet de communiquer vos besoins clairement, de choisir des partenaires compatibles et d'arrêter de vous conformer à des modèles qui ne vous conviennent pas. Les transits de Vénus et Mars indiquent les périodes favorables pour l'amour.",
      whatYouLearn: [
        "Votre façon unique d'exprimer l'amour (et pourquoi elle est valide)",
        "Vos besoins émotionnels non-négociables dans une relation",
        "Les signes astrologiques les plus compatibles avec vous",
        "Pourquoi certaines relations se répètent (patterns karmiques)",
        "Comment attirer l'amour authentique aligné avec votre essence",
        "Le timing cosmique idéal pour rencontrer votre âme sœur"
      ],
      transformation: "En comprenant votre blueprint amoureux, vous cessez de vous conformer à des modèles relationnels qui ne vous conviennent pas. Vous attirez l'amour qui nourrit vraiment votre âme, pas votre ego.",
      practicalExercise: [
        "Identifiez votre langage amoureux principal selon votre Vénus",
        "Communiquez clairement vos besoins à votre partenaire (ou futur partenaire)",
        "Étudiez la synastrie avec vos ex : quelles leçons se répètent ?",
        "Créez une liste de 10 qualités non-négociables chez un partenaire",
        "Pratiquez l'amour de soi quotidiennement (rituel Vénus)",
        "Attendez les bons transits de Vénus pour démarrer une relation sérieuse"
      ],
      affirmation: "Je mérite un amour qui honore mon unicité. J'attire naturellement des partenaires alignés avec mon essence. Mon cœur est ouvert et protégé à la fois.",

    },
    {
      id: 'argent',
      title: 'Mon Rapport à l\'Argent',
      icon: <DollarSign className="w-5 h-5" />,
      description: "Votre relation à l'argent, au travail et au succès matériel",
      introduction: "Jupiter (abondance) et la Maison 2 (ressources) révèlent votre relation à l'argent, vos blocages financiers inconscients et votre potentiel de prospérité.",
      keyInsights: [
        "Jupiter : votre source naturelle d'expansion et d'abondance",
        "Maison 2 : votre relation aux ressources et sécurité matérielle",
        "Saturne en 2 ou aspectant Jupiter : leçons financières karmiques",
        "Croyances limitantes sur l'argent héritées de votre lignée",
        "Cycles de prospérité selon les transits de Jupiter (tous les 12 ans)",
        "Stratégie financière alignée avec votre nature astrologique",
        "Équilibre entre spiritualité et matérialisme"
      ],
      deepAnalysis: "Votre rapport à l'argent est largement inconscient, conditionné par votre enfance et vos vies antérieures. Jupiter bien placé attire l'argent facilement ; affliger, il crée des cycles expansion-contraction. La Maison 2 montre votre sentiment de mériter (ou non) la richesse. Saturne en 2 indique souvent une peur de manquer qui, paradoxalement, une fois travaillée, crée une prospérité solide et durable. L'argent est énergie : il circule vers ceux qui sont en harmonie vibratoire avec lui. Vos blocages financiers sont TOUJOURS émotionnels et spirituels avant d'être pratiques. Les croyances comme 'l'argent corrompt', 'les riches sont méchants', 'je ne mérite pas' sabotent inconsciemment votre abondance. Les transits de Jupiter ouvrent des fenêtres d'opportunités financières tous les 12 ans.",
      whatYouLearn: [
        "Vos croyances limitantes inconscientes sur l'argent",
        "Pourquoi vous sabotez votre propre prospérité",
        "Les périodes favorables pour investir et entreprendre",
        "Comment votre valeur personnelle influence votre richesse",
        "La différence entre richesse égoïque et abondance spirituelle",
        "Votre stratégie financière unique selon votre thème"
      ],
      transformation: "En guérissant votre relation à l'argent au niveau astrologique et énergétique, vous passez de la survie à la prospérité fluide. L'abondance devient votre état naturel, pas une lutte constante.",
      practicalExercise: [
        "Identifiez 5 croyances limitantes sur l'argent et recadrez-les",
        "Créez un rituel de gratitude financière quotidien",
        "Étudiez Jupiter dans votre thème : où est votre chance naturelle ?",
        "Donnez 10% de vos revenus (dîme spirituelle) pour activer la circulation",
        "Visualisez votre abondance future 5 minutes par jour",
        "Planifiez vos investissements selon les transits favorables de Jupiter"
      ],
      affirmation: "L'Univers est infiniment abondant et je suis un canal ouvert pour cette prospérité. L'argent coule vers moi facilement. Je l'utilise avec sagesse et générosité.",

    },
    {
      id: 'stabilite',
      title: 'Ma Stabilité Émotionnelle',
      icon: <Gem className="w-5 h-5" />,
      description: "Votre équilibre intérieur et émotionnel profond",
      introduction: "Votre Lune révèle votre monde intérieur, vos besoins émotionnels fondamentaux et comment cultiver un équilibre psychique durable malgré les tempêtes de la vie.",
      keyInsights: [
        "Lune par signe : votre nature émotionnelle profonde",
        "Lune par maison : où vous cherchez la sécurité affective",
        "Aspects à la Lune : défis et dons émotionnels",
        "Cycles lunaires personnels et leur impact sur votre humeur",
        "Gestion de l'anxiété et du stress selon votre configuration",
        "Besoins de sécurité émotionnelle à honorer absolument",
        "Pratiques d'ancrage et de stabilisation adaptées à votre Lune"
      ],
      deepAnalysis: "La Lune représente votre enfant intérieur, vos réactions instinctives, vos besoins de confort et de sécurité. C'est votre thermostat émotionnel. Une Lune bien aspectée donne une stabilité intérieure naturelle ; une Lune difficile crée des vagues émotionnelles intenses (mais riches !). Votre signe lunaire détermine comment vous gérez le stress : Lune en Terre cherche la structure, en Eau l'expression émotionnelle, en Feu l'action, en Air la compréhension intellectuelle. Les phases lunaires mensuelles affectent votre énergie : nouvelle lune pour intentions, pleine lune pour libération. Comprendre votre Lune vous permet de vous materniser vous-même avec exactitude. L'anxiété est souvent un besoin lunaire non satisfait criant pour être écouté.",
      whatYouLearn: [
        "Vos besoins émotionnels fondamentaux souvent ignorés",
        "Pourquoi certaines situations vous déstabilisent émotionnellement",
        "Comment les phases lunaires influencent votre humeur naturellement",
        "Votre façon unique de vous ressourcer émotionnellement",
        "Les pratiques de stabilisation parfaites pour votre nature",
        "Comment créer votre sanctuaire intérieur indestructible"
      ],
      transformation: "En comprenant et honorant votre Lune, vous devenez votre propre refuge. Les tempêtes extérieures ne vous déstabilisent plus car vous êtes ancré(e) dans votre sanctuaire intérieur inébranlable.",
      practicalExercise: [
        "Identifiez votre besoin émotionnel principal selon votre Lune",
        "Créez un rituel de Nouvelle Lune et Pleine Lune mensuels",
        "Tenez un journal lunaire : notez votre humeur selon les phases",
        "Pratiquez la technique d'ancrage de votre élément lunaire",
        "Créez un espace de confort physique qui nourrit votre Lune",
        "Communiquez vos besoins émotionnels clairement à vos proches"
      ],
      affirmation: "Je suis en sécurité dans mon monde intérieur. Mes émotions sont des messagères, pas des ennemies. Je suis l'océan profond et stable sous les vagues.",

    },
    {
      id: 'cycles',
      title: 'Les Grands Cycles de Vie',
      icon: <Calendar className="w-5 h-5" />,
      description: "Les périodes clés de transformation et d'évolution",
      introduction: "Les transits planétaires majeurs révèlent les saisons de votre vie : moments d'initiation, de transformation profonde et d'opportunités cosmiques à saisir.",
      keyInsights: [
        "Retour de Saturne (29-30 ans, 58-60 ans) : maturité spirituelle",
        "Opposition d'Uranus (42 ans) : crise du milieu de vie et révolution",
        "Retour de Jupiter (12, 24, 36, 48 ans) : cycles d'expansion",
        "Transits de Pluton : morts et renaissances majeures",
        "Cycles de 7 ans (Uranus carré) : changements évolutifs",
        "Progressions lunaires : évolution émotionnelle sur 28 ans",
        "Prédictions personnalisées pour vos 5 prochaines années"
      ],
      deepAnalysis: "Les planètes lentes (Saturne, Uranus, Neptune, Pluton) créent les grands chapitres de votre vie. Leur passage sur vos points sensibles natals déclenche des événements destinés à vous faire évoluer. Ces transits ne sont pas 'bons' ou 'mauvais' mais nécessaires pour votre croissance. Le premier retour de Saturne (29-30 ans) vous demande de devenir adulte spirituellement ; l'opposition d'Uranus (42 ans) vous pousse à vous libérer des cages ; le carré de Neptune peut créer une crise spirituelle qui vous réveille. Connaître vos transits à l'avance vous permet de coopérer avec eux plutôt que de résister. Chaque transit majeur est une opportunité déguisée en défi. Certaines années sont faites pour planter, d'autres pour récolter.",
      whatYouLearn: [
        "Les grandes périodes de votre vie et leur signification",
        "Les 5 prochaines années : défis et opportunités cosmiques",
        "Quand entreprendre, quand consolider, quand lâcher prise",
        "Les moments clés de transformation déjà vécus (rétrospectivement)",
        "Comment surfer sur les vagues de votre destinée avec grâce",
        "Le timing cosmique optimal pour vos décisions majeures"
      ],
      transformation: "En comprenant vos cycles cosmiques, vous cessez de subir votre vie et commencez à surfer sur les vagues de votre destinée. Vous dansez avec le tempo de l'Univers, pas contre lui.",
      practicalExercise: [
        "Identifiez le transit majeur actuel dans votre thème",
        "Révisez votre vie par cycles de 7 ans : quels patterns émergent ?",
        "Préparez-vous consciemment à votre prochain transit important",
        "Célébrez vos retours solaires (anniversaires) comme des portails",
        "Créez une timeline : placez vos événements majeurs sur les transits",
        "Consultez un astrologue pour une prévision détaillée sur 5 ans"
      ],
      affirmation: "Ma vie déploie une symphonie cosmique parfaite. Je fais confiance au timing divin de mon évolution. Chaque cycle m'apporte exactement ce dont j'ai besoin.",

    },
    {
      id: 'spirituel',
      title: 'Mon Lien avec l\'Invisible',
      icon: <Sparkle className="w-5 h-5" />,
      description: "Votre connexion au monde spirituel, rêves et intuition",
      introduction: "Neptune, votre Maison 12 et vos aspects transcendantaux révèlent votre connexion naturelle avec les dimensions spirituelles et votre potentiel d'éveil.",
      keyInsights: [
        "Neptune : votre porte vers l'invisible et spiritualité naturelle",
        "Maison 12 : votre lien avec l'inconscient collectif et plans subtils",
        "Aspects psychiques innés (clairvoyance, clairaudience, clairsentience)",
        "Guides spirituels et protection énergétique personnelle",
        "Méditation et pratiques spirituelles alignées avec votre thème",
        "Rêves prémonitoires et messages oniriques",
        "Potentiel de guérison énergétique (Reiki, magnétisme, channeling)"
      ],
      deepAnalysis: "Neptune dissout les frontières entre le visible et l'invisible. Il représente votre capacité à percevoir au-delà des cinq sens, à ressentir les énergies subtiles, à recevoir des guidances divines. Votre Maison 12 est votre temple intérieur secret où vous communiez avec votre âme et l'Univers. Certaines configurations (Lune en 12, Neptune dominant, aspects à Uranus) indiquent des capacités psychiques naturelles qui peuvent être développées. Votre spiritualité n'est pas ce que vous pratiquez, mais qui vous ÊTES : un être spirituel vivant une expérience humaine. L'éveil spirituel est le souvenir progressif de cette vérité. Vos rêves contiennent des messages de votre âme et de vos guides. Les synchronicités sont des clins d'œil de l'univers.",
      whatYouLearn: [
        "Vos dons psychiques naturels souvent ignorés ou niés",
        "Comment développer votre intuition et médiumnité",
        "Vos guides spirituels et comment communiquer avec eux",
        "La signification spirituelle de vos rêves récurrents",
        "Votre chemin d'éveil spirituel unique selon votre thème",
        "Comment protéger votre énergie en tant qu'être sensible"
      ],
      transformation: "En développant votre lien avec l'invisible, vous réalisez que vous n'êtes jamais seul(e). Vous devenez un canal pour la sagesse divine et servez de pont entre les mondes. Votre vie devient magique.",
      practicalExercise: [
        "Méditez 10 minutes quotidiennement pour ouvrir votre canal intuitif",
        "Tenez un journal de rêves et cherchez les patterns symboliques",
        "Demandez un signe clair à vos guides spirituels et soyez attentif",
        "Pratiquez la visualisation de votre protection énergétique (bulle de lumière)",
        "Explorez une pratique spirituelle alignée avec votre Neptune (yoga, tarot, etc.)",
        "Passez du temps dans la nature pour reconnecter à la Source"
      ],
      affirmation: "Je suis un être infini de lumière temporairement dans un corps humain. Mon intuition me guide parfaitement. Je suis connecté(e) à la sagesse universelle.",

    }
  ]; // Continuez dans la PARTIE 2...
 // ];

  const activeAspect = personalLifeAspects.find(aspect => aspect.id === activeTab);
 

 // const activeAspect = personalLifeAspects.find(aspect => aspect.id === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-fuchsia-50">
      {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-2 mt-2 ml-2 "
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors font-semibold"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Retour</span>
              </motion.button>
            </Link>
          </motion.div> {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-md shadow-lg border-b border-purple-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </motion.div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
              Ma Vie Personnelle
            </h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Explorez votre essence profonde, vos talents cachés et votre véritable destinée à travers 10 aspects fondamentaux de votre existence.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Navigation par onglets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-8"
        >
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {personalLifeAspects.map((aspect) => (
              <motion.button
                key={aspect.id}
                layoutId={activeTab === aspect.id ? "activeTab" : undefined}
                onClick={() => setActiveTab(aspect.id)}
                className={`relative p-4 rounded-xl transition-all duration-300 ${
                  activeTab === aspect.id
                    ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center justify-center">
                  <span className="block mx-auto">
                    {aspect.icon}
                  </span>
                  <span className="hidden sm:block text-xs sm:text-sm font-semibold text-center leading-tight mt-2">
                    {aspect.title}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Contenu de l'onglet actif */}
        <AnimatePresence mode="wait">
          {activeAspect && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12"
            >
              {/* En-tête */}
              <div className="mb-8 pb-6 border-b border-purple-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg">
                    {activeAspect.icon}
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-700 to-fuchsia-600 bg-clip-text text-transparent">
                    {activeAspect.title}
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed italic mb-4">
                  {activeAspect.description}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {activeAspect.introduction}
                </p>
              </div>

              {/* Insights clés */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-violet-700 mb-4 flex items-center gap-2">
                  <Sparkle className="w-6 h-6" />
                  Ce Que Vous Découvrirez
                </h3>
                <div className="grid gap-3">
                  {activeAspect.keyInsights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-lg"
                    >
                      <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{insight}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Analyse profonde */}
              <div className="mb-8 p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
                  🌊 Analyse Approfondie
                </h3>
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                  {activeAspect.deepAnalysis}
                </p>
              </div>

              {/* Ce que vous apprenez */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-violet-700 mb-4">
                  📚 Ce Que Vous Allez Apprendre
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {activeAspect.whatYouLearn.map((learning, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-white border-2 border-purple-200 rounded-lg hover:shadow-lg transition-shadow"
                    >
                      <p className="text-gray-700 leading-relaxed">✨ {learning}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Transformation */}
              <div className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-700 mb-3">
                  🦋 Votre Transformation
                </h3>
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg font-medium">
                  {activeAspect.transformation}
                </p>
              </div>

              {/* Exercice pratique */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-violet-700 mb-4">
                  🎯 Exercice Pratique Immédiat
                </h3>
                <div className="space-y-3">
                  {activeAspect.practicalExercise.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200"
                    >
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Affirmation */}
              <div className="p-6 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 rounded-xl border-2 border-purple-300 text-center mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-purple-800 mb-3">
                  💫 Affirmation de Pouvoir
                </h3>
                <p className="text-gray-800 leading-relaxed text-lg sm:text-xl font-semibold italic">
                  "{activeAspect.affirmation}"
                </p>
              </div>

              {/* Prix et CTA */}
          
                <div className="text-center p-6 bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-xl">
                  <p className="text-sm text-gray-600 mb-4">Analyse personnalisée détaillée</p>
                  <button
                    onClick={() => alert('Fonction de commande à implémenter avec votre backend')}
                    className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
                  >
                    ✨ Commander Cette Analyse
                  </button>
                </div>
             
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA flottant */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <button
          onClick={() => alert('Fonction pack complet à implémenter')}
          className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center gap-2"
        >
          <Sparkle className="w-5 h-5" />
          <span className="hidden sm:inline">Pack Complet</span>
        </button>
      </motion.div>
    </div>
  );
};

export default ViePersonnellePage;
