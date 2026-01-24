export default function ConsultationDescription({ description }: { description?: string }) {
  if (!description) return null;
  return (
    <div className="bg-fuchsia-50 rounded-xl p-4">
      <h4 className="font-semibold text-fuchsia-700 mb-1">À propos de cette consultation</h4>
      <p>{description}</p>
    </div>
  );
}
