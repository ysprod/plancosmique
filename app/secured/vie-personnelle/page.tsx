'use client';
import { HeaderSection } from '@/components/vie-personnelle/HeaderSection';
import { ConsultationSection } from '@/components/vie-personnelle/ConsultationSection';

const ViePersonnellePage = () => {
  return (
    <div className=" text-center bg-gradient-to-br from-slate-50 via-purple-50 to-fuchsia-50">
      <HeaderSection />
      <ConsultationSection rubriqueId="694cde9bde3392d3751a0fe9" typeconsultation="VIE_PERSONNELLE" />
    </div>
  );
};

export default ViePersonnellePage;