'use client';
import React from "react";
import Banner from "@/components/admin/categories/edit/Banner";
import CategoryViewSwitcher from "@/components/admin/categories/edit/CategoryViewSwitcher";

interface EditCategoryMainContentProps {
  banner: any;
  view: string;
  pageLoading: boolean;
  formProps: any;
  previewProps: any;
  successProps: any;
}

const EditCategoryMainContent: React.FC<EditCategoryMainContentProps> = ({
  banner,
  view,
  pageLoading,
  formProps,
  previewProps,
  successProps,
}) => (
  <>
    <Banner banner={banner} />
    <CategoryViewSwitcher
      view={view}
      pageLoading={pageLoading}
      formProps={formProps}
      previewProps={previewProps}
      successProps={successProps}
    />
  </>
);

export default EditCategoryMainContent;