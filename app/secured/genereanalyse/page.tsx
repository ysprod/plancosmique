/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { api } from '@/lib/api/client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Calendar,
  Zap,
  Download,
  Share2
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useMemo } from "react";

// =====================================================
// TYPES
// =====================================================
interface Position {
  planete: string;
  signe: string;
  maison: number;
  retrograde: boolean;
}

interface CarteDuCiel {
  sujet: {
    nom: string;
    prenoms: string;
    dateNaissance: string;
    lieuNaissance: string;
    heureNaissance: string;
  };
  positions: Position[];
  aspectsTexte?: string;
}

interface MissionDeVie {
  titre: string;
  contenu: string;
}

interface Metadata {
  processingTime: number;
  tokensUsed: number;
  model: string;
  cached: boolean;
}

interface AnalyseData {
  consultationId: string;
  sessionId: string;
  timestamp: string;
  carteDuCiel: CarteDuCiel;
  missionDeVie: MissionDeVie;
  metadata: Metadata;
  dateGeneration: string;
}

type GenerationStep = 'loading' | 'fetching' | 'generating' | 'success' | 'error';

// =====================================================
// HELPERS
// =====================================================
const PLANET_SYMBOLS: Record<string, string> = {
  'Soleil': '☉',
  'Lune': '☽',
  'Mercure': '☿',
  'Vénus': '♀',
  'Mars': '♂',
  'Jupiter': '♃',
  'Saturne': '♄',
  'Uranus': '♅',
  'Neptune': '♆',
  'Pluton': '♇',
  'Ascendant': 'ASC',
  'Milieu du Ciel': 'MC',
  'Nœud Nord': '☊',
  'Nœud Sud': '☋',
  'Chiron': '⚷',
  'Lilith': '⚸',
  'Vertex': 'VX',
};

const getPlanetSymbol = (planetName: string): string => {
  const cleanName = planetName.replace(' RÉTROGRADE', '').replace(' Vraie', '').trim();
  return PLANET_SYMBOLS[cleanName] || planetName.substring(0, 2).toUpperCase();
};

const parseMarkdownToSections = (markdown: string) => {
  const sections = markdown.split('\n## ').filter(Boolean);
  return sections.map(section => {
    const lines = section.split('\n');
    const title = lines[0].replace(/^#+\s*/, '').replace(/^🌌\s*/, '');
    const content = lines.slice(1).join('\n').trim();
    return { title, content };
  });
};

// =====================================================
// SOUS-COMPOSANTS
// =====================================================
const LoadingSpinner = ({ step }: { step: GenerationStep }) => {
  const messages = {
    loading: "Initialisation...",
    fetching: "Récupération...",
    generating: "Génération en cours...",
    success: "Terminé !",
    error: "Erreur"
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      {step !== 'success' && step !== 'error' && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-full border-4 border-purple-200 dark:border-purple-800 
                   border-t-purple-600 dark:border-t-purple-400 mb-4"
        />
      )}
      
      {step === 'success' && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-4"
        >
          <CheckCircle2 className="w-10 h-10 text-white" />
        </motion.div>
      )}

      {step === 'error' && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mb-4"
        >
          <AlertCircle className="w-10 h-10 text-white" />
        </motion.div>
      )}

      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {messages[step]}
      </p>
    </motion.div>
  );
};

const SubjectCard = ({ sujet }: { sujet: CarteDuCiel['sujet'] }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-4 text-white shadow-lg"
  >
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-1">
          {sujet.nom} {sujet.prenoms}
        </h2>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs opacity-90">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(sujet.dateNaissance).toLocaleDateString('fr-FR', { 
              day: 'numeric', 
              month: 'short', 
              year: 'numeric' 
            })}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {sujet.heureNaissance}
          </div>
        </div>
      </div>
      <Sparkles className="w-8 h-8 opacity-80" />
    </div>
    <div className="flex items-center gap-1 text-xs opacity-90">
      <MapPin className="w-3 h-3" />
      {sujet.lieuNaissance}
    </div>
  </motion.div>
);

