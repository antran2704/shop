import { ICategoryBreadcrumb, ICategoryChild } from "../category";
import { ISearch } from "../paramater";

interface IOptionProduct {
   _id: string;
   code: string;
   name: string;
   values: string[];
}

interface ISpecificationAttributes {
   name: string;
   value: string;
}

interface ISpecificationsProduct {
   _id: string;
   name: string;
   attributes: ISpecificationAttributes[];
}

interface IProduct {
   _id: string;
   title: string;
   shortDescription: string;
   description: string;
   thumbnail: string | null;
   gallery: string[];
   category: ICategoryChild;
   categories: ICategoryChild[];
   barcode: string | null;
   sku: string | null;
   slug: string;
   hotProduct: boolean;
   sold: number;
   breadcrumbs: ICategoryBreadcrumb[];
   specifications: ISpecificationsProduct[];
   options: IOptionProduct[];
}

type IProductChild = Omit<IProduct, "description" | "shortDescription"> & {
   product_id: string;
   option1: string | null;
   option2: string | null;
   option3: string | null;
   options: string[];
};

interface IListProduct {
   _id: string;
   title: string;
   shortDescription: string;
   thumbnail: string;
   inventory: number;
   price: number;
   promotion_price: number;
   slug: string;
}

interface ISelectProductOption {
   [x: string]: string;
}

interface IProductStock {
   price: number;
   promotion_price: number;
   inventory: number;
}

interface IProductSearch extends ISearch {
   [x: string]: unknown;
   category?: string;
   minPrice?: number | null;
   maxPrice?: number | null;
}

export type {
   IProduct,
   IListProduct,
   IProductChild,
   IOptionProduct,
   ISpecificationsProduct,
   ISpecificationAttributes,
   IProductStock,
   IProductSearch,
   ISelectProductOption,
};
