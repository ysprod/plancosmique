/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Calendar, Sun, Heart, Briefcase, Activity, Eye, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// Fonction pour calculer le signe astrologique depuis la date de naissance
const getZodiacSign = (date: Date): string => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Bélier"
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taureau"
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gémeaux"
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer"
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Lion"
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Vierge"
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Balance"
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpion"
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittaire"
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorne"
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Verseau"
  return "Poissons"
}

// Fonction pour obtenir le symbole du signe
const getZodiacSymbol = (sign: string): string => {
  const symbols: { [key: string]: string } = {
    "Bélier": "♈",
    "Taureau": "♉",
    "Gémeaux": "♊",
    "Cancer": "♋",
    "Lion": "♌",
    "Vierge": "♍",
    "Balance": "♎",
    "Scorpion": "♏",
    "Sagittaire": "♐",
    "Capricorne": "♑",
    "Verseau": "♒",
    "Poissons": "♓"
  }
  return symbols[sign] || "✨"
}

// Fonction pour obtenir l'élément du signe
const getZodiacElement = (sign: string): string => {
  const elements: { [key: string]: string } = {
    "Bélier": "Feu",
    "Lion": "Feu",
    "Sagittaire": "Feu",
    "Taureau": "Terre",
    "Vierge": "Terre",
    "Capricorne": "Terre",
    "Gémeaux": "Air",
    "Balance": "Air",
    "Verseau": "Air",
    "Cancer": "Eau",
    "Scorpion": "Eau",
    "Poissons": "Eau"
  }
  return elements[sign] || "Inconnu"
}