const PlanetChip = ({ position }: { position: Position }) => {
  const symbol = getPlanetSymbol(position.planete);
  const isRetrograde = position.retrograde;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`
        relative flex items-center gap-2 p-3 rounded-xl border-2 transition-all
        ${isRetrograde 
          ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800' 
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
        }
        hover:shadow-md
      `}
    >
      {/* Symbole planète */}
      <div className={`
        flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm
        ${isRetrograde 
          ? 'bg-red-500 text-white' 
          : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
        }
      `}>
        {symbol}
      </div>

      {/* Infos */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
          {position.planete.replace(' RÉTROGRADE', '').replace(' Vraie', '')}
        </p>
        <p className="text-[10px] text-gray-600 dark:text-gray-400">
          {position.signe} • M{position.maison}
        </p>
      </div>

      {/* Badge rétrograde */}
      {isRetrograde && (
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 
                      flex items-center justify-center">
          <span className="text-[8px] font-bold text-white">R</span>
        </div>
      )}
    </motion.div>
  );
};

const SkyChartSection = ({ carteDuCiel }: { carteDuCiel: CarteDuCiel }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="space-y-4"
  >
    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
      <span className="text-2xl">🌟</span>
      Carte du Ciel
    </h3>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {carteDuCiel.positions.map((pos, idx) => (
        <PlanetChip key={idx} position={pos} />
      ))}
    </div>
  </motion.div>
);

