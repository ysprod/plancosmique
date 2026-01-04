// Utilitaires pour les catégories admin
export function rubriqueLabel(r: any): string {
  // robust pour ton code: parfois titre, parfois nom
  return (r?.titre ?? r?.nom ?? "").toString();
}
