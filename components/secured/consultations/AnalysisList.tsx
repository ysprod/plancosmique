"use client";
import type { Analysis } from "@/lib/interfaces";
import AnalysisPager from "./AnalysisPager";

interface AnalysisListProps {
  analyses: Analysis[];
  total: number;
}

export function AnalysisList({ analyses, total }: AnalysisListProps) {
  return <AnalysisPager analyses={analyses} total={total} initialIndex={0} />;
}
