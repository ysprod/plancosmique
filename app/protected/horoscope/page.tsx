/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, Calendar, Sun, Heart, Briefcase, Activity, 
  Loader2, ArrowLeft, Star, Moon, TrendingUp, Users 
} from 'lucide-react'
import Link from 'next/link'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

type HoroscopeTypeId = 'quotidien' | 'mensuel' | 'annuel' | 'amoureux'

interface Tab {
  id: HoroscopeTypeId
  icon: any
  title: string
  subtitle: string
}

interface HoroscopeResult {
  zodiacSign: string
  symbol: string
  element: string
  period: string
  horoscopeType: string
  generalForecast: string
  love: string
  work: string
  health: string
  spiritualAdvice: string
  luckyColor: string
  dominantPlanet: string
}

// ============================================================================
// UTILITAIRES ASTROLOGIQUES
// ============================================================================

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

const getZodiacSymbol = (sign: string): string => {
  const symbols: { [key: string]: string } = {
    "Bélier": "♈", "Taureau": "♉", "Gémeaux": "♊", "Cancer": "♋",
    "Lion": "♌", "Vierge": "♍", "Balance": "♎", "Scorpion": "♏",
    "Sagittaire": "♐", "Capricorne": "♑", "Verseau": "♒", "Poissons": "♓"
  }
  return symbols[sign] || "✨"
}

const getZodiacElement = (sign: string): string => {
  const elements: { [key: string]: string } = {
    "Bélier": "Feu", "Lion": "Feu", "Sagittaire": "Feu",
    "Taureau": "Terre", "Vierge": "Terre", "Capricorne": "Terre",
    "Gémeaux": "Air", "Balance": "Air", "Verseau": "Air",
    "Cancer": "Eau", "Scorpion": "Eau", "Poissons": "Eau"
  }
  return elements[sign] || "Inconnu"
}

