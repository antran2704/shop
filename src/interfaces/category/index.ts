interface IOption {
   title: string;
}

interface IBreadcrumb {
   label: string;
   url_path: string;
}

interface IParentCategory {
   _id: string;
   title: string;
}

interface IDataCategory {
   _id: string;
   parent_id: IParentCategory | string | null;
   children: Partial<IDataCategory>[];
   title: string;
   description: string;
   slug: string | null;
   meta_title?: string;
   meta_description?: string;
   public: boolean;
   thumbnail: string | null;
   breadcrumbs?: IBreadcrumb[];
   createdAt?: string;
}

interface ICategoryBreadcrumb {
   _id: string;
   title: string;
   slug: string;
}

interface ICategoryChild {
   _id: string;
   title: string;
   slug: string;
}

interface ICategory {
   _id: string;
   title: string;
   slug: string;
   thumbnail: string;
   breadcrumbs: ICategoryBreadcrumb[];
   children: ICategoryChild[];
   description: string;
   public: boolean;
}

interface ICategoryList {
   _id: string;
   title: string;
   slug: string;
}

// export type { IOption, IDataCategory, IParentCategory, IBreadcrumb, ICategory };
export type { ICategoryList, ICategory, ICategoryBreadcrumb, ICategoryChild };
