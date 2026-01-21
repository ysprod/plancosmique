"use client";
import { motion } from "framer-motion";
import { AdminSidebarHeader } from "./AdminSidebarHeader";
import { AdminSidebarNav } from "./AdminSidebarNav";
import { AdminLogoutButton } from "./AdminLogoutButton";
import React from "react";
import { User } from "@/lib/interfaces";

interface AdminShellDesktopSidebarProps {
  user: User | null;
  pathname: string;
  handleLogout: () => void;
  isLoggingOut: boolean;
}

export function AdminShellDesktopSidebar({
  user,
  pathname,
  handleLogout,
  isLoggingOut,
}: AdminShellDesktopSidebarProps) {
  return (
    <motion.nav
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-16 lg:w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 hidden lg:flex flex-col shadow-sm transition-all duration-300"
    >
      <div className="p-2 lg:p-5 border-b border-gray-200 dark:border-slate-800 flex flex-col items-center lg:items-start">
        <AdminSidebarHeader user={user} />
      </div>
      <div className="flex-1 p-1 lg:p-3 overflow-y-auto">
        <AdminSidebarNav pathname={pathname} />
      </div>
      <div className="p-2 lg:p-3 border-t border-gray-200 dark:border-slate-800">
        <AdminLogoutButton onLogout={handleLogout} isLoggingOut={isLoggingOut} />
      </div>
    </motion.nav>
  );
}