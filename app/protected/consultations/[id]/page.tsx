/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Star, 
  Sparkles, 
  Target, 
  Heart,
  Briefcase,
  Brain,
  ArrowLeft,
  Download
} from 'lucide-react';
import type { AnalyseAstrologique } from '@/types/astrology.types';

type TabType = 'mission' | 'talents' | 'defis' | 'relations' | 'carriere' | 'spiritualite';

export default function ConsultationResultPage() {
  const params = useParams();
  const router = useRouter();
  const consultationId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analyse, setAnalyse] = useState<AnalyseAstrologique | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('mission');

  useEffect(() => {
    if (!consultationId) return;

    // Polling pour vérifier si l'analyse est prête
    const checkAnalysis = async () => {
      try {
        const response = await fetch(`/api/consultations/${consultationId}/generate-analysis`);
        const data = await response.json();

        if (data.success && data.statut === 'completed' && data.analyse) {
          setAnalyse(data.analyse);
          setLoading(false);
        } else if (data.statut === 'error') {
          setError('Erreur lors de la génération de votre analyse');
          setLoading(false);
        } else {
          // Analyse en cours, réessayer dans 5 secondes
          setTimeout(checkAnalysis, 5000);
        }
      } catch (err) {
        console.error('Erreur récupération analyse:', err);
        setError('Impossible de récupérer votre analyse');
        setLoading(false);
      }
    };

    checkAnalysis();
  }, [consultationId]);

  const tabs = [
    { id: 'mission' as TabType, label: 'Mission de Vie', icon: Target, color: 'purple' },
    { id: 'talents' as TabType, label: 'Talents Naturels', icon: Sparkles, color: 'amber' },
    { id: 'defis' as TabType, label: 'Défis', icon: Brain, color: 'red' },
    { id: 'relations' as TabType, label: 'Relations', icon: Heart, color: 'pink' },
    { id: 'carriere' as TabType, label: 'Carrière', icon: Briefcase, color: 'blue' },
    { id: 'spiritualite' as TabType, label: 'Spiritualité', icon: Star, color: 'indigo' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 sm:p-12 max-w-md w-full text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 mx-auto mb-6"
          >
            <Loader2 className="w-full h-full text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Génération de votre analyse astrologique
          </h2>
          <p className="text-purple-200 mb-4">
            Notre IA analyse votre carte du ciel pour révéler votre mission de vie, vos talents et bien plus...
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-purple-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Cela peut prendre quelques instants</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-pink-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 sm:p-12 max-w-md w-full text-center"
        >
          <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Erreur</h2>
          <p className="text-red-200 mb-6">{error}</p>
          <button
            onClick={() => router.push('/protected/profil')}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-semibold text-white transition-all"
          >
            Retour au profil
          </button>
        </motion.div>
      </div>
    );
  }

  if (!analyse) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/protected/profil')}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Retour</span>
            </button>
            
            <div className="text-center flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-2">
                <Star className="w-6 h-6 text-yellow-300" />
                Votre Analyse Astrologique
              </h1>
              <p className="text-sm text-purple-200 mt-1">
                {analyse.carteDuCiel.sujet.prenoms} {analyse.carteDuCiel.sujet.nom}
              </p>
            </div>

            <button
              onClick={() => {
                const url = `/api/consultations/${consultationId}/download-pdf`;
                window.open(url, '_blank');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all"
            >
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Télécharger PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-2 py-3 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? `bg-${tab.color}-500 text-white shadow-lg`
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'mission' && analyse.missionDeVie && (
              <MissionDeVieTab data={analyse.missionDeVie} />
            )}
            
            {activeTab === 'talents' && analyse.talentsNaturels && (
              <TalentsNaturelsTab data={analyse.talentsNaturels} />
            )}
            
            {activeTab === 'defis' && analyse.defisViePersonnelle && (
              <DefisTab />
            )}
            
            {activeTab === 'relations' && analyse.relations && (
              <RelationsTab data={analyse.relations} />
            )}
            
            {activeTab === 'carriere' && analyse.carriereVocation && (
              <CarriereTab data={analyse.carriereVocation} />
            )}
            
            {activeTab === 'spiritualite' && analyse.spiritualiteCroissance && (
              <SpiritualiteTab data={analyse.spiritualiteCroissance} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Composant pour l'onglet Mission de Vie
function MissionDeVieTab({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      {/* Analyse Karmique */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-purple-300" />
          Analyse Karmique
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-purple-200 mb-2">Nœud Nord</h3>
            <p className="text-sm text-purple-300 mb-3">{data.analyseKarmique.noeudNord.position}</p>
            <p className="text-white/90 leading-relaxed">{data.analyseKarmique.noeudNord.signification}</p>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-pink-200 mb-2">Nœud Sud</h3>
            <p className="text-sm text-pink-300 mb-3">{data.analyseKarmique.noeudSud.position}</p>
            <p className="text-white/90 leading-relaxed">{data.analyseKarmique.noeudSud.signification}</p>
          </div>
        </div>
      </div>

      {/* Synthèse */}
      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-300" />
          Synthèse de Votre Mission
        </h2>
        
        <div className="space-y-4">
          {data.synthese && data.synthese.map((point: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
              <p className="text-white/90 leading-relaxed">{point}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Composants pour les nouveaux onglets
function DefisTab() {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white">
      <h2 className="text-2xl font-bold mb-4">Défis de Vie Personnelle</h2>
      <p className="text-purple-200">Section en développement...</p>
    </div>
  );
}

function RelationsTab({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Heart className="w-6 h-6 text-pink-300" />
          {data.titre}
        </h2>
        
        <div className="space-y-4">
          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-pink-200 mb-3">Style Relationnel</h3>
            <p className="text-white/90 leading-relaxed mb-2">
              <strong>Vénus:</strong> {data.styleRelationnel.venus}
            </p>
            <p className="text-white/90 leading-relaxed">
              {data.styleRelationnel.description}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Compatibilités</h3>
            <div className="flex flex-wrap gap-2">
              {data.compatibilite.signesCompatibles.map((signe: string, i: number) => (
                <span key={i} className="px-4 py-2 bg-pink-500/30 rounded-full text-white">
                  {signe}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CarriereTab({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-300" />
          {data.titre}
        </h2>
        
        <div className="space-y-4">
          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-blue-200 mb-3">Vocation</h3>
            <p className="text-white/90 leading-relaxed">
              {data.milieuDuCiel.description}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Domaines Recommandés</h3>
            <ul className="space-y-2">
              {data.domainesRecommandes.map((domaine: string, i: number) => (
                <li key={i} className="flex items-center gap-2 text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-green-300" />
                  {domaine}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpiritualiteTab({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Star className="w-6 h-6 text-indigo-300" />
          {data.titre}
        </h2>
        
        <div className="space-y-4">
          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-indigo-200 mb-3">Chemin Spirituel</h3>
            <p className="text-white/90 leading-relaxed">
              {data.cheminSpirituel.description}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Pratiques Recommandées</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {data.pratiquesRecommandees.map((pratique: string, i: number) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 rounded-lg px-4 py-2">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span className="text-white/90 text-sm">{pratique}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// Composant pour l'onglet Talents Naturels
function TalentsNaturelsTab({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      {/* Intellect & Communication */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Brain className="w-6 h-6 text-amber-300" />
          Intellect & Communication
        </h2>
        
        <div className="space-y-4">
          <div>
            <p className="text-amber-200 font-semibold mb-2">
              {data.intellectCommunication.soleil} • {data.intellectCommunication.mercure}
            </p>
            <p className="text-white/90 leading-relaxed mb-4">
              {data.intellectCommunication.description}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-3">
            {data.intellectCommunication.talents && data.intellectCommunication.talents.map((talent: string, index: number) => (
              <div key={index} className="flex items-center gap-2 bg-white/5 rounded-lg px-4 py-2">
                <Star className="w-4 h-4 text-yellow-300" />
                <span className="text-white/90 text-sm">{talent}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Synthèse */}
      <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-300" />
          Synthèse de Vos Talents
        </h2>
        
        <div className="space-y-4">
          {data.synthese && data.synthese.map((point: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
              <p className="text-white/90 leading-relaxed">{point}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
