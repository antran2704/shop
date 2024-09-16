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
