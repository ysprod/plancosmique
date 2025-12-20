"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Save,
    Trash2,
    Edit2,
    X,
    AlertCircle,
    CheckCircle2,
    Loader2,
    Package,
    DollarSign,
    Tag,
    FileText,
    RefreshCw
} from 'lucide-react';
import { api } from '@/lib/api/client';

interface Offering {
    _id?: string;
    id: string;
    name: string;
    price: number;
    priceUSD: number;
    category: 'animal' | 'vegetal' | 'beverage';
    icon: string;
    description: string;
}

const CATEGORIES = [
    { value: 'animal', label: 'Animaux', emoji: '🐓', color: 'from-red-500 to-orange-500' },
    { value: 'vegetal', label: 'Végétaux', emoji: '🌾', color: 'from-green-500 to-emerald-500' },
    { value: 'beverage', label: 'Boissons', emoji: '🍷', color: 'from-purple-500 to-pink-500' }
];

export default function AdminOffrandes() {
    const [offerings, setOfferings] = useState<Offering[]>([]);
    const [stats, setStats] = useState<any[]>([]);
    const [statsLoading, setStatsLoading] = useState(true);
    const [statsError, setStatsError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [formData, setFormData] = useState<Offering>({
        id: '',
        name: '',
        price: 200,
        priceUSD: 0,
        category: 'animal',
        icon: '🐓',
        description: ''
    });


    // Charger les offrandes et stats depuis le backend
    useEffect(() => {
        fetchOfferings();
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setStatsLoading(true);
        setStatsError(null);
        try {
            const response = await api.get('/admin/offerings/stats');
            if (response.status === 200 && response.data?.stats) {
                setStats(response.data.stats);
            } else {
                setStatsError('Erreur lors du chargement des statistiques');
            }
        } catch (err: any) {
            setStatsError('Erreur lors du chargement des statistiques');
        } finally {
            setStatsLoading(false);
        }
    };

    const fetchOfferings = async () => {
        setLoading(true);
        try {
            const response = await api.get('/offerings');
            if (response.status === 200 && response.data?.offerings) {
                setOfferings(response.data.offerings);
            }
        } catch (err: any) {
            console.error('[Admin] ❌ Erreur chargement:', err);
            setErrorMessage('Impossible de charger les offrandes');
        } finally {
            setLoading(false);
        }
    };

    // Sauvegarder toutes les offrandes
    const handleSaveAll = async () => {
        setSaving(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const response = await api.post('/offerings/bulk-update', {
                offerings: offerings.map(({ _id, ...rest }) => rest)
            });

            if (response.status === 200 || response.status === 201) {
                setSuccessMessage(`✅ ${offerings.length} offrandes sauvegardées avec succès !`);
                await fetchOfferings();

                setTimeout(() => setSuccessMessage(null), 5000);
            }
        } catch (err: any) {
            console.error('[Admin] ❌ Erreur sauvegarde:', err);
            setErrorMessage(err.response?.data?.message || 'Erreur lors de la sauvegarde');
        } finally {
            setSaving(false);
        }
    };

    // Ajouter une nouvelle offrande
    const handleAdd = () => {
        setFormData({
            id: '',
            name: '',
            price: 200,
            priceUSD: 0,
            category: 'animal',
            icon: '🐓',
            description: ''
        });
        setEditingId(null);
        setShowAddModal(true);
    };

    // Éditer une offrande existante
    const handleEdit = (offering: Offering) => {
        setFormData(offering);
        setEditingId(offering.id);
        setShowAddModal(true);
    };

    // Confirmer l'ajout/modification
    const handleConfirm = () => {
        if (!formData.id || !formData.name) {
            setErrorMessage('ID et Nom sont requis');
            return;
        }

        if (editingId) {
            // Modification
            setOfferings(offerings.map(o => o.id === editingId ? formData : o));
        } else {
            // Ajout
            if (offerings.find(o => o.id === formData.id)) {
                setErrorMessage('Cet ID existe déjà');
                return;
            }
            setOfferings([...offerings, formData]);
        }

        setShowAddModal(false);
        setEditingId(null);
    };

    // Supprimer une offrande
    const handleDelete = (id: string) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette offrande ?')) {
            setOfferings(offerings.filter(o => o.id !== id));
        }
    };

    // Calculer automatiquement le prix USD
    useEffect(() => {
        if (formData.price > 0) {
            setFormData(prev => ({ ...prev, priceUSD: Math.round(prev.price / 563.5 * 100) / 100 }));
        }
    }, [formData.price]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Statistiques Offrandes */}
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <Package className="w-5 h-5 text-violet-500" /> Statistiques des ventes d'offrandes
                    </h2>
                    {statsLoading ? (
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Chargement...</div>
                    ) : statsError ? (
                        <div className="text-sm text-red-600 dark:text-red-400">{statsError}</div>
                    ) : stats.length === 0 ? (
                        <div className="text-sm text-gray-500 dark:text-gray-400">Aucune donnée de vente.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-[400px] w-full text-sm border rounded-xl overflow-hidden">
                                <thead className="bg-gray-100 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-bold">Offrande</th>
                                        <th className="px-3 py-2 text-left font-bold">Quantité vendue</th>
                                        <th className="px-3 py-2 text-left font-bold">Chiffre d'affaires (F)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.map((s) => (
                                        <tr key={s.offeringId} className="border-b last:border-b-0">
                                            <td className="px-3 py-2 font-mono">{s.name}</td>
                                            <td className="px-3 py-2">{s.totalSold}</td>
                                            <td className="px-3 py-2">{s.totalRevenue.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                                <Package className="w-8 h-8 text-violet-600 dark:text-violet-500" />
                                Gestion des Offrandes
                            </h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {offerings.length} offrande{offerings.length > 1 ? 's' : ''} • Marché Spirituel
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={fetchOfferings}
                                disabled={loading}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                         bg-gray-100 dark:bg-gray-800 
                         text-gray-700 dark:text-gray-300
                         hover:bg-gray-200 dark:hover:bg-gray-700
                         transition-all font-semibold text-sm
                         disabled:opacity-50"
                            >
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                <span className="hidden sm:inline">Recharger</span>
                            </button>

                            <button
                                onClick={handleAdd}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                         bg-gradient-to-r from-violet-500 to-purple-500
                         hover:from-violet-600 hover:to-purple-600
                         text-white font-bold text-sm shadow-lg
                         transition-all active:scale-95"
                            >
                                <Plus className="w-4 h-4" />
                                <span className="hidden sm:inline">Ajouter</span>
                            </button>

                            <button
                                onClick={handleSaveAll}
                                disabled={saving || offerings.length === 0}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                         bg-gradient-to-r from-green-500 to-emerald-500
                         hover:from-green-600 hover:to-emerald-600
                         text-white font-black text-sm shadow-xl
                         transition-all active:scale-95
                         disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Sauvegarde...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        <span>Sauvegarder</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <AnimatePresence>
                        {successMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800
                         rounded-xl p-4 flex items-center gap-3"
                            >
                                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                                <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                                    {successMessage}
                                </p>
                            </motion.div>
                        )}

                        {errorMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800
                         rounded-xl p-4 flex items-center gap-3"
                            >
                                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                                <p className="text-sm font-semibold text-red-800 dark:text-red-300">
                                    {errorMessage}
                                </p>
                                <button
                                    onClick={() => setErrorMessage(null)}
                                    className="ml-auto text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Filtres par catégorie */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    {CATEGORIES.map(cat => {
                        const count = offerings.filter(o => o.category === cat.value).length;
                        return (
                            <div
                                key={cat.value}
                                className={`bg-gradient-to-br ${cat.color} rounded-2xl p-4 text-white`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-3xl">{cat.emoji}</span>
                                    <span className="text-2xl font-black">{count}</span>
                                </div>
                                <p className="text-sm font-bold opacity-90">{cat.label}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Liste des offrandes */}
                {loading ? (
                    <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                        <Loader2 className="w-12 h-12 text-violet-500 mx-auto mb-4 animate-spin" />
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                            Chargement des offrandes...
                        </p>
                    </div>
                ) : offerings.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
                        <Package className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                        <p className="text-base font-bold text-gray-700 dark:text-gray-300 mb-2">
                            Aucune offrande
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Commencez par ajouter votre première offrande
                        </p>
                        <button
                            onClick={handleAdd}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                       bg-violet-500 hover:bg-violet-600 text-white font-bold"
                        >
                            <Plus className="w-4 h-4" />
                            Ajouter une offrande
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {offerings.map((offering, index) => {
                            const category = CATEGORIES.find(c => c.value === offering.category);
                            return (
                                <motion.div
                                    key={offering.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800
                           hover:border-violet-300 dark:hover:border-violet-700
                           hover:shadow-xl transition-all p-4"
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-12 h-12 bg-gradient-to-br ${category?.color} rounded-xl
                                    flex items-center justify-center text-2xl shadow-lg`}>
                                                {offering.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-black text-gray-900 dark:text-white text-sm truncate">
                                                    {offering.name}
                                                </h3>
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold
                                       ${category?.value === 'animal' ? 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400' :
                                                        category?.value === 'vegetal' ? 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400' :
                                                            'bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400'}`}>
                                                    {category?.emoji} {category?.label}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => handleEdit(offering)}
                                                className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/30
                                 hover:bg-blue-100 dark:hover:bg-blue-900/50
                                 text-blue-600 dark:text-blue-400
                                 flex items-center justify-center transition-colors"
                                            >
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(offering.id)}
                                                className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/30
                                 hover:bg-red-100 dark:hover:bg-red-900/50
                                 text-red-600 dark:text-red-400
                                 flex items-center justify-center transition-colors"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                        {offering.description}
                                    </p>

                                    {/* Prix */}
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Prix</p>
                                            <p className="text-lg font-black text-gray-900 dark:text-white">
                                                {offering.price.toLocaleString()} F
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">USD</p>
                                            <p className="text-lg font-black text-violet-600 dark:text-violet-500">
                                                ${offering.priceUSD}
                                            </p>
                                        </div>
                                    </div>

                                    {/* ID */}
                                    <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                                        <p className="text-[10px] font-mono text-gray-400 dark:text-gray-600 truncate">
                                            ID: {offering.id}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Modal Ajout/Édition */}
            <AnimatePresence>
                {showAddModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
                            onClick={() => setShowAddModal(false)}
                        />

                        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl
                         shadow-2xl border-2 border-violet-200 dark:border-violet-800
                         max-h-[90vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header */}
                                <div className="bg-gradient-to-r from-violet-500 to-purple-500 px-6 py-5
                              flex items-center justify-between sticky top-0 z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl
                                  flex items-center justify-center">
                                            {editingId ? <Edit2 className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-white" />}
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-black text-white">
                                                {editingId ? 'Modifier l\'offrande' : 'Nouvelle offrande'}
                                            </h2>
                                            <p className="text-xs text-violet-100">
                                                {editingId ? 'Mettez à jour les informations' : 'Ajoutez une offrande au catalogue'}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setShowAddModal(false)}
                                        className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20
                             flex items-center justify-center transition-colors"
                                    >
                                        <X className="w-5 h-5 text-white" />
                                    </button>
                                </div>

                                {/* Formulaire */}
                                <div className="p-6 space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* ID */}
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                <Tag className="w-4 h-4 inline mr-1" />
                                                ID unique *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.id}
                                                onChange={(e) => setFormData({ ...formData, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                                placeholder="ex: poulet-blanc"
                                                disabled={!!editingId}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                 focus:border-violet-500 dark:focus:border-violet-500
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 transition-colors font-mono text-sm"
                                            />
                                        </div>

                                        {/* Nom */}
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                <FileText className="w-4 h-4 inline mr-1" />
                                                Nom *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="ex: Poulet blanc"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                 focus:border-violet-500 dark:focus:border-violet-500
                                 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Catégorie */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                            Catégorie *
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {CATEGORIES.map(cat => (
                                                <button
                                                    key={cat.value}
                                                    onClick={() => setFormData({ ...formData, category: cat.value as any })}
                                                    className={`py-3 px-4 rounded-xl font-bold text-sm transition-all
                                   ${formData.category === cat.value
                                                            ? `bg-gradient-to-br ${cat.color} text-white shadow-lg scale-105`
                                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                                        }`}
                                                >
                                                    <span className="text-xl block mb-1">{cat.emoji}</span>
                                                    {cat.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Prix XOF */}
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                <DollarSign className="w-4 h-4 inline mr-1" />
                                                Prix (XOF) *
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                                min="0"
                                                step="100"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                 focus:border-violet-500 dark:focus:border-violet-500
                                 transition-colors"
                                            />
                                        </div>

                                        {/* Prix USD (auto-calculé) */}
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                Prix (USD)
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.priceUSD}
                                                disabled
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                                 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400
                                 cursor-not-allowed"
                                            />
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                Calculé automatiquement (1 USD = 563.5 XOF)
                                            </p>
                                        </div>
                                    </div>

                                    {/* Icône */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                            Icône (emoji) *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.icon}
                                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                            placeholder="🐓"
                                            maxLength={2}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                               bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-2xl text-center
                               focus:border-violet-500 dark:focus:border-violet-500
                               transition-colors"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                            Description *
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Symbole de pureté et d'harmonie"
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                               bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                               focus:border-violet-500 dark:focus:border-violet-500
                               transition-colors resize-none"
                                        />
                                    </div>

                                    {/* Boutons */}
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            onClick={() => setShowAddModal(false)}
                                            className="flex-1 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-700
                               text-gray-700 dark:text-gray-300 font-bold
                               hover:bg-gray-100 dark:hover:bg-gray-800
                               transition-all"
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            onClick={handleConfirm}
                                            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500
                               hover:from-violet-600 hover:to-purple-600
                               text-white font-black shadow-xl
                               transition-all active:scale-95"
                                        >
                                            {editingId ? 'Modifier' : 'Ajouter'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
