import { FileText, Target, Briefcase, Lightbulb, Shield, Heart, DollarSign, Gem, Calendar, Sparkle } from 'lucide-react';
import { PersonalLifeAspect } from './types';
 

export const personalLifeAspects: PersonalLifeAspect[] = [
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
    id: 'objectifs',
    title: 'Mes Objectifs de Vie',
    icon: <Target className="w-5 h-5" />,
    description: "Définition claire et plan d'action pour atteindre vos aspirations",
    introduction: "Vos objectifs de vie sont les destinations que vous choisissez d'atteindre au cours de votre existence. Ils donnent un sens directionnel à votre parcours et mobilisent votre énergie vers la réalisation de vos aspirations les plus profondes.",
    keyInsights: [
      "Identification de vos véritables désirs et aspirations",
      "Évaluation de votre situation actuelle et des obstacles potentiels",
      "Définition d'objectifs clairs, mesurables et atteignables",
      "Élaboration d'un plan d'action détaillé et réaliste",
      "Mise en place d'un système de suivi et d'évaluation de vos progrès",
      "Techniques de motivation et de gestion du temps pour rester concentré",
      "Stratégies pour surmonter les obstacles et les échecs éventuels"
    ],
    deepAnalysis: "L'analyse approfondie de vos objectifs de vie implique une introspection sur vos véritables désirs, vos valeurs fondamentales et les motivations qui sous-tendent vos aspirations. Cela nécessite également d'examiner les croyances limitantes et les peurs qui pourraient entraver votre progression. En comprenant ces éléments, vous pouvez définir des objectifs qui sont en alignement authentique avec votre être profond et qui tiennent compte des leçons que vous êtes appelé à apprendre dans cette vie.",
    whatYouLearn: [
      "Comment formuler des objectifs clairs et inspirants",
      "L'importance de l'alignement entre vos objectifs et vos valeurs personnelles",
      "Comment surmonter la procrastination et passer à l'action",
      "Les clés de la persévérance et de la résilience face aux défis",
      "Comment célébrer vos réussites et apprendre de vos échecs",
      "L'importance de la flexibilité et de l'adaptabilité dans la poursuite de vos objectifs",
      "Comment utiliser la visualisation et l'affirmation pour renforcer votre détermination"
    ],
    transformation: "La transformation à travers la définition et l'atteinte de vos objectifs de vie réside dans le développement d'une plus grande clarté sur ce que vous désirez vraiment, ainsi que dans l'acquisition de nouvelles compétences et de nouvelles perspectives. Ce processus vous aide à grandir en tant qu'individu, à renforcer votre confiance en vous et à vous rapprocher de votre véritable potentiel.",
    practicalExercise: [
      "Rédigez une liste de vos 10 objectifs les plus importants dans les différentes sphères de votre vie",
      "Pour chaque objectif, écrivez les raisons pour lesquelles il est important pour vous",
      "Établissez un échéancier réaliste pour atteindre chaque objectif",
      "Identifiez les ressources et les compétences nécessaires pour atteindre vos objectifs",
      "Développez un plan d'action détaillé pour les 3 prochains mois",
      "Révisez et ajustez vos objectifs et votre plan d'action tous les mois",
      "Célébrez vos réussites, même les petites étapes, et apprenez de vos expériences"
    ],
    affirmation: "Je suis le créateur de ma vie et de mon destin. Mes objectifs sont des étapes vers la réalisation de mon potentiel divin. Je suis déterminé, capable et digne de succès.",
  },
  {
    id: 'carriere',
    title: 'Ma Carrière Idéale',
    icon: <Briefcase className="w-5 h-5" />,
    description: "Vision claire et plan d'action pour votre parcours professionnel",
    introduction: "Votre carrière idéale est celle qui est en alignement parfait avec vos passions, vos compétences et vos valeurs. C'est un chemin qui vous permet d'exprimer pleinement votre potentiel tout en contribuant positivement au monde qui vous entoure.",
    keyInsights: [
      "Identification de vos passions et de ce qui vous motive réellement",
      "Évaluation de vos compétences, talents et expériences",
      "Analyse des tendances du marché et des opportunités professionnelles",
      "Définition d'une vision claire de votre carrière idéale",
      "Élaboration d'un plan d'action pour acquérir les compétences et l'expérience nécessaires",
      "Stratégies pour développer votre réseau professionnel et trouver des mentors",
      "Techniques pour surmonter les obstacles et les échecs éventuels dans votre parcours"
    ],
    deepAnalysis: "L'exploration approfondie de votre carrière idéale nécessite une compréhension claire de vos aspirations professionnelles, ainsi qu'une évaluation réaliste de vos compétences et de votre expérience. Cela implique également d'examiner les valeurs qui sont importantes pour vous dans un contexte professionnel, comme l'éthique de travail, l'équilibre entre vie professionnelle et vie privée, et le type d'impact que vous souhaitez avoir à travers votre travail. Cette analyse vous permettra de définir une carrière qui n'est pas seulement réussie au sens traditionnel, mais qui est également épanouissante et significative.",
    whatYouLearn: [
      "Comment identifier et clarifier vos véritables aspirations professionnelles",
      "L'importance de l'alignement entre vos valeurs personnelles et professionnelles",
      "Comment développer les compétences et l'expérience nécessaires pour votre carrière idéale",
      "Les clés pour construire et entretenir un réseau professionnel solide",
      "Comment surmonter la peur de l'échec et prendre des risques calculés",
      "L'importance de la formation continue et de l'adaptabilité dans votre carrière",
      "Comment célébrer vos réussites et apprendre de vos erreurs professionnelles"
    ],
    transformation: "La transformation à travers la construction de votre carrière idéale réside dans le fait de devenir la meilleure version de vous-même sur le plan professionnel. Cela implique de développer de nouvelles compétences, d'élargir votre réseau et d'acquérir une plus grande confiance en vos capacités. Ce processus peut également révéler de nouvelles passions et de nouveaux intérêts, vous guidant vers des opportunités que vous n'auriez peut-être pas envisagées auparavant.",
    practicalExercise: [
      "Faites le point sur vos expériences professionnelles passées et identifiez ce que vous avez aimé et moins aimé",
      "Rédigez une description détaillée de votre carrière idéale dans 5, 10 et 20 ans",
      "Identifiez les compétences et les expériences nécessaires pour atteindre votre carrière idéale",
      "Établissez un plan d'action pour acquérir ces compétences et expériences",
      "Recherchez des mentors ou des modèles dans votre domaine d'intérêt et apprenez d'eux",
      "Participez à des ateliers, des formations ou des cours en ligne pour développer vos compétences",
      "Évaluez régulièrement vos progrès et ajustez votre plan de carrière si nécessaire"
    ],
    affirmation: "Je suis capable de créer une carrière qui m'épanouit et qui est en alignement avec ma véritable nature. J'attire les opportunités qui me rapprochent de ma carrière idéale. Je suis digne de succès et de reconnaissance dans mon domaine.",
  },
  {
    id: 'creativite',
    title: 'Ma Créativité Illimitée',
    icon: <Lightbulb className="w-5 h-5" />,
    description: "Développement et expression de votre potentiel créatif",
    introduction: "Votre créativité est l'une des expressions les plus pures de votre être. C'est une force vitale qui, lorsqu'elle est libérée, peut transformer non seulement votre vie, mais aussi le monde qui vous entoure. La créativité n'est pas réservée aux artistes ; c'est une compétence essentielle dans tous les domaines de la vie et du travail.",
    keyInsights: [
      "Identification des croyances limitantes qui freinent votre créativité",
      "Techniques pour stimuler votre imagination et générer des idées novatrices",
      "Méthodes pour surmonter le blocage créatif et favoriser l'inspiration",
      "Stratégies pour intégrer la créativité dans votre vie quotidienne et professionnelle",
      "Importance de l'expérimentation et de l'acceptation de l'échec comme étape du processus créatif",
      "Comment développer un style et une voix créatifs authentiques",
      "Techniques pour présenter et défendre vos idées créatives avec confiance"
    ],
    deepAnalysis: "L'analyse approfondie de votre créativité implique d'explorer vos expériences passées, vos passions et les moments où vous vous êtes senti le plus vivant et engagé. Cela nécessite également d'examiner les peurs et les croyances qui peuvent entraver votre expression créative. En comprenant ces éléments, vous pouvez libérer votre potentiel créatif et l'appliquer de manière plus consciente et ciblée dans votre vie.",
    whatYouLearn: [
      "Comment identifier et surmonter les obstacles à votre créativité",
      "L'importance de la curiosité et de l'ouverture d'esprit dans le processus créatif",
      "Comment utiliser des techniques de brainstorming et de mind mapping pour générer des idées",
      "Les clés de la narration et de la communication efficace de vos idées créatives",
      "Comment développer une pratique créative régulière et durable",
      "L'importance de la rétroaction et de la révision dans le processus créatif",
      "Comment célébrer votre unicité et utiliser votre histoire personnelle comme source d'inspiration"
    ],
    transformation: "La transformation à travers le développement de votre créativité réside dans la redécouverte de votre capacité innée à créer et à innover. Cela vous permet de vous exprimer plus pleinement, d'apporter des contributions uniques au monde et de trouver des solutions novatrices aux défis de la vie. En libérant votre créativité, vous pouvez également découvrir de nouvelles passions et de nouveaux intérêts qui enrichissent votre vie.",
    practicalExercise: [
      "Tenez un journal créatif : écrivez, dessinez ou créez quelque chose chaque jour",
      "Pratiquez la méditation ou la pleine conscience pour libérer votre esprit et favoriser l'inspiration",
      "Expérimentez avec de nouvelles formes d'expression artistique ou créative",
      "Participez à des ateliers ou des cours pour développer vos compétences créatives",
      "Exposez-vous à de nouvelles idées, cultures et expériences pour stimuler votre imagination",
      "Collaborez avec d'autres personnes créatives pour échanger des idées et des perspectives",
      "Révisez et célébrez vos créations, en apprenant de chaque expérience créative"
    ],
    affirmation: "Je suis un être créatif, capable d'innover et de transformer mes idées en réalité. Ma créativité est une source de joie, d'accomplissement et d'impact positif dans le monde. J'accueille l'inspiration et je l'exprime avec confiance et authenticité.",
  },
  {
    id: 'finances',
    title: 'Mes Finances Épanouies',
    icon: <DollarSign className="w-5 h-5" />,
    description: "Gestion saine et prospère de vos ressources financières",
    introduction: "Vos finances sont un outil puissant pour créer la vie que vous désirez. Une gestion financière saine vous permet de répondre à vos besoins, de réaliser vos rêves et de contribuer positivement au monde. L'argent est une énergie qui circule, et apprendre à bien la gérer est essentiel pour votre épanouissement personnel et professionnel.",
    keyInsights: [
      "Évaluation de votre situation financière actuelle : revenus, dépenses, dettes, épargne",
      "Identification de vos objectifs financiers à court, moyen et long terme",
      "Élaboration d'un budget réaliste et d'un plan d'épargne efficace",
      "Stratégies pour réduire vos dettes et améliorer votre cote de crédit",
      "Techniques d'investissement de base pour faire fructifier votre argent",
      "Importance de l'assurance et de la protection des actifs",
      "Comment préparer votre retraite et planifier votre succession"
    ],
    deepAnalysis: "L'analyse approfondie de vos finances implique une compréhension claire de vos habitudes de consommation, de votre attitude envers l'argent et des croyances qui sous-tendent vos décisions financières. Cela nécessite également d'examiner vos objectifs de vie et comment vos finances peuvent être alignées avec ces objectifs. En comprenant ces éléments, vous pouvez développer une relation plus saine et plus productive avec l'argent et créer une base solide pour votre avenir.",
    whatYouLearn: [
      "Comment établir un budget et s'y tenir",
      "L'importance de l'épargne et comment constituer un fonds d'urgence",
      "Comment gérer et réduire vos dettes de manière efficace",
      "Les bases de l'investissement et comment faire travailler votre argent pour vous",
      "Comment protéger vos actifs et planifier votre succession",
      "L'importance de la formation financière continue et de l'adaptabilité",
      "Comment célébrer vos réussites financières et apprendre de vos erreurs"
    ],
    transformation: "La transformation à travers la gestion de vos finances épanouies réside dans le développement d'une plus grande maîtrise de votre vie et de votre avenir. En apprenant à gérer vos ressources financières de manière efficace, vous gagnez en confiance, en sécurité et en liberté pour poursuivre vos véritables passions et objectifs. Ce processus peut également révéler de nouvelles opportunités et de nouveaux chemins vers l'épanouissement personnel et professionnel.",
    practicalExercise: [
      "Faites un bilan complet de vos finances personnelles : revenus, dépenses, dettes, épargne, investissements",
      "Fixez-vous des objectifs financiers clairs et réalistes à court, moyen et long terme",
      "Élaborez un budget mensuel et un plan d'épargne automatique",
      "Recherchez des moyens de réduire vos dépenses et d'augmenter vos revenus",
      "Informez-vous sur les bases de l'investissement et commencez à investir régulièrement",
      "Protégez vos actifs avec une assurance appropriée et planifiez votre succession",
      "Révisez régulièrement vos objectifs et votre plan financier, et ajustez-les si nécessaire"
    ],
    affirmation: "Je suis responsable de ma vie financière et je fais des choix éclairés qui favorisent mon épanouissement. L'argent est une énergie positive qui circule librement dans ma vie, et je l'utilise pour créer des opportunités et réaliser mes rêves. Je suis digne de prospérité et de succès financier.",
  },
  {
    id: 'spiritualite',
    title: 'Ma Spiritualité Éveillée',
    icon: <Gem className="w-5 h-5" />,
    description: "Connexion profonde avec votre moi intérieur et l'univers",
    introduction: "Votre spiritualité est le fil conducteur qui relie toutes les dimensions de votre être. C'est à travers votre spiritualité que vous trouvez un sens plus profond à votre vie, que vous développez votre intuition et que vous vous connectez à quelque chose de plus grand que vous. La spiritualité n'est pas nécessairement liée à une religion ; c'est une exploration personnelle du sacré et de l'inexpliqué.",
    keyInsights: [
      "Exploration de vos croyances et valeurs spirituelles fondamentales",
      "Techniques de méditation et de pleine conscience pour développer votre connexion intérieure",
      "Importance de la gratitude, du pardon et de l'amour inconditionnel",
      "Comment surmonter les peurs et les doutes spirituels",
      "Stratégies pour intégrer la spiritualité dans votre vie quotidienne",
      "Rituels et pratiques pour nourrir votre âme et célébrer la vie",
      "Comment trouver des enseignants, des mentors ou des communautés spirituelles qui résonnent avec vous"
    ],
    deepAnalysis: "L'exploration approfondie de votre spiritualité implique une introspection sur vos croyances, vos valeurs et vos expériences spirituelles passées. Cela nécessite également d'examiner les peurs, les doutes et les blocages qui peuvent entraver votre croissance spirituelle. En comprenant ces éléments, vous pouvez développer une pratique spirituelle qui est authentique, nourrissante et éclairante.",
    whatYouLearn: [
      "Comment développer une pratique de méditation régulière et efficace",
      "L'importance de l'intention et de l'attention dans votre pratique spirituelle",
      "Comment utiliser des affirmations et des visualisations pour renforcer votre connexion spirituelle",
      "Les clés de l'écoute intérieure et de l'intuition",
      "Comment surmonter les obstacles spirituels courants, comme le doute et la peur",
      "L'importance de la communauté et du soutien dans votre cheminement spirituel",
      "Comment célébrer votre unicité et utiliser votre histoire personnelle comme source d'inspiration spirituelle"
    ],
    transformation: "La transformation à travers l'éveil de votre spiritualité réside dans la redécouverte de votre connexion innée avec le divin, l'univers et votre moi supérieur. Cela vous permet de vivre une vie plus consciente, plus significative et plus alignée avec votre véritable nature. En développant votre spiritualité, vous pouvez également découvrir de nouvelles profondeurs de paix, d'amour et de joie dans votre vie.",
    practicalExercise: [
      "Consacrez du temps chaque jour à la méditation, à la prière ou à la réflexion spirituelle",
      "Tenez un journal spirituel pour enregistrer vos pensées, vos rêves et vos inspirations",
      "Pratiquez la gratitude en notant chaque jour les choses pour lesquelles vous êtes reconnaissant",
      "Lisez des livres ou écoutez des enseignements spirituels qui résonnent avec vous",
      "Participez à des retraites, des ateliers ou des groupes de discussion spirituelle",
      "Créez des rituels personnels pour célébrer les étapes importantes de votre vie",
      "Soyez ouvert aux signes, aux synchronicités et aux messages de l'univers"
    ],
    affirmation: "Je suis un être spirituel vivant une expérience humaine. Je suis connecté à l'univers et à mon moi supérieur, et je fais confiance au processus de la vie. Ma spiritualité est une source de force, de sagesse et d'amour inconditionnel.",
  },
  {
    id: 'relations',
    title: 'Mes Relations Harmonieuses',
    icon: <Shield className="w-5 h-5" />,
    description: "Amélioration de la qualité et de l'harmonie de vos relations",
    introduction: "La qualité de vos relations a un impact direct sur votre bonheur et votre épanouissement. Des relations saines et harmonieuses sont basées sur la communication, le respect, la confiance et l'amour. Que ce soit dans votre vie personnelle ou professionnelle, améliorer vos relations peut transformer votre expérience de vie.",
    keyInsights: [
      "Évaluation de la qualité de vos relations actuelles",
      "Identification des schémas relationnels négatifs et des croyances limitantes",
      "Techniques de communication efficace et d'écoute active",
      "Stratégies pour établir des limites saines et respecter celles des autres",
      "Importance de la vulnérabilité, du pardon et de la réconciliation",
      "Comment cultiver des relations positives et enrichissantes",
      "Techniques pour gérer les conflits et les désaccords de manière constructive"
    ],
    deepAnalysis: "L'analyse approfondie de vos relations implique une introspection sur vos interactions passées et présentes, ainsi que sur les schémas et les croyances qui les sous-tendent. Cela nécessite également d'examiner vos attentes, vos peurs et vos besoins émotionnels. En comprenant ces éléments, vous pouvez améliorer la qualité de vos relations et attirer des connexions plus saines et plus épanouissantes.",
    whatYouLearn: [
      "Comment évaluer et améliorer la qualité de vos relations",
      "L'importance de la communication ouverte et honnête",
      "Comment surmonter les schémas relationnels négatifs et les croyances limitantes",
      "Les clés de l'établissement de limites saines et du respect mutuel",
      "Comment cultiver la patience, l'empathie et la compréhension dans vos relations",
      "L'importance de la gratitude et de l'appréciation dans les relations",
      "Comment célébrer vos réussites relationnelles et apprendre de vos erreurs"
    ],
    transformation: "La transformation à travers l'amélioration de vos relations harmonieuses réside dans le développement d'une plus grande intelligence émotionnelle, d'une meilleure communication et d'une compréhension plus profonde des dynamiques relationnelles. Cela vous permet de créer des connexions plus significatives et épanouissantes, et d'expérimenter un plus grand niveau de bonheur et de satisfaction dans votre vie.",
    practicalExercise: [
      "Faites une liste des personnes importantes dans votre vie et évaluez la qualité de votre relation avec chacune d'elles",
      "Identifiez les schémas relationnels négatifs et les croyances limitantes qui peuvent affecter vos relations",
      "Pratiquez la communication ouverte et honnête avec les personnes de votre entourage",
      "Établissez des limites saines et respectez celles des autres",
      "Exprimez votre gratitude et votre appréciation envers les personnes de votre vie",
      "Participez à des activités ou des ateliers sur la communication et les relations interpersonnelles",
      "Révisez régulièrement vos relations et ajustez votre approche si nécessaire"
    ],
    affirmation: "Je suis digne d'amour, de respect et de relations harmonieuses. J'attire des connexions positives et enrichissantes dans ma vie. Je communique avec clarté, empathie et confiance, et je suis ouvert à recevoir et à donner de l'amour inconditionnel.",
  },
  {
    id: 'sante',
    title: 'Ma Santé Rayonnante',
    icon: <Heart className="w-5 h-5" />,
    description: "Amélioration et maintien de votre bien-être physique et mental",
    introduction: "Votre santé est l'un de vos biens les plus précieux. Sans une bonne santé, il est difficile de profiter pleinement de la vie et d'atteindre vos objectifs. Prendre soin de votre corps et de votre esprit est essentiel pour votre épanouissement personnel et professionnel.",
    keyInsights: [
      "Évaluation de votre état de santé actuel et identification des domaines à améliorer",
      "Importance de la nutrition, de l'exercice et du sommeil pour votre bien-être",
      "Techniques de gestion du stress et de promotion de la santé mentale",
      "Stratégies pour établir et maintenir des habitudes de vie saines",
      "Comment prévenir les maladies et promouvoir la longévité",
      "L'importance des bilans de santé réguliers et de la médecine préventive",
      "Comment trouver un équilibre entre vie professionnelle, vie personnelle et soins de santé"
    ],
    deepAnalysis: "L'analyse approfondie de votre santé implique une évaluation honnête de vos habitudes de vie, de votre état physique et mental, et des facteurs de stress potentiels. Cela nécessite également d'examiner vos antécédents médicaux, vos habitudes alimentaires, votre niveau d'activité physique et votre bien-être émotionnel. En comprenant ces éléments, vous pouvez développer un plan de santé personnalisé qui soutient votre épanouissement global.",
    whatYouLearn: [
      "Comment évaluer et améliorer votre état de santé général",
      "L'importance d'une alimentation équilibrée et d'un exercice régulier",
      "Comment gérer le stress et promouvoir votre santé mentale",
      "Les clés de l'établissement et du maintien d'habitudes de vie saines",
      "Comment prévenir les maladies et promouvoir la longévité",
      "L'importance des bilans de santé réguliers et de la médecine préventive",
      "Comment célébrer vos réussites en matière de santé et apprendre de vos défis"
    ],
    transformation: "La transformation à travers l'amélioration de votre santé rayonnante réside dans le développement d'une plus grande conscience de votre corps et de votre esprit, ainsi que dans l'adoption de modes de vie plus sains et plus équilibrés. Cela vous permet de vous sentir mieux, d'avoir plus d'énergie et de profiter pleinement de chaque instant de votre vie. En prenant soin de votre santé, vous investissez également dans votre avenir et dans votre capacité à réaliser vos rêves et vos objectifs.",
    practicalExercise: [
      "Faites un bilan complet de votre état de santé actuel, y compris vos habitudes alimentaires, votre niveau d'activité physique et votre bien-être mental",
      "Fixez-vous des objectifs de santé clairs et réalistes à court, moyen et long terme",
      "Élaborez un plan d'action pour améliorer votre alimentation, votre exercice et votre gestion du stress",
      "Intégrez des pratiques de pleine conscience ou de méditation dans votre routine quotidienne",
      "Consultez des professionnels de la santé pour des bilans réguliers et des conseils personnalisés",
      "Participez à des activités ou des ateliers sur la santé et le bien-être",
      "Révisez régulièrement vos objectifs et votre plan de santé, et ajustez-les si nécessaire"
    ],
    affirmation: "Je suis responsable de ma santé et de mon bien-être. Je fais des choix éclairés qui favorisent mon épanouissement physique, mental et émotionnel. Mon corps est un temple que je respecte et que je prends soin avec amour et gratitude.",
  },
  {
    id: 'temps',
    title: 'Mon Temps Précieux',
    icon: <Calendar className="w-5 h-5" />,
    description: "Gestion efficace et épanouissante de votre temps",
    introduction: "Le temps est l'une des ressources les plus précieuses que nous ayons. Une gestion efficace de votre temps vous permet de consacrer vos énergies aux activités qui comptent vraiment pour vous, d'atteindre vos objectifs et de vivre une vie équilibrée et épanouissante.",
    keyInsights: [
      "Évaluation de votre gestion actuelle du temps et identification des domaines à améliorer",
      "Techniques pour établir des priorités claires et gérer les distractions",
      "Stratégies pour planifier votre journée, votre semaine et votre mois de manière efficace",
      "Importance de la délégation et de la demande d'aide si nécessaire",
      "Comment dire non de manière assertive et respectueuse",
      "Techniques pour maintenir votre motivation et votre concentration",
      "Comment célébrer vos réussites et ajuster vos plans si nécessaire"
    ],
    deepAnalysis: "L'analyse approfondie de votre gestion du temps implique une évaluation honnête de vos habitudes actuelles, de vos priorités et des obstacles qui vous empêchent d'utiliser votre temps de manière efficace. Cela nécessite également d'examiner vos objectifs de vie et comment une meilleure gestion du temps peut vous aider à les atteindre. En comprenant ces éléments, vous pouvez développer un plan d'action pour utiliser votre temps de manière plus consciente et productive.",
    whatYouLearn: [
      "Comment évaluer et améliorer votre gestion du temps",
      "L'importance de l'établissement de priorités claires",
      "Comment planifier et organiser votre temps de manière efficace",
      "Les clés de la délégation et de la demande d'aide",
      "Comment surmonter la procrastination et rester motivé",
      "L'importance de la flexibilité et de l'adaptabilité dans la gestion du temps",
      "Comment célébrer vos réussites et ajuster vos plans si nécessaire"
    ],
    transformation: "La transformation à travers une gestion efficace de votre temps réside dans le développement d'une plus grande maîtrise de votre vie et de vos priorités. En apprenant à gérer votre temps de manière efficace, vous gagnez en clarté, en concentration et en capacité à réaliser vos objectifs. Ce processus vous permet également de créer un équilibre plus sain entre vos différentes responsabilités et de consacrer plus de temps aux activités qui vous apportent de la joie et de l'épanouissement.",
    practicalExercise: [
      "Faites un bilan complet de votre gestion actuelle du temps : habitudes, priorités, obstacles",
      "Identifiez les domaines où vous pouvez améliorer votre gestion du temps",
      "Établissez des priorités claires pour vos activités quotidiennes, hebdomadaires et mensuelles",
      "Planifiez votre journée la veille, en incluant des pauses et des moments de détente",
      "Apprenez à déléguer des tâches et à demander de l'aide si nécessaire",
      "Pratiquez l'affirmation de soi pour dire non aux distractions et aux engagements non essentiels",
      "Révisez régulièrement vos progrès en matière de gestion du temps et ajustez vos plans si nécessaire"
    ],
    affirmation: "Je suis le maître de mon temps et je l'utilise de manière sage et épanouissante. Chaque jour, je m'approche un peu plus de mes objectifs et de mes rêves. Je célèbre mes réussites et j'apprends de mes expériences.",
  },
  {
    id: 'bienveillance',
    title: 'Ma Bienveillance Inconditionnelle',
    icon: <Sparkle className="w-5 h-5" />,
    description: "Développement de la bienveillance envers vous-même et les autres",
    introduction: "La bienveillance est une qualité essentielle qui enrichit non seulement votre vie, mais aussi celle des personnes qui vous entourent. Être bienveillant, c'est faire preuve de compassion, de compréhension et d'amour inconditionnel, tant envers vous-même qu'envers les autres. La bienveillance est un puissant vecteur de transformation personnelle et collective.",
    keyInsights: [
      "Exploration de vos croyances et attitudes envers vous-même et les autres",
      "Techniques pour développer la compassion et l'empathie",
      "Importance du pardon, tant pour vous-même que pour les autres",
      "Comment surmonter la colère, le ressentiment et d'autres émotions négatives",
      "Stratégies pour cultiver des pensées et des actions bienveillantes au quotidien",
      "Comment intégrer la bienveillance dans vos relations personnelles et professionnelles",
      "Techniques pour évaluer et ajuster vos progrès dans le développement de la bienveillance"
    ],
    deepAnalysis: "L'exploration approfondie de votre bienveillance implique une introspection sur vos croyances, vos valeurs et vos comportements envers vous-même et les autres. Cela nécessite également d'examiner les peurs, les jugements et les résistances qui peuvent entraver votre capacité à être bienveillant. En comprenant ces éléments, vous pouvez développer une pratique de la bienveillance qui est authentique, nourrissante et transformante.",
    whatYouLearn: [
      "Comment développer une attitude bienveillante envers vous-même et les autres",
      "L'importance de la compassion, de l'empathie et du pardon",
      "Comment surmonter les émotions négatives et les pensées limitantes",
      "Les clés de l'intégration de la bienveillance dans vos relations et interactions quotidiennes",
      "Comment célébrer vos réussites et apprendre de vos erreurs dans votre pratique de la bienveillance",
      "L'importance de la patience et de la persévérance dans le développement de la bienveillance",
      "Comment utiliser la visualisation et l'affirmation pour renforcer votre bienveillance"
    ],
    transformation: "La transformation à travers le développement de votre bienveillance réside dans la redécouverte de votre capacité innée à aimer et à comprendre, tant vous-même que les autres. Cela vous permet de vivre une vie plus riche, plus significative et plus connectée. En cultivant la bienveillance, vous contribuez également à créer un monde plus compatissant et harmonieux.",
    practicalExercise: [
      "Pratiquez la méditation de la bienveillance, en vous concentrant sur l'envoi d'amour et de compassion à vous-même et aux autres",
      "Tenez un journal de la bienveillance, en notant les actions et les pensées bienveillantes que vous avez eues chaque jour",
      "Exprimez votre gratitude et votre appréciation envers les personnes de votre vie",
      "Participez à des actes de bonté aléatoires, sans attendre de récompense",
      "Apprenez à écouter les autres avec empathie et sans jugement",
      "Pratiquez le pardon, tant pour vous-même que pour les autres",
      "Révisez régulièrement vos progrès dans le développement de la bienveillance et ajustez votre pratique si nécessaire"
    ],
    affirmation: "Je suis un être de bienveillance, d'amour et de compassion. Je traite chaque être avec respect et dignité, et je contribue à un monde plus harmonieux et compatissant. Je suis digne d'amour et de bonheur, et je partage ces bénédictions avec les autres.",
  },
];
