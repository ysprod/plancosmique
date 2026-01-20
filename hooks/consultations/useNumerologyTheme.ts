import { useMemo } from "react";

export function useNumerologyTheme(themeDeNaissance: any) {
  return useMemo(() => {
    if (!themeDeNaissance) return null;
    return {
      cheminDeVie: themeDeNaissance.cheminDeVie,
      nombreExpression: themeDeNaissance.nombreExpression,
      nombreAme: themeDeNaissance.nombreAme,
      nombrePersonnalite: themeDeNaissance.nombrePersonnalite,
      description: themeDeNaissance.description,
    };
  }, [themeDeNaissance]);
}
