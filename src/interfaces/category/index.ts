interface IOption {
  title: string;
}

interface IBreadcrumbCategory {
  label: string;
  url_path: string;
}

interface IParentCategory {
  _id: string | null;
  title: string;
}

interface IDataCategory {
  _id: string;
  parent_id: IParentCategory | string | null;
  childrens?: string[];
  title: string;
  description: string;
  slug?: string | null;
  meta_title?: string;
  meta_description?: string;
  public: boolean;
  thumbnail: string | null;
  breadcrumbs?: IBreadcrumbCategory[];
  createdAt?: string;
}

export type {
  IOption,
  IDataCategory,
  IParentCategory,
  IBreadcrumbCategory,
};
