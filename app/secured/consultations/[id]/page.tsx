/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { api } from '@/lib/api/client';
import { formatDate } from '@/lib/functions';
import { AnalyseAstrologique, SubjectInfo } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Loader2,
  MapPin,
  Sparkles,
  Star,
  User
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
 
interface SubjectHeaderProps {
  sujet: SubjectInfo;
}

const SubjectHeader: React.FC<SubjectHeaderProps> = ({ sujet }) => (
  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/20 mb-8">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
        <User className="w-8 h-8 text-white" />
      </div>
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          {sujet.prenoms} {sujet.nom}
        </h2>
        <p className="text-purple-200">Thème</p>
      </div>
    </div>

    <div className="grid sm:grid-cols-3 gap-4">
      <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4">
        <Calendar className="w-5 h-5 text-amber-300 flex-shrink-0" />
        <div>
          <p className="text-xs text-purple-300">Date de naissance</p>
          <p className="text-white font-semibold">{formatDate(sujet.dateNaissance)}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4">
        <Clock className="w-5 h-5 text-blue-300 flex-shrink-0" />
        <div>
          <p className="text-xs text-purple-300">Heure de naissance</p>
          <p className="text-white font-semibold">{sujet.heureNaissance}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4">
        <MapPin className="w-5 h-5 text-green-300 flex-shrink-0" />
        <div>
          <p className="text-xs text-purple-300">Lieu</p>
          <p className="text-white font-semibold line-clamp-1">{sujet.lieuNaissance}</p>
        </div>
      </div>
    </div>
  </div>
);

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => (
  <div className="markdown-content prose prose-invert max-w-none">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ ...props }) => (
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-6 flex items-center gap-3" {...props}>
            <Sparkles className="w-8 h-8 text-yellow-300" />
            {props.children}
          </h1>
        ),
        h2: ({ ...props }) => (
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-8 mb-4 flex items-center gap-2" {...props}>
            <Star className="w-6 h-6 text-purple-300" />
            {props.children}
          </h2>
        ),
        h3: ({ ...props }) => (
          <h3 className="text-xl sm:text-2xl font-bold text-purple-200 mt-6 mb-3" {...props} />
        ),
        p: ({ ...props }) => (
          <p className="text-white/90 leading-relaxed mb-4" {...props} />
        ),
        ul: ({ ...props }) => (
          <ul className="space-y-3 mb-4" {...props} />
        ),
        ol: ({ ...props }) => (
          <ol className="space-y-3 mb-4 list-decimal list-inside" {...props} />
        ),
        li: ({ ...props }) => (
          <li className="text-white/90 flex items-start gap-3" {...props}>
            <CheckCircle2 className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
            <span className="flex-1">{props.children}</span>
          </li>
        ),
        strong: ({ ...props }) => (
          <strong className="text-amber-300 font-bold" {...props} />
        ),
        em: ({ ...props }) => (
          <em className="text-purple-300" {...props} />
        ),
        blockquote: ({ ...props }) => (
          <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-4 bg-purple-500/10 rounded-r-lg" {...props} />
        ),
        hr: ({ ...props }) => (
          <hr className="my-8 border-white/20" {...props} />
        ),
        code: ({ inline, ...props }: any) =>
          inline ? (
            <code className="bg-white/10 px-2 py-1 rounded text-purple-300 text-sm" {...props} />
          ) : (
            <code className="block bg-white/10 p-4 rounded-lg text-purple-300 text-sm overflow-x-auto" {...props} />
          )
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
);

export default function ConsultationResultPage() {
  const params = useParams();
  const router = useRouter();
  const consultationId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analyse, setAnalyse] = useState<AnalyseAstrologique | null>(null);

  useEffect(() => {
    if (!consultationId) return;

    const loadAnalysis = async () => {
      try {
        const response = await api.get(`/consultations/analysis/${consultationId}`);

        console.log('Réponse API:', response.data);

        if (response.status !== 200) {
          throw new Error('Analyse non trouvée');
        }

        const data = response.data;

        if (data.analyse) {
          setAnalyse(data.analyse);
          setLoading(false);
        } else {
          setError('Analyse non disponible');
          setLoading(false);
        }
      } catch (err) {
        console.error('Erreur récupération analyse:', err);
        setError('Impossible de récupérer votre analyse');
        setLoading(false);
      }
    };

    loadAnalysis();
  }, [consultationId]);

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
            Chargement de votre analyse
          </h2>
          <p className="text-purple-200 mb-4">
            Préparation de votre thème natal complet...
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-purple-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Veuillez patienter</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error || !analyse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-pink-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 sm:p-12 max-w-md w-full text-center"
        >
          <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Erreur</h2>
          <p className="text-red-200 mb-6">{error || 'Analyse non disponible'}</p>
          <button
            onClick={() => router.push('/secured/consultations')}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-semibold text-white transition-all"
          >
            Retour aux consultations
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Header Fixed */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => router.push('/secured/consultations')}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline font-semibold">Retour</span>
            </button>

            <div className="flex-1 text-center">
              <h1 className="text-lg sm:text-xl font-black text-white flex items-center justify-center gap-2">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
                 <span className="sm:hidden">Analyse</span>
              </h1>
            </div>

            <button
              onClick={() => {
                const url = `/api/consultations/${consultationId}/download-pdf`;
                window.open(url, '_blank');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg rounded-xl text-white font-semibold transition-all"
            >
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Subject Header */}
        <SubjectHeader sujet={analyse.carteDuCiel.sujet} />
        {/* Mission de Vie (Markdown) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/20"
        >
          <MarkdownContent content={analyse.missionDeVie.contenu} />
        </motion.div>
      </div>
    </div>
  );
}