const generateHoroscope = async (
  zodiacSign: string,
  horoscopeType: string,
  birthDate: Date,
  partnerSign?: string
): Promise<HoroscopeResult> => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  const element = getZodiacElement(zodiacSign)
  const symbol = getZodiacSymbol(zodiacSign)
  
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

  const luckyColors: { [key: string]: string } = {
    "Feu": "Rouge rubis et or",
    "Terre": "Vert émeraude et brun",
    "Air": "Bleu ciel et argent",
    "Eau": "Bleu océan et blanc nacré"
  }

  let periodText = ""
  let generalForecast = ""
  
  switch(horoscopeType) {
    case "Quotidien":
      const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      periodText = today
      generalForecast = `Aujourd'hui, l'énergie cosmique ${element === "Feu" ? "embrase" : element === "Eau" ? "apaise" : element === "Air" ? "stimule" : "stabilise"} votre chemin. Les astres vous invitent à ${element === "Feu" ? "prendre des initiatives audacieuses" : element === "Eau" ? "écouter votre intuition profonde" : element === "Air" ? "communiquer avec clarté" : "ancrer vos projets dans le concret"}. La sagesse ancestrale africaine vous rappelle que chaque jour est une nouvelle page de votre histoire.`
      break
    case "Mensuel":
      const currentMonth = new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
      periodText = currentMonth
      generalForecast = `Ce mois de ${currentMonth}, votre signe ${zodiacSign} bénéficie d'influences planétaires favorables. Comme l'enseigne la tradition africaine, 'le tambour appelle, mais c'est le danseur qui choisit sa cadence.' Vous avez le pouvoir de façonner votre destinée. Les énergies cosmiques s'alignent pour vous offrir des opportunités de croissance personnelle et spirituelle.`
      break
    case "Annuel":
      const currentYear = new Date().getFullYear()
      periodText = `Année ${currentYear}`
      generalForecast = `L'année ${currentYear} s'annonce comme une période de transformation profonde pour vous, ${zodiacSign}. Tel le baobab qui grandit lentement mais fermement, vous bâtirez des fondations solides pour votre avenir. Les astres vous encouragent à puiser dans la sagesse de vos racines africaines pour naviguer les défis avec grâce et résilience.`
      break
    case "Amoureux":
      periodText = "Prévisions sentimentales"
      if (partnerSign) {
        generalForecast = `La combinaison ${zodiacSign} - ${partnerSign} crée une danse cosmique unique. Comme le dit la sagesse africaine : 'Deux mains lavent mieux qu'une seule.' Votre union possède un potentiel magnifique d'harmonie et de croissance mutuelle. Les astres révèlent une compatibilité profonde qui, cultivée avec patience et respect, peut fleurir comme un jardin tropical.`
      } else {
        generalForecast = `Dans votre vie sentimentale, ${zodiacSign}, les astres vous invitent à ouvrir votre cœur avec la même générosité que la terre africaine accueille la pluie. L'amour ne se cherche pas, il se cultive. Préparez le terrain de votre cœur, et l'univers y plantera les plus belles fleurs.`
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
      ? `${partnerSign ? `Avec ${partnerSign}, v` : "V"}otre cœur résonne au rythme des tambours ancestraux. ${partnerSign ? "Cette union possède une synergie naturelle qui transcende les différences." : "Une rencontre significative pourrait illuminer votre chemin."} Laissez la vulnérabilité devenir votre force et l'authenticité votre langage d'amour.`
      : `En amour, ${element === "Feu" ? "votre passion naturelle attire les regards" : element === "Eau" ? "votre profondeur émotionnelle touche les cœurs" : element === "Air" ? "votre charme communicatif séduit naturellement" : "votre fidélité rassure et construit"}. ${horoscopeType === "Quotidien" ? "Aujourd'hui" : horoscopeType === "Mensuel" ? "Ce mois-ci" : "Cette année"}, soyez ouvert aux surprises que l'univers vous réserve.`,
    work: `Sur le plan professionnel, ${element === "Feu" ? "votre dynamisme ouvre des portes" : element === "Eau" ? "votre intuition vous guide vers le succès" : element === "Air" ? "vos idées innovantes impressionnent" : "votre persévérance porte ses fruits"}. Comme le forgeron africain qui façonne le métal avec patience et précision, vous créerez votre succès par un travail méthodique et inspiré.`,
    health: `Votre vitalité ${element === "Feu" ? "rayonne naturellement, mais attention à ne pas brûler vos ressources" : element === "Eau" ? "dépend de votre équilibre émotionnel - prenez soin de votre paix intérieure" : element === "Air" ? "nécessite une bonne oxygénation - marchez en pleine nature" : "se renforce par l'ancrage - connectez-vous à la terre"}. La médecine traditionnelle africaine nous enseigne l'importance de l'harmonie entre le corps, l'esprit et l'âme.`,
    spiritualAdvice: randomWisdom,
    luckyColor: luckyColors[element],
    dominantPlanet: element === "Feu" ? "Mars (énergie et action)" : element === "Eau" ? "Lune (émotions et intuition)" : element === "Air" ? "Mercure (communication et intellect)" : "Vénus (amour et stabilité)"
  }
}

// ============================================================================
// COMPOSANT RÉSULTAT
// ============================================================================

const ResultDisplay = ({ result }: { result: HoroscopeResult }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="space-y-6"
  >
    {/* En-tête */}
    <div className="text-center pb-6 border-b border-gray-200">
      <motion.div 
        className="text-6xl md:text-7xl mb-4"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        {result.symbol}
      </motion.div>
      <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
        {result.zodiacSign}
      </h3>
      <p className="text-gray-600 font-medium mb-3">{result.period}</p>
      <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
        <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-semibold">
          {result.element}
        </span>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-semibold">
          {result.horoscopeType}
        </span>
      </div>
    </div>

    {/* Prévision générale */}
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h4 className="font-bold text-gray-900 text-lg">Prévisions Générales</h4>
      </div>
      <p className="text-gray-700 leading-relaxed">{result.generalForecast}</p>
    </div>

    {/* Domaines de vie */}
    <div className="grid gap-4">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-rose-200 transition-all"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Heart className="w-5 h-5 text-rose-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 mb-2">Amour & Relations</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{result.love}</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-blue-200 transition-all"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Briefcase className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 mb-2">Travail & Carrière</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{result.work}</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-green-200 transition-all"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Activity className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 mb-2">Santé & Bien-être</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{result.health}</p>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Sagesse africaine */}
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200">
      <div className="flex items-center gap-2 mb-3">
        <Star className="w-5 h-5 text-amber-600" />
        <h4 className="font-bold text-amber-900">Sagesse Ancestrale</h4>
      </div>
      <p className="text-amber-800 italic leading-relaxed text-sm md:text-base">
        "{result.spiritualAdvice}"
      </p>
    </div>

    {/* Informations astrologiques */}
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-white rounded-xl p-4 border-2 border-gray-100 text-center">
        <Moon className="w-6 h-6 mx-auto mb-2 text-purple-600" />
        <p className="text-xs text-gray-600 mb-1">Planète Dominante</p>
        <p className="font-bold text-gray-900 text-sm">{result.dominantPlanet}</p>
      </div>
      <div className="bg-white rounded-xl p-4 border-2 border-gray-100 text-center">
        <Sparkles className="w-6 h-6 mx-auto mb-2 text-amber-600" />
        <p className="text-xs text-gray-600 mb-1">Couleur Porte-bonheur</p>
        <p className="font-bold text-gray-900 text-sm">{result.luckyColor}</p>
      </div>
    </div>
  </motion.div>
)

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================

