import { IDataCategory, IParentCategory } from "../category";

interface IValueOption {
  label: string;
  _id: string;
}

interface IOptionProduct {
  _id: string;
  code: string;
  name: string;
  values: IValueOption[];
}

interface ISpecificationAttributes {
  id: string;
  [name: string]: string;
}

interface ISpecificationsProduct {
  id: string;
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

interface IVariantProduct extends IProduct {
  product_id: string;
  available: boolean;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  options: string[];
  url: string | null;
}

interface IProductData extends IProduct {
  category: IParentCategory;
  categories: IParentCategory[];
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
  breadcrumbs: string[] | IDataCategory[];
  createdAt?: string;
}

type IProductHome = Pick<
  IProductData,
  | "_id"
  | "title"
  | "public"
  | "price"
  | "promotion_price"
  | "inventory"
  | "category"
  | "thumbnail"
  | "slug"
>;

export type {
  IProductData,
  IProductHome,
  IVariantProduct,
  IOptionProduct,
  ISpecificationsProduct,
  ISpecificationAttributes,
  IValueOption,
};
