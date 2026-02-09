// helpers.ts
// Fonctions utilitaires pour DisplayConsultationCard

export function getConsultationId(c: any) {
  return String(c?._id ?? c?.id ?? c?.consultationId ?? "");
}

export function extractMarkdown(c: any): string | null {
  const v =
    c?.analyse?.analyse?.texte ??
    c?.analyse?.analyse ??
    null;

  const s = typeof v === "string" ? v.trim() : "";
  return s ? s : null;
}

export function formatDateFR(v: any) {
  if (!v) return "";
  try {
    return new Date(v).toLocaleString("fr-FR");
  } catch {
    return "";
  }
}