export default function HoroscopePage() {
  const [activeTab, setActiveTab] = useState<HoroscopeTypeId>('quotidien')
  const [birthDate, setBirthDate] = useState<string>('')
  const [partnerSign, setPartnerSign] = useState<string>('')
  const [result, setResult] = useState<HoroscopeResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const tabs: Tab[] = [
    { id: 'quotidien', icon: Sun, title: "Quotidien", subtitle: "Aujourd'hui" },
    { id: 'mensuel', icon: Calendar, title: "Mensuel", subtitle: "Ce mois" },
    { id: 'annuel', icon: TrendingUp, title: "Annuel", subtitle: "Cette année" },
    { id: 'amoureux', icon: Heart, title: "Amour", subtitle: "Compatibilité" },
  ]

  const zodiacSigns = [
    "Bélier", "Taureau", "Gémeaux", "Cancer", "Lion", "Vierge",
    "Balance", "Scorpion", "Sagittaire", "Capricorne", "Verseau", "Poissons"
  ]

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
        tabs.find(t => t.id === activeTab)?.title || 'Quotidien',
        date,
        activeTab === 'amoureux' && partnerSign ? partnerSign : undefined
      )
      setResult(horoscope)
    } catch (err) {
      setError('Erreur lors de la génération de l\'horoscope. Veuillez réessayer.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 z-50 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Background subtil */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-semibold text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3">
            HOROSCOPE
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
            Découvrez votre horoscope personnalisé inspiré des sagesses astrologiques africaines
          </p>
        </motion.div>

        {/* Navigation par onglets */}
        <div className="mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-4 rounded-2xl border-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-br from-purple-500 to-pink-600 border-purple-600 text-white shadow-lg'
                    : 'bg-white border-gray-200 hover:border-purple-300 text-gray-700'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 text-center">
                  <tab.icon className={`w-6 h-6 mx-auto mb-2 ${
                    activeTab === tab.id ? 'text-white' : 'text-gray-600'
                  }`} />
                  <div className={`font-bold text-sm ${
                    activeTab === tab.id ? 'text-white' : 'text-gray-900'
                  }`}>
                    {tab.title}
                  </div>
                  <div className={`text-xs mt-1 ${
                    activeTab === tab.id ? 'text-purple-100' : 'text-gray-500'
                  }`}>
                    {tab.subtitle}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Formulaire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-gray-200 shadow-sm mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Date de naissance
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none text-gray-900"
                required
              />
              <p className="mt-2 text-xs text-gray-500">
                Votre signe sera calculé automatiquement
              </p>
            </div>

            {activeTab === 'amoureux' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Signe de votre partenaire (optionnel)
                </label>
                <select
                  value={partnerSign}
                  onChange={(e) => setPartnerSign(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none text-gray-900"
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
                className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm font-medium"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-2xl p-12 border-2 border-gray-200 text-center"
            >
              <Loader2 className="w-12 h-12 mx-auto mb-4 text-purple-600 animate-spin" />
              <p className="text-gray-600 font-medium">Consultation des étoiles ancestrales...</p>
            </motion.div>
          )}

          {!loading && !result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-12 border-2 border-purple-200 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md">
                <Sparkles className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Prêt à découvrir votre destinée ?
              </h3>
              <p className="text-gray-600 text-sm">
                Remplissez le formulaire pour recevoir votre horoscope personnalisé
              </p>
            </motion.div>
          )}

          {!loading && result && <ResultDisplay result={result} />}
        </AnimatePresence>
      </div>
    </div>
  )
}
