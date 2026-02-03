export default function ConsultationHeader({ title }: {
  title: string;
}) {
  return (
    <div className="bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-2xl p-6 shadow">
      <h2 className="text-2xl font-bold text-violet-700">{title}</h2>
    </div>
  );
}