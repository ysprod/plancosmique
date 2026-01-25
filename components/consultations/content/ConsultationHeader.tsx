import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function ConsultationHeader({ titre, title }: {
  titre?: string;
  title?: string; 
}) {
  return (
    <div className="bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-2xl p-6 shadow">
      <h2 className="text-2xl font-bold text-violet-700">{titre || title}</h2>        
    </div>
  );
}