const CollapsibleSection = ({ 
  title, 
  content, 
  index 
}: { 
  title: string; 
  content: string; 
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(index === 0); // Premier ouvert par défaut

  // Parser le contenu markdown simple
  const formattedContent = useMemo(() => {
    return content
      .split('\n')
      .map((line, i) => {
        // Headers
        if (line.startsWith('### ')) {
          return <h4 key={i} className="text-base font-bold text-gray-900 dark:text-gray-100 mt-4 mb-2">
            {line.replace('### ', '')}
          </h4>;
        }
        if (line.startsWith('## ')) {
          return <h3 key={i} className="text-lg font-bold text-purple-700 dark:text-purple-300 mt-5 mb-3">
            {line.replace('## ', '')}
          </h3>;
        }
        // Bold
        if (line.includes('**')) {
          const parts = line.split(/(\*\*.*?\*\*)/g);
          return <p key={i} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
            {parts.map((part, j) => 
              part.startsWith('**') && part.endsWith('**')
                ? <strong key={j} className="font-semibold text-gray-900 dark:text-gray-100">
                    {part.slice(2, -2)}
                  </strong>
                : part
            )}
          </p>;
        }
        // Bullet points
        if (line.startsWith('• ') || line.startsWith('- ')) {
          return <li key={i} className="text-sm text-gray-700 dark:text-gray-300 ml-4 mb-1">
            {line.substring(2)}
          </li>;
        }
        // Numbered list
        if (/^\d+\./.test(line)) {
          return <li key={i} className="text-sm text-gray-700 dark:text-gray-300 ml-4 mb-1">
            {line.substring(line.indexOf('.') + 1).trim()}
          </li>;
        }
        // Empty line
        if (line.trim() === '') {
          return <div key={i} className="h-2" />;
        }
        // Normal paragraph
        return <p key={i} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
          {line}
        </p>;
      });
  }, [content]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 text-left">
          {title}
        </h4>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-2 max-h-[500px] overflow-y-auto">
              {formattedContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MissionSection = ({ missionDeVie }: { missionDeVie: MissionDeVie }) => {
  const sections = useMemo(() => parseMarkdownToSections(missionDeVie.contenu), [missionDeVie]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-3"
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <span className="text-2xl">✨</span>
        Mission de Vie
      </h3>

      {sections.map((section, idx) => (
        <CollapsibleSection
          key={idx}
          title={section.title}
          content={section.content}
          index={idx}
        />
      ))}
    </motion.div>
  );
};

const MetadataFooter = ({ metadata }: { metadata: Metadata }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.4 }}
    className="flex flex-wrap items-center justify-center gap-4 py-4 text-xs text-gray-500 dark:text-gray-400"
  >
    <div className="flex items-center gap-1">
      <Zap className="w-3 h-3" />
      {metadata.processingTime}s
    </div>
    <div className="flex items-center gap-1">
      <span className="font-mono">{metadata.tokensUsed.toLocaleString()} tokens</span>
    </div>
    <div className="flex items-center gap-1">
      <span className="font-semibold">{metadata.model}</span>
    </div>
    {metadata.cached && (
      <div className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 
                    rounded-full text-[10px] font-semibold">
        CACHED
      </div>
    )}
  </motion.div>
);

// =====================================================
// COMPOSANT PRINCIPAL
// =====================================================
export default function GenereAnalysePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [step, setStep] = useState<GenerationStep>('loading');
  const [analyseData, setAnalyseData] = useState<AnalyseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // =====================================================
  // GÉNÉRATION
  // =====================================================
  const generateAnalysis = async (consultationId: string) => {
    try {
      setStep('fetching');
      console.log('[Analyse] 🚀 Début génération:', consultationId);
      
      const res = await api.post(`/consultations/${consultationId}/generate-analysis`);
      
      if (res.status !== 200 && res.status !== 201) {
        throw new Error(res.data?.message || 'Erreur de génération');
      }

      const analyse = res.data?.analyse;
      if (!analyse) {
        throw new Error('Aucune analyse reçue');
      }

      console.log('[Analyse] ✅ Analyse reçue');
      setAnalyseData(analyse);
      setStep('success');

    } catch (err: any) {
      console.error('[Analyse] ❌ Erreur:', err);
      setError(err.response?.data?.message || err.message || 'Erreur inconnue');
      setStep('error');
    }
  };

  useEffect(() => {
    const id = searchParams.get('id');
    if (!id) {
      setError('ID consultation manquant');
      setStep('error');
      return;
    }
    generateAnalysis(id);
  }, [searchParams]);

  // =====================================================
  // HANDLERS
  // =====================================================
  const handleRetry = () => {
    const id = searchParams.get('id');
    if (id) {
      setError(null);
      setStep('loading');
      generateAnalysis(id);
    }
  };

  // =====================================================
  // RENDER
  // =====================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 
                  dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
      {/* Header fixe */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
                    border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.push('/secured/consultations')}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 
                     hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold text-sm">Retour</span>
          </button>

          {step === 'success' && (
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 
                         hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Download className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </button>
              <button
                onClick={() => navigator.share?.({ 
                  title: 'Analyse Astrologique', 
                  text: 'Découvrez mon analyse astrologique' 
                })}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 
                         hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Share2 className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        <AnimatePresence mode="wait">
          {/* Loading */}
          {(step === 'loading' || step === 'fetching' || step === 'generating') && (
            <motion.div key="loading">
              <LoadingSpinner step={step} />
            </motion.div>
          )}

          {/* Success */}
          {step === 'success' && analyseData && (
            <motion.div key="success" className="space-y-4 pb-8">
              <SubjectCard sujet={analyseData.carteDuCiel.sujet} />
              <SkyChartSection carteDuCiel={analyseData.carteDuCiel} />
              <MissionSection missionDeVie={analyseData.missionDeVie} />
              <MetadataFooter metadata={analyseData.metadata} />
            </motion.div>
          )}

          {/* Error */}
          {step === 'error' && (
            <motion.div key="error" className="py-8 px-4 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 
                            flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Erreur
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {error}
              </p>
              <button
                onClick={handleRetry}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white 
                         rounded-xl font-semibold transition-colors"
              >
                Réessayer
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
