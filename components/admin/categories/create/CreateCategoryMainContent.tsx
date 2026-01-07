import React from "react";
import InvalidRubriquesAlert from "@/components/admin/categories/create/InvalidRubriquesAlert";
import Banner from "@/components/admin/categories/create/Banner";
import CreateCategoryViewSwitcher from "@/components/admin/categories/create/CreateCategoryViewSwitcher";

interface CreateCategoryMainContentProps {
  invalidRubriquesCount: number;
  banner: any;
  view: string;
  formProps: any;
  previewProps: any;
  successProps: any;
}

const CreateCategoryMainContent: React.FC<CreateCategoryMainContentProps> = ({
  invalidRubriquesCount,
  banner,
  view,
  formProps,
  previewProps,
  successProps,
}) => (
  <>
    {invalidRubriquesCount > 0 && <InvalidRubriquesAlert count={invalidRubriquesCount} />}
    <Banner banner={banner} />
    <CreateCategoryViewSwitcher
      view={view}
      formProps={formProps}
      previewProps={previewProps}
      successProps={successProps}
    />
  </>
);

export default CreateCategoryMainContent;
