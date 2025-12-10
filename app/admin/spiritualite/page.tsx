/**
 * Composant d'administration pour gérer le contenu de la spiritualité
 * Connecté au backend NestJS - API v1/spiritualite
 */

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Database, Copy, Check, FileJson, FileCode, Flame, Loader, AlertCircle, Zap } from 'lucide-react';

interface SpiritualPractice {
  _id: string;
  slug: string;
  title: string;
  iconName: string;
  category: string;
  published: boolean;
  order_index: number;
  description: string;
  introduction: string;
  keyElements: string[];
  detailedGuide: string;
  benefits: string[];
  practicalSteps: string[];
  warnings: string[];
  affirmation: string;
  materials?: string[];
  best_timing?: string;
  createdAt?: string;
  updatedAt?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export default function SpiritualiteAdmin() {
  const [practices, setPractices] = useState<SpiritualPractice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<'json' | 'sql' | 'schema'>('json');
  const [exporting, setExporting] = useState(false);
  const [exportData, setExportData] = useState<string>('');
  const [seeding, setSeeding] = useState(false);
  const [seedingSuccess, setSeedingSuccess] = useState(false);

  // Charger les pratiques au démarrage
  useEffect(() => {
    fetchPractices();
  }, []);

  const fetchPractices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/spiritualite`);
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setPractices(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur de connexion au serveur';
      setError(message);
      console.error('Erreur lors du chargement:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchExport = async (format: 'json' | 'sql' | 'schema') => {
    try {
      setExporting(true);
      const response = await fetch(`${API_URL}/spiritualite/admin/export/${format}`);
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setExportData(data.data || JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'export');
      setExportData('');
    } finally {
      setExporting(false);
    }
  };

  const handleExportFormatChange = async (format: 'json' | 'sql' | 'schema') => {
    setExportFormat(format);
    await fetchExport(format);
  };

  const handleCopy = async (content: string, type: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSeed = async () => {
    try {
      setSeeding(true);
      setSeedingSuccess(false);
      setError(null);

      const response = await fetch(`${API_URL}/spiritualite/seed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      setSeedingSuccess(true);
      await fetchPractices();
      setTimeout(() => setSeedingSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'initialisation');
    } finally {
      setSeeding(false);
    }
  };

  const getFilename = () => {
    switch (exportFormat) {
      case 'json':
        return 'spiritualite-data.json';
      case 'sql':
        return 'spiritualite-insert.sql';
      case 'schema':
        return 'spiritualite-schema.sql';
      default:
        return 'export.txt';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-red-600 rounded-xl flex items-center justify-center">
              <Database className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-red-600 bg-clip-text text-transparent">
                Gestion Spiritualité Africaine
              </h1>
              <p className="text-gray-600">
                Backend NestJS - MongoDB
              </p>
            </div>
          </div>

          {/* Messages d'erreur */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-red-700">Erreur</h4>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages de succès */}
          <AnimatePresence>
            {seedingSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
              >
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-green-700">Succès !</h4>
                  <p className="text-sm text-green-600">Les 5 pratiques ont été initialisées</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
              <div className="text-2xl font-bold text-purple-700">
                {loading ? '-' : practices.length}
              </div>
              <div className="text-sm text-gray-600">Pratiques</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">
                {loading ? '-' : practices.filter(p => p.published).length}
              </div>
              <div className="text-sm text-gray-600">Publiées</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
              <div className="text-2xl font-bold text-green-700">
                {loading ? '-' : practices.reduce((acc, p) => acc + (p.practicalSteps?.length || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Étapes totales</div>
            </div>
          </div>
        </motion.div>

        {/* Bouton Seed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Initialisation</h2>
          <p className="text-gray-600 mb-4">
            Chargez les 5 pratiques spirituelles par défaut dans la base de données
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSeed}
            disabled={seeding || loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {seeding ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Initialisation en cours...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Initialiser les données
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Sélecteur de format */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Format d'export</h2>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => handleExportFormatChange('json')}
              disabled={exporting}
              className={`p-4 rounded-xl border-2 transition-all ${
                exportFormat === 'json'
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <FileJson className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">JSON</div>
              <div className="text-xs mt-1">API REST</div>
            </button>
            <button
              onClick={() => handleExportFormatChange('sql')}
              disabled={exporting}
              className={`p-4 rounded-xl border-2 transition-all ${
                exportFormat === 'sql'
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <FileCode className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">SQL</div>
              <div className="text-xs mt-1">PostgreSQL</div>
            </button>
            <button
              onClick={() => handleExportFormatChange('schema')}
              disabled={exporting}
              className={`p-4 rounded-xl border-2 transition-all ${
                exportFormat === 'schema'
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Database className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">SCHEMA</div>
              <div className="text-xs mt-1">Structure table</div>
            </button>
          </div>
        </motion.div>

        {/* Aperçu et actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {exporting ? 'Chargement...' : 'Aperçu de l\'export'}
            </h2>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCopy(exportData, exportFormat)}
                disabled={!exportData || exporting}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copied === exportFormat ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copié !
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copier
                  </>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDownload(exportData, getFilename())}
                disabled={!exportData || exporting}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                Télécharger
              </motion.button>
            </div>
          </div>

          {/* Code preview */}
          <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
            {exporting ? (
              <div className="flex items-center justify-center h-32 text-gray-400">
                <Loader className="w-6 h-6 animate-spin mr-2" />
                Chargement de l'export...
              </div>
            ) : exportData ? (
              <pre className="text-green-400 text-xs sm:text-sm font-mono">
                {exportData.slice(0, 2000)}
                {exportData.length > 2000 && '\n\n... (contenu tronqué pour l\'aperçu)'}
              </pre>
            ) : (
              <div className="flex items-center justify-center h-32 text-gray-400">
                Sélectionnez un format d'export
              </div>
            )}
          </div>
        </motion.div>

        {/* Liste des pratiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-600" />
              Pratiques spirituelles
            </h2>
            <motion.button
              whileHover={{ rotate: 180 }}
              onClick={fetchPractices}
              disabled={loading}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <Database className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <Loader className="w-6 h-6 animate-spin text-amber-600" />
              <span className="ml-2 text-gray-600">Chargement des pratiques...</span>
            </div>
          ) : practices.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Aucune pratique trouvée</p>
              <p className="text-sm mt-2">Cliquez sur "Initialiser les données" pour charger les 5 pratiques</p>
            </div>
          ) : (
            <div className="space-y-2">
              {practices.map((practice, index) => (
                <motion.div
                  key={practice._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{practice.title}</div>
                      <div className="text-xs text-gray-600">
                        {practice.keyElements?.length || 0} éléments • {practice.practicalSteps?.length || 0} étapes
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    practice.published
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}>
                    {practice.published ? 'Publié' : 'Brouillon'}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
