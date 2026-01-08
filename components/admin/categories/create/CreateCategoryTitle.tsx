import { Tags } from "lucide-react";
import React from "react";

const CreateCategoryTitle: React.FC = () => (
  <div className="mb-4 flex items-center gap-2">
    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-sm">
      <Tags className="h-6 w-6" />
    </div>
    <div className="min-w-0">
      <h1 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
        Nouvelle catégorie
      </h1>
    </div>
  </div>
);

export default CreateCategoryTitle;