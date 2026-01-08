import React from "react";
import SettingsHeader from "./SettingsHeader";
import SettingsSaveButton from "./SettingsSaveButton";
import SettingsTabs from "@/components/admin/settings/SettingsTabs";

type Tab = { id: string; label: string; icon: React.ElementType };

interface SettingsLayoutProps {
    children: React.ReactNode;
    tabs: readonly Tab[] | Tab[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isSaving: boolean;
    saveSuccess: boolean;
    onSave: () => void;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({
    children, tabs, activeTab, setActiveTab, isSaving, saveSuccess, onSave
}) => (
    <div className="bg-gray-50">
        <SettingsHeader />
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex justify-end">
            <SettingsSaveButton isSaving={isSaving} saveSuccess={saveSuccess} onClick={onSave} />
        </div>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="lg:w-64 flex-shrink-0">
                    <SettingsTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    </div>
);

export default SettingsLayout;