import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import SettingsGeneralTab from "@/components/admin/settings/SettingsGeneralTab";
import SettingsNotificationsTab from "@/components/admin/settings/SettingsNotificationsTab";
import SettingsSecurityTab from "@/components/admin/settings/SettingsSecurityTab";
import SettingsPaymentTab from "@/components/admin/settings/SettingsPaymentTab";
import SettingsSystemTab from "@/components/admin/settings/SettingsSystemTab";

interface SettingsTabContentProps {
    activeTab: string;
    tabProps: Record<string, any>;
}

const SettingsTabContent: React.FC<SettingsTabContentProps> = ({ activeTab, tabProps }) => (
    <AnimatePresence mode="wait">
        <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6"
        >
            {activeTab === 'general' && <SettingsGeneralTab {...tabProps.general} />}
            {activeTab === 'notifications' && <SettingsNotificationsTab {...tabProps.notifications} />}
            {activeTab === 'security' && <SettingsSecurityTab {...tabProps.security} />}
            {activeTab === 'payment' && <SettingsPaymentTab {...tabProps.payment} />}
            {activeTab === 'system' && <SettingsSystemTab {...tabProps.system} />}
        </motion.div>
    </AnimatePresence>
);

export default SettingsTabContent;