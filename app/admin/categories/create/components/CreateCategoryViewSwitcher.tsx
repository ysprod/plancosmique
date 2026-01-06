import React from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import PreviewCard from "./PreviewCard";
import SuccessCard from "./SuccessCard";
import CreateCategoryForm from "./CreateCategoryForm";

const viewVariants = {
    initial: { opacity: 0, y: 10, filter: "blur(2px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.22 } },
    exit: { opacity: 0, y: -8, filter: "blur(2px)", transition: { duration: 0.16 } },
};

interface CreateCategoryViewSwitcherProps {
    view: string;
    formProps: any;
    previewProps: any;
    successProps: any;
}

const CreateCategoryViewSwitcher: React.FC<CreateCategoryViewSwitcherProps> = ({
    view, formProps, previewProps, successProps
}) => (
    <AnimatePresence mode="wait" initial={false}>
        {view === "create" && (
            <motion.div key="create" variants={viewVariants} initial="initial" animate="animate" exit="exit">
                <CreateCategoryForm {...formProps} />
            </motion.div>
        )}
        {view === "preview" && (
            <motion.div key="preview" variants={viewVariants} initial="initial" animate="animate" exit="exit">
                <PreviewCard {...previewProps} />
            </motion.div>
        )}
        {view === "success" && (
            <motion.div key="success" variants={viewVariants} initial="initial" animate="animate" exit="exit">
                <SuccessCard {...successProps} />
            </motion.div>
        )}
    </AnimatePresence>
);

export default CreateCategoryViewSwitcher;