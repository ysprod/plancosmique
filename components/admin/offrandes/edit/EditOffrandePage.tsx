"use client";
import EditOffrandeError from "@/components/admin/offrandes/edit/EditOffrandeError";
import EditOffrandeForm from "@/components/admin/offrandes/edit/EditOffrandeForm";
import EditOffrandeLoading from "@/components/admin/offrandes/edit/EditOffrandeLoading";
import { useEditOffrande } from "@/hooks/admin/useEditOffrande";

export default function EditOffrandePage() {
    const {
        formData, loading, saving, error, router, priceUSD,
        handleChange, handleCategoryChange, handleSubmit, fetchData,
    } = useEditOffrande();

    if (loading) return <EditOffrandeLoading />;
    if (error) return <EditOffrandeError error={error} onRetry={fetchData} />;
    if (!formData) return null;

    return (
        <EditOffrandeForm
            formData={formData}
            priceUSD={priceUSD}
            saving={saving}
            error={error}
            onChange={handleChange}
            onCategory={handleCategoryChange}
            onSubmit={handleSubmit}
            onCancel={() => router.push("/admin/offrandes")}
        />
    );
}
