import { useAstrologiePage } from "@/components/astrologie/useAstrologiePage";

export function useAstrologiePageSections() {
  const { astrologySections } = useAstrologiePage();
  return { astrologySections };
}
