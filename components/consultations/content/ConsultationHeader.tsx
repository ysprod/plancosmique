import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function ConsultationHeader({ titre, title, dateNaissance }: {
  titre?: string;
  title?: string;
  dateNaissance: string;
}) {
  return (
    <div className="bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-2xl p-6 shadow">
      <h2 className="text-2xl font-bold text-violet-700">{titre || title}</h2>       
      <p className="text-slate-700">
        <span className="font-semibold">Date de naissance :</span>{' '}
        {(() => {
          const d = new Date(dateNaissance);
          if (!dateNaissance || isNaN(d.getTime())) return "-";
          try {
            return format(d, "dd MMMM yyyy", { locale: fr });
          } catch {
            return "-";
          }
        })()}
      </p>
    </div>
  );
}