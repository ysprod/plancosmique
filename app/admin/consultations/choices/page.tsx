import ConsultationChoicesList from '@/components/admin/consultations/ConsultationChoicesList';

export const dynamic = 'force-dynamic';

export default function ConsultationChoicesPage() {
  return (
    <div className="p-6">
      <ConsultationChoicesList />
    </div>
  );
}
