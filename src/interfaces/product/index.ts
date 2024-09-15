import { ICategoryBreadcrumb, ICategoryChild } from "../category";
import { ISearch } from "../paramater";

interface IValueOption {
   label: string;
   _id: string;
}

interface IOptionProduct {
   _id: string;
   code: string;
   name: string;
   // values: IValueOption[];
   values: string[];
}

interface ISpecificationAttributes {
   _id: string;
   name: string;
   value: string;
}

interface ISpecificationsProduct {
   _id: string;
   name: string;
   attributes: ISpecificationAttributes[];
}

interface IProduct {
   _id: string | null;
   title: string;
   meta_title?: string;
   meta_description?: string;
   thumbnail: string | null;
   barcode: string | null;
   sku: string | null;
   slug: string;
   public: boolean;
   price: number;
   promotion_price: number;
   inventory: number;
   sold: number;
}

type IVariantProduct = Omit<
   IProduct,
   "inventory" | "price" | "promotion_price"
> & {
   product_id: string;
   available: boolean;
   option1: string | null;
   option2: string | null;
   option3: string | null;
   options: string[];
   url: string | null;
};

type IProductData = Omit<
   IProduct,
   "inventory" | "price" | "promotion_price"
> & {
   category: ICategoryChild;
   categories: ICategoryChild[];
   type: [];
   shortDescription: string;
   description: string;
   options: IOptionProduct[];
   gallery: string[];
   brand?: string | null;
   hotProduct?: boolean;
   specifications: ISpecificationsProduct[];
   viewer: number;
   rate: number;
   variants: IVariantProduct[];
   breadcrumbs: ICategoryBreadcrumb[];
   createdAt?: string;
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

interface IProductSearch extends ISearch {
   [x: string]: unknown;
   category?: string;
   minPrice?: number | null;
   maxPrice?: number | null;
}

type IProductInfo = Pick<IProduct, "price" | "promotion_price" | "inventory">;

export type {
   IProductData,
   IListProduct,
   IVariantProduct,
   IOptionProduct,
   ISpecificationsProduct,
   ISpecificationAttributes,
   IValueOption,
   IProductInfo,
   IProductSearch,
};
