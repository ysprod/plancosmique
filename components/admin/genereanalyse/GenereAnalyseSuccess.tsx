import React from 'react'; 
import { AnalyseData } from '@/lib/interfaces';
import SubjectCard from '@/components/admin/genereanalyse/SubjectCard';
import SkyChartSection from '@/components/admin/genereanalyse/SkyChartSection';
import MissionSection from '@/components/admin/genereanalyse/MissionSection';

interface GenereAnalyseSuccessProps {
  analyseData: AnalyseData;
}

export const GenereAnalyseSuccess: React.FC<GenereAnalyseSuccessProps> = ({ analyseData }) => (
  <div className="space-y-4 pb-8">
    <SubjectCard sujet={analyseData.carteDuCiel.sujet} />
    <SkyChartSection carteDuCiel={analyseData.carteDuCiel} />
    <MissionSection missionDeVie={analyseData.missionDeVie} />
  </div>
);
