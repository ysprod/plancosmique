import { useCategoryHeader } from "@/hooks/commons/useCategoryHeader";
import type { CategorieAdmin } from "@/lib/interfaces";
import { AnimatePresence, motion } from "framer-motion";
import CategoryDescription from "../CategoryDescription";
import CategoryTitle from "../CategoryTitle";

interface Props {
    category: CategorieAdmin;
}

export function CategoryClientViewHeader({ category }: Props) {
    return (
        <motion.header
            className="relative isolate py-4 sm:py-6 px-2 flex flex-col items-center justify-center text-center overflow-visible w-full"
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0, scale: 0.98 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } } }}
        >
            <CategoryTitle title={category.nom?.trim() || "Catégorie"} />
            <CategoryDescription description={category.description?.trim() || ""} />
        </motion.header>
    );
}