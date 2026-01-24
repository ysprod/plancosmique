export default function ConsultationUserInfo({ formData }: { formData: any }) {
  if (!formData) return null;
  return (
    <div className="mt-6 text-xs text-slate-500">
      <span>Consultation générée pour : {formData.firstName} {formData.lastName} ({formData.email})</span>
    </div>
  );
}
