"use client";
import OffrandesAddModal from '@/components/admin/offrandes/OffrandesAddModal';
import OffrandesList from '@/components/admin/offrandes/OffrandesList';
import OffrandesStats from '@/components/admin/offrandes/OffrandesStats';
import { useAdminOffrandes } from '@/hooks/useAdminOffrandes';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const CATEGORIES = [
    { value: 'animal', label: 'Animaux', emoji: '🐓', color: 'from-red-500 to-orange-500' },
    { value: 'vegetal', label: 'Végétaux', emoji: '🌾', color: 'from-green-500 to-emerald-500' },
    { value: 'beverage', label: 'Boissons', emoji: '🍷', color: 'from-purple-500 to-pink-500' },
];

export default function AdminOffrandes() {
    const {
        offerings,
        statsData,
        loading,
        saving,
        showAddModal,
        setShowAddModal,
        editingId,
        formData,
        setFormData,
        successMessage,
        errorMessage,
        setErrorMessage,
        fetchOfferings,
        handleAdd,
        handleEdit,
        handleConfirm,
        handleDelete,
        handleSaveAll,
    } = useAdminOffrandes();

    const [activeTab, setActiveTab] = useState<'gestion' | 'stats'>('gestion');

    return (
        <div className="dark:bg-gray-950 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                <nav className="flex justify-center items-center gap-1 mb-4 sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur rounded-xl shadow-sm p-1 border border-gray-100 dark:border-gray-800">
                    <button
                        className={`flex-1 flex items-center justify-center gap-2 px-2 py-2 sm:px-4 sm:py-2 rounded-lg font-bold text-xs sm:text-sm transition-all focus:outline-none whitespace-nowrap
                        ${activeTab === 'gestion' ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-md scale-105' : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        onClick={() => setActiveTab('gestion')}
                        aria-selected={activeTab === 'gestion'}
                        tabIndex={0}
                    >
                        <span className="text-lg sm:text-xl">🛍️</span>
                        <span>Gestion</span>
                    </button>
                    <button
                        className={`flex-1 flex items-center justify-center gap-2 px-2 py-2 sm:px-4 sm:py-2 rounded-lg font-bold text-xs sm:text-sm transition-all focus:outline-none whitespace-nowrap
                        ${activeTab === 'stats' ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-md scale-105' : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        onClick={() => setActiveTab('stats')}
                        aria-selected={activeTab === 'stats'}
                        tabIndex={0}
                    >
                        <span className="text-lg sm:text-xl">📊</span>
                        <span>Statistiques</span>
                    </button>
                </nav>

                {activeTab === 'gestion' && (<>
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {offerings.length} offrande{offerings.length > 1 ? 's' : ''} • Marché Spirituel
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={fetchOfferings}
                                    disabled={loading}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all font-semibold text-sm disabled:opacity-50"
                                >
                                    <span className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}>🔄</span>
                                    <span className="hidden sm:inline">Recharger</span>
                                </button>
                                <button
                                    onClick={handleAdd}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-bold text-sm shadow-lg transition-all active:scale-95"
                                >
                                    <span className="w-4 h-4">➕</span>
                                    <span className="hidden sm:inline">Ajouter</span>
                                </button>
                                <button
                                    onClick={handleSaveAll}
                                    disabled={saving || offerings.length === 0}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-black text-sm shadow-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving ? <span className="w-4 h-4 animate-spin">💾</span> : <span className="w-4 h-4">💾</span>}
                                    <span>Sauvegarder</span>
                                </button>
                            </div>
                        </div>
                        <AnimatePresence>
                            {successMessage && (
                                <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3">
                                    <span className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0">✅</span>
                                    <p className="text-sm font-semibold text-green-800 dark:text-green-300">{successMessage}</p>
                                </div>
                            )}
                            {errorMessage && (
                                <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center gap-3">
                                    <span className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0">❌</span>
                                    <p className="text-sm font-semibold text-red-800 dark:text-red-300">{errorMessage}</p>
                                    <button onClick={() => setErrorMessage(null)} className="ml-auto text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200">✖️</button>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {CATEGORIES.map(cat => {
                            const count = offerings.filter(o => o.category === cat.value).length;
                            return (
                                <div key={cat.value} className={`bg-gradient-to-br ${cat.color} rounded-2xl p-4 text-white`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-3xl">{cat.emoji}</span>
                                        <span className="text-2xl font-black">{count}</span>
                                    </div>
                                    <p className="text-sm font-bold opacity-90">{cat.label}</p>
                                </div>
                            );
                        })}
                    </div>

                    {loading ? (
                        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                            <span className="w-12 h-12 text-violet-500 mx-auto mb-4 animate-spin">⏳</span>
                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Chargement des offrandes...</p>
                        </div>
                    ) : offerings.length === 0 ? (
                        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
                            <span className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4">🛍️</span>
                            <p className="text-base font-bold text-gray-700 dark:text-gray-300 mb-2">Aucune offrande</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Commencez par ajouter votre première offrande</p>
                            <button onClick={handleAdd} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-bold">
                                <span className="w-4 h-4">➕</span>Ajouter une offrande
                            </button>
                        </div>
                    ) : (
                        <OffrandesList offerings={offerings} CATEGORIES={CATEGORIES} onEdit={handleEdit} onDelete={handleDelete} />
                    )}
                </>)}

                {activeTab === 'stats' && (<div className="mb-8">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="w-5 h-5 text-violet-500">🛍️</span> Statistiques des ventes d'offrandes
                    </h2>
                    {statsData && (
                        <OffrandesStats statsData={statsData} CATEGORIES={CATEGORIES} />
                    )}
                </div>)}

                <AnimatePresence>
                    {showAddModal && (
                        <OffrandesAddModal
                            show={showAddModal}
                            onClose={() => setShowAddModal(false)}
                            onConfirm={handleConfirm}
                            formData={formData}
                            setFormData={setFormData}
                            editingId={editingId}
                            CATEGORIES={CATEGORIES}
                            saving={saving}
                            errorMessage={errorMessage}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}