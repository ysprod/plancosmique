/**
 * Composant d'administration pour gérer le contenu de la spiritualité
 * Permet d'exporter les données vers la base de données
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Database, Copy, Check, FileJson, FileCode } from 'lucide-react';
import { exportToJSON, generateSQLInsert, tableSchema, spiritualPracticesData } from '@/lib/utils/spiritualite-export';

export default function SpiritualiteAdmin() {
  const [copied, setCopied] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<'json' | 'sql' | 'schema'>('json');

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

  const getExportContent = () => {
    switch (exportFormat) {
      case 'json':
        return exportToJSON();
      case 'sql':
        return generateSQLInsert();
      case 'schema':
        return tableSchema;
      default:
        return '';
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
                Export Spiritualité Africaine
              </h1>
              <p className="text-gray-600">
                Exportez le contenu vers votre base de données
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
              <div className="text-2xl font-bold text-purple-700">
                {spiritualPracticesData.length}
              </div>
              <div className="text-sm text-gray-600">Pratiques</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">
                {spiritualPracticesData.filter(p => p.published).length}
              </div>
              <div className="text-sm text-gray-600">Publiées</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
              <div className="text-2xl font-bold text-green-700">
                {spiritualPracticesData.reduce((acc, p) => acc + p.practicalSteps.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Étapes totales</div>
            </div>
          </div>
        </motion.div>

        {/* Sélecteur de format */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Format d'export</h2>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setExportFormat('json')}
              className={`p-4 rounded-xl border-2 transition-all ${
                exportFormat === 'json'
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
              }`}
            >
              <FileJson className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">JSON</div>
              <div className="text-xs mt-1">Format universel</div>
            </button>
            <button
              onClick={() => setExportFormat('sql')}
              className={`p-4 rounded-xl border-2 transition-all ${
                exportFormat === 'sql'
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
              }`}
            >
              <FileCode className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">SQL INSERT</div>
              <div className="text-xs mt-1">PostgreSQL</div>
            </button>
            <button
              onClick={() => setExportFormat('schema')}
              className={`p-4 rounded-xl border-2 transition-all ${
                exportFormat === 'schema'
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
              }`}
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
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Aperçu</h2>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCopy(getExportContent(), exportFormat)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow"
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
                onClick={() => handleDownload(getExportContent(), getFilename())}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow"
              >
                <Download className="w-5 h-5" />
                Télécharger
              </motion.button>
            </div>
          </div>

          {/* Code preview */}
          <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
            <pre className="text-green-400 text-xs sm:text-sm font-mono">
              {getExportContent().slice(0, 2000)}
              {getExportContent().length > 2000 && '\n\n... (contenu tronqué pour l\'aperçu)'}
            </pre>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
            <h3 className="font-bold text-amber-900 mb-2">📋 Instructions d'utilisation</h3>
            <div className="text-sm text-amber-800 space-y-2">
              {exportFormat === 'json' && (
                <>
                  <p>1. Copiez ou téléchargez le fichier JSON</p>
                  <p>2. Utilisez votre endpoint API pour importer les données</p>
                  <p>3. Exemple: <code className="bg-white px-2 py-1 rounded">POST /api/spiritual-practices/import</code></p>
                </>
              )}
              {exportFormat === 'sql' && (
                <>
                  <p>1. Créez d'abord la table avec le schéma (onglet SCHEMA)</p>
                  <p>2. Copiez les instructions SQL INSERT</p>
                  <p>3. Exécutez-les dans votre base PostgreSQL</p>
                  <p>4. Commande: <code className="bg-white px-2 py-1 rounded">psql -d votre_db -f spiritualite-insert.sql</code></p>
                </>
              )}
              {exportFormat === 'schema' && (
                <>
                  <p>1. Copiez le schéma de la table</p>
                  <p>2. Exécutez-le dans votre base PostgreSQL AVANT d'insérer les données</p>
                  <p>3. Le schéma inclut les index pour optimiser les requêtes</p>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Liste des pratiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pratiques spirituelles</h2>
          <div className="space-y-2">
            {spiritualPracticesData.map((practice, index) => (
              <div
                key={practice.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-600 text-white rounded-lg flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{practice.title}</div>
                    <div className="text-xs text-gray-600">
                      {practice.keyElements.length} éléments • {practice.practicalSteps.length} étapes
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
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