// Fonction pour générer un horoscope personnalisé
const generateHoroscope = async (
  zodiacSign: string,
  horoscopeType: string,
  birthDate: Date,
  partnerSign?: string
): Promise<any> => {
  // Simulation d'un appel API - Dans une vraie application, cela appellerait une API IA
  await new Promise(resolve => setTimeout(resolve, 2000))

  const element = getZodiacElement(zodiacSign)
  const symbol = getZodiacSymbol(zodiacSign)
  
  // Proverbes africains par type
  const africanWisdom: { [key: string]: string[] } = {
    "Quotidien": [
      "Comme le dit le proverbe bambara : 'Le soleil du matin ne dure pas toute la journée.' Profitez de chaque instant.",
      "Sagesse Yoruba : 'Celui qui plante des arbres sachant qu'il ne s'assiéra jamais à leur ombre a commencé à comprendre le sens de la vie.'",
      "Proverbe Akan : 'La sagesse est comme un baobab, une seule personne ne peut l'embrasser.'",
    ],
    "Mensuel": [
      "Proverbe Swahili : 'Haraka haraka haina baraka' - La précipitation n'apporte pas de bénédiction. Ce mois, prenez votre temps.",
      "Sagesse Zoulou : 'Umuntu ngumuntu ngabantu' - Une personne est une personne à travers les autres. Connectez-vous à votre communauté.",
      "Proverbe Peul : 'Le fleuve suit son cours, mais n'oublie jamais sa source.' Restez fidèle à vos racines.",
    ],
    "Annuel": [
      "Proverbe Malinké : 'L'arbre qui tombe fait plus de bruit que la forêt qui pousse.' Cette année, cultivez en silence.",
      "Sagesse Ashanti : 'Personne ne teste la profondeur d'une rivière avec ses deux pieds.' Avancez avec prudence et sagesse.",
      "Proverbe Bamiléké : 'Le lion et l'antilope ne boivent pas au même point d'eau.' Choisissez vos alliances avec discernement.",
    ],
    "Amoureux": [
      "Proverbe Wolof : 'L'amour est comme un bébé, il a besoin d'être porté avec soin.' Chérissez votre relation.",
      "Sagesse Bantou : 'Deux antilopes marchent ensemble, elles voient le lion de loin.' L'union fait la force en amour.",
      "Proverbe Igbo : 'Où les cœurs battent ensemble, la forêt chante.' Cultivez l'harmonie dans votre couple.",
    ]
  }

  const randomWisdom = africanWisdom[horoscopeType][Math.floor(Math.random() * africanWisdom[horoscopeType].length)]

  // Couleurs porte-bonheur par élément
  const luckyColors: { [key: string]: string } = {
    "Feu": "Rouge rubis et or",
    "Terre": "Vert émeraude et brun",
    "Air": "Bleu ciel et argent",
    "Eau": "Bleu océan et blanc nacré"
  }

  // Génération contextuelle selon le type
  let periodText = ""
  let generalForecast = ""
  
  switch(horoscopeType) {
    case "Quotidien":
      const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      periodText = today
      generalForecast = `Aujourd'hui, l'énergie cosmique ${element === "Feu" ? "embrase" : element === "Eau" ? "apaise" : element === "Air" ? "stimule" : "stabilise"} votre chemin. Les astres vous invitent à ${element === "Feu" ? "prendre des initiatives audacieuses" : element === "Eau" ? "écouter votre intuition profonde" : element === "Air" ? "communiquer avec clarté" : "ancrer vos projets dans le concret"}. La sagesse ancestrale africaine vous rappelle que chaque jour est une nouvelle page de votre histoire. Restez aligné avec vos ancêtres et leur lumière guidera vos pas.`
      break
    case "Mensuel":
      const currentMonth = new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
      periodText = currentMonth
      generalForecast = `Ce mois de ${currentMonth}, votre signe ${zodiacSign} bénéficie d'influences planétaires favorables. Comme l'enseigne la tradition africaine, 'le tambour appelle, mais c'est le danseur qui choisit sa cadence.' Vous avez le pouvoir de façonner votre destinée. Les énergies cosmiques s'alignent pour vous offrir des opportunités de croissance personnelle et spirituelle. Écoutez les murmures de vos ancêtres et laissez la sagesse millénaire éclairer vos choix.`
      break
    case "Annuel":
      const currentYear = new Date().getFullYear()
      periodText = `Année ${currentYear}`
      generalForecast = `L'année ${currentYear} s'annonce comme une période de transformation profonde pour vous, ${zodiacSign}. Tel le baobab qui grandit lentement mais fermement, vous bâtirez des fondations solides pour votre avenir. Les astres vous encouragent à puiser dans la sagesse de vos racines africaines pour naviguer les défis avec grâce et résilience. Cette année sera marquée par la réconciliation avec votre essence authentique et la reconnexion avec votre lignée spirituelle.`
      break
    case "Amoureux":
      periodText = "Prévisions sentimentales"
      if (partnerSign) {
        generalForecast = `La combinaison ${zodiacSign} - ${partnerSign} crée une danse cosmique unique. Comme le dit la sagesse africaine : 'Deux mains lavent mieux qu'une seule.' Votre union possède un potentiel magnifique d'harmonie et de croissance mutuelle. Les astres révèlent une compatibilité profonde qui, cultivée avec patience et respect, peut fleurir comme un jardin tropical sous la pluie bienfaisante.`
      } else {
        generalForecast = `Dans votre vie sentimentale, ${zodiacSign}, les astres vous invitent à ouvrir votre cœur avec la même générosité que la terre africaine accueille la pluie. L'amour frappera à votre porte quand vous serez en paix avec vous-même. La tradition enseigne : 'L'amour ne se cherche pas, il se cultive.' Préparez le terrain de votre cœur, et l'univers y plantera les plus belles fleurs.`
      }
      break
  }

  return {
    zodiacSign,
    symbol,
    element,
    period: periodText,
    horoscopeType,
    generalForecast,
    love: horoscopeType === "Amoureux" 
      ? `${partnerSign ? `Avec ${partnerSign}, v` : "V"}otre cœur résonne au rythme des tambours ancestraux. ${partnerSign ? "Cette union possède une synergie naturelle qui transcende les différences." : "Une rencontre significative pourrait illuminer votre chemin."} Laissez la vulnérabilité devenir votre force et l'authenticité votre langage d'amour. Les ancêtres bénissent les unions fondées sur le respect mutuel et la croissance spirituelle partagée.`
      : `En amour, ${element === "Feu" ? "votre passion naturelle attire les regards" : element === "Eau" ? "votre profondeur émotionnelle touche les cœurs" : element === "Air" ? "votre charme communicatif séduit naturellement" : "votre fidélité rassure et construit"}. ${horoscopeType === "Quotidien" ? "Aujourd'hui" : horoscopeType === "Mensuel" ? "Ce mois-ci" : "Cette année"}, soyez ouvert aux surprises que l'univers vous réserve. Un geste sincère peut transformer une amitié en amour profond.`,
    work: `Sur le plan professionnel, ${element === "Feu" ? "votre dynamisme ouvre des portes" : element === "Eau" ? "votre intuition vous guide vers le succès" : element === "Air" ? "vos idées innovantes impressionnent" : "votre persévérance porte ses fruits"}. Comme le forgeron africain qui façonne le métal avec patience et précision, vous créerez votre succès par un travail méthodique et inspiré. ${horoscopeType === "Quotidien" ? "Aujourd'hui est propice aux" : horoscopeType === "Mensuel" ? "Ce mois favorise les" : "Cette année apporte des"} opportunités de collaboration fructueuse. N'hésitez pas à partager vos visions avec votre communauté professionnelle.`,
    health: `Votre vitalité ${element === "Feu" ? "rayonne naturellement, mais attention à ne pas brûler vos ressources" : element === "Eau" ? "dépend de votre équilibre émotionnel - prenez soin de votre paix intérieure" : element === "Air" ? "nécessite une bonne oxygénation - marchez en pleine nature" : "se renforce par l'ancrage - connectez-vous à la terre"}. La médecine traditionnelle africaine nous enseigne l'importance de l'harmonie entre le corps, l'esprit et l'âme. ${horoscopeType === "Quotidien" ? "Aujourd'hui" : horoscopeType === "Mensuel" ? "Ce mois-ci" : "Cette année"}, privilégiez les rituels de bien-être qui honorent votre corps comme un temple sacré. L'eau, les plantes et le repos sont vos meilleurs alliés.`,
    spiritualAdvice: randomWisdom,
    luckyColor: luckyColors[element],
    dominantPlanet: element === "Feu" ? "Mars (énergie et action)" : element === "Eau" ? "Lune (émotions et intuition)" : element === "Air" ? "Mercure (communication et intellect)" : "Vénus (amour et stabilité)"
  }
}

