import type { CategorieAdmin, RubriqueOrNone } from "@/lib/interfaces";

interface Props {
  rubriqueCourante: RubriqueOrNone;
  category: CategorieAdmin;
}

export function CategoryClientViewContentChoix({ rubriqueCourante, category }: Props) {
  if (rubriqueCourante) {
    return (
      <div className="w-full flex flex-col items-center justify-center animate-fade-in">
        {/* <RubriqueViewMultiPage rubrique={rubriqueCourante} categoryId={category._id} /> */}
      </div>
    );
  }
  return null;
}
