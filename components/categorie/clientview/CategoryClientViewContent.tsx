import type { CategorieAdmin } from "@/lib/interfaces";
import { memo } from "react";
import CategoryEmptyState from "../CategoryEmptyState";
import CategoryRubriquesList from "../CategoryRubriquesList";

interface Props {
    category: CategorieAdmin;
    ui: any;
    handleOpenRubriqueById: (id: string, consultationId: string) => void;
}

export const CategoryClientViewContent = memo(function CategoryClientViewContent({ category, ui, handleOpenRubriqueById }: Props) {
    return (
        <div className="w-full flex flex-col items-center justify-center animate-fade-in">
            <CategoryRubriquesList category={category} onOpen={handleOpenRubriqueById} />
        </div>
    );
});