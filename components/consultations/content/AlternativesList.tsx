export default function AlternativesList({ alternatives }: { alternatives: any[] }) {
  if (!alternatives || alternatives.length === 0) return null;
  return (
    <div>
      <h3 className="text-lg font-bold text-violet-700 mb-2">Offrandes suggérées</h3>
      <ul className="grid md:grid-cols-3 gap-4">
        {alternatives.map((offr) => (
          <li key={offr.offeringId} className="bg-white rounded-xl p-4 shadow flex flex-col items-center">
            <span className="text-3xl">{offr.icon}</span>
            <span className="font-bold">{offr.name}</span>
            <span className="text-xs text-slate-500">{offr.category}</span>
            <span className="text-fuchsia-700 font-semibold">{offr.price} FCFA</span>
            <span className="text-xs text-slate-400">{offr.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
