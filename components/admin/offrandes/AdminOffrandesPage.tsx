"use client";
import OffrandesGestionPanel from '@/components/admin/offrandes/OffrandesGestionPanel';
import OffrandesStats from '@/components/admin/offrandes/OffrandesStats';
import OffrandesTabs from '@/components/admin/offrandes/OffrandesTabs';
import { useAdminOffrandes } from '@/hooks/admin/useAdminOffrandes';
import useAdminOffrandesTabs from '@/hooks/admin/useAdminOffrandesTabs';

export default function AdminOffrandesPage() {
    const {
        offerings, statsData, loading, successMessage, errorMessage,
        setErrorMessage, fetchOfferings, handleDelete, handleEdit, handleAdd
    } = useAdminOffrandes();

    const { activeTab, setActiveTab } = useAdminOffrandesTabs();

    return (
        <div className="w-full mx-auto dark:bg-gray-950 p-4 sm:p-6">
            <h1 className="text-2xl font-bold mb-6 text-center text-cosmic-900 dark:text-cosmic-100">Gestion et Statistiques des Offrandes</h1>
            <OffrandesTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === 'gestion' && (
                <OffrandesGestionPanel
                    offerings={offerings}
                    loading={loading}
                    successMessage={successMessage}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    fetchOfferings={fetchOfferings}
                    handleAdd={handleAdd}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            )}

            {activeTab === 'stats' && (
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="w-5 h-5 text-violet-500">🛍️</span> Statistiques des ventes d'offrandes
                    </h2>

                    {statsData && (<OffrandesStats statsData={statsData} />)}
                </div>
            )}
        </div>
    );
}