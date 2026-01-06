
import { useAstrologieAfricainePage } from "./useAstrologieAfricainePage";

export function useAstrologiePageSections() {
  // Utilise les tabs du hook africain comme sections de démonstration
  const { tabs } = useAstrologieAfricainePage();
  // Renomme pour compatibilité avec l'appelant
  return { astrologySections: tabs };
}
