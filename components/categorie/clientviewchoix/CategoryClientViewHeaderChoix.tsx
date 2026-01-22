import type { CategorieAdmin, RubriqueOrNone } from "@/lib/interfaces";
import CategoryHeader from "../CategoryHeader";

interface Props {
  category: CategorieAdmin;
  rubriqueCourante: RubriqueOrNone;
  closeRubrique: () => void;
}

export function CategoryClientViewHeaderChoix({ category, rubriqueCourante, closeRubrique }: Props) {
  return (
    <CategoryHeader
      category={category}
      rubriqueCourante={rubriqueCourante}
      closeRubrique={closeRubrique}
    />
  );
}