export default function HoroscopePage() {
  const [birthDate, setBirthDate] = useState<string>('')
  const [horoscopeType, setHoroscopeType] = useState<string>('Quotidien')
  const [partnerSign, setPartnerSign] = useState<string>('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setResult(null)

    if (!birthDate) {
      setError('Veuillez entrer votre date de naissance')
      return
    }

    const date = new Date(birthDate)
    if (isNaN(date.getTime())) {
      setError('Date de naissance invalide')
      return
    }

    const zodiacSign = getZodiacSign(date)
    setLoading(true)

    try {
      const horoscope = await generateHoroscope(
        zodiacSign,
        horoscopeType,
        date,
        horoscopeType === 'Amoureux' && partnerSign ? partnerSign : undefined
      )
      setResult(horoscope)
    } catch (err) {
      setError('Erreur lors de la génération de l\'horoscope. Veuillez réessayer.'+ err)
    } finally {
      setLoading(false)
    }
  }

  const zodiacSigns = [
    "Bélier", "Taureau", "Gémeaux", "Cancer", "Lion", "Vierge",
    "Balance", "Scorpion", "Sagittaire", "Capricorne", "Verseau", "Poissons"
  ]

  const services = [
    {
      icon: Sun,
      title: "Horoscope Quotidien",
      description: "Découvrez les influences astrales du jour pour naviguer avec sagesse et sérénité."
    },
    {
      icon: Calendar,
      title: "Horoscope Mensuel",
      description: "Anticipez les tendances du mois à venir et préparez-vous aux opportunités cosmiques."
    },
    {
      icon: Sparkles,
      title: "Horoscope Annuel",
      description: "Vision globale de votre année astrologique pour planifier votre évolution spirituelle."
    },
    {
      icon: Heart,
      title: "Horoscope Amoureux",
      description: "Explorez la compatibilité amoureuse et les prévisions sentimentales personnalisées."
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(90)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 py-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-amber-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour à l'accueil
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
                Horoscope
              </h1>
              <p className="text-slate-600 mt-2">
                Découvrez votre horoscope personnalisé inspiré des sagesses astrologiques africaines et des traditions cosmiques ancestrales
              </p>
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 pb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">
              <Eye className="w-6 h-6 text-violet-600" />
              Votre Horoscope Personnalisé
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Date de naissance
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                  required
                />
                <p className="mt-2 text-sm text-slate-500">
                  Votre signe astrologique sera calculé automatiquement
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Type d'horoscope
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Quotidien', 'Mensuel', 'Annuel', 'Amoureux'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setHoroscopeType(type)}
                      className={`px-4 py-3 rounded-xl font-medium transition-all ${
                        horoscopeType === type
                          ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {horoscopeType === 'Amoureux' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Signe de votre partenaire (optionnel)
                  </label>
                  <select
                    value={partnerSign}
                    onChange={(e) => setPartnerSign(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                  >
                    <option value="">Sélectionner un signe</option>
                    {zodiacSigns.map((sign) => (
                      <option key={sign} value={sign}>
                        {sign} {getZodiacSymbol(sign)}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Consultation des astres...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Générer mon horoscope
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Résultats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8"
          >
            {!result && !loading && (
              <div className="h-full flex items-center justify-center text-center">
                <div>
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-violet-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    Prêt à découvrir votre destinée ?
                  </h3>
                  <p className="text-slate-600">
                    Remplissez le formulaire pour recevoir votre horoscope personnalisé inspiré des sagesses africaines
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 mx-auto mb-4 text-violet-600 animate-spin" />
                  <p className="text-slate-600">Consultation des étoiles ancestrales...</p>
                </div>
              </div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* En-tête du résultat */}
                <div className="text-center pb-6 border-b border-slate-200">
                  <div className="text-6xl mb-3">{result.symbol}</div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-2">
                    {result.zodiacSign}
                  </h3>
                  <p className="text-slate-600 font-medium">{result.period}</p>
                  <div className="flex items-center justify-center gap-4 mt-3 text-sm text-slate-500">
                    <span className="px-3 py-1 bg-violet-50 rounded-full">
                      Élément : {result.element}
                    </span>
                    <span className="px-3 py-1 bg-purple-50 rounded-full">
                      {result.horoscopeType}
                    </span>
                  </div>
                </div>

                {/* Prévisions générales */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Prévisions Générales</h4>
                      <p className="text-slate-600 leading-relaxed">{result.generalForecast}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Amour</h4>
                      <p className="text-slate-600 leading-relaxed">{result.love}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Travail & Finances</h4>
                      <p className="text-slate-600 leading-relaxed">{result.work}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Activity className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Santé & Bien-être</h4>
                      <p className="text-slate-600 leading-relaxed">{result.health}</p>
                    </div>
                  </div>
                </div>

                {/* Conseil spirituel africain */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Sagesse Ancestrale Africaine
                  </h4>
                  <p className="text-amber-800 italic leading-relaxed">"{result.spiritualAdvice}"</p>
                </div>

                {/* Informations astrologiques */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                  <div className="text-center p-4 bg-violet-50 rounded-xl">
                    <p className="text-sm text-slate-600 mb-1">Planète Dominante</p>
                    <p className="font-semibold text-violet-700">{result.dominantPlanet}</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <p className="text-sm text-slate-600 mb-1">Couleur Porte-bonheur</p>
                    <p className="font-semibold text-purple-700">{result.luckyColor}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
        </motion.div>
      </div>
    </div>
  )
}
