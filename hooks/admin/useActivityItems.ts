import { useMemo } from "react";
import { Users, FileText, DollarSign, Activity } from "lucide-react";
import type { ActivityItem } from "@/components/admin/dashboard/activity/ActivityCardItem";

export function useActivityItems(stats: any, derivedStats: any) {
  return useMemo<ActivityItem[]>(
    () => [
      {
        icon: Users,
        label: "Utilisateurs",
        value: stats.activity.todayUsers,
        percent: `+${((stats.activity.todayUsers / stats.users.total) * 100).toFixed(1)}%`,
      },
      {
        icon: FileText,
        label: "Consultations",
        value: stats.activity.todayConsultations,
        percent: `+${((stats.activity.todayConsultations / stats.consultations.total) * 100).toFixed(1)}%`,
      },
      {
        icon: DollarSign,
        label: "Revenu",
        value: `${stats.activity.todayRevenue.toLocaleString()} F`,
        percent: derivedStats?.averageRevenue ? `Moy: ${derivedStats.averageRevenue} F` : "",
      },
      {
        icon: Activity,
        label: "Croissance",
        value: `${Math.abs(stats.activity.growth)}%`,
        percent: stats.activity.growth >= 0 ? "Positive" : "Négative",
        trend: stats.activity.growth,
      },
    ],
    [stats, derivedStats]
  );
}
