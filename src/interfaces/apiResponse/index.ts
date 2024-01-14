export interface ISubCategories {
  _id: string;
  label: string;
  slug: string;
}

export interface IFilterCategory {
  title: string;
  listFilterItem: string[];
}

// interface data Categories
export interface IPagination {
  pageSize: number;
  currentPage: number;
  totalItems: number;
}

export interface IPayload {
  status: number;
  pagination: IPagination;
}

export interface ICategory {
  _id: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  filters: IFilterCategory[];
}

export interface IOptionProduct {
  value: string;
  outOfStock: boolean;
}

export interface IProduct {
  name: string;
  category: {
    title: string;
    slug: string;
  };
  shortDescription: string;
  description: string;
  price: number;
  promotionPrice: number;
  thumbnail: string;
  listImages: string[];
  hotProduct: boolean;
  quantity: number;
  sold: number;
  outOfStock: boolean;
  viewer: number;
  stars: number;
  brand: string;
  listSizes: IOptionProduct[];
  listColors: IOptionProduct[];
  slug: string;
}

export interface IOrderProduct {
  name: string;
  slug: string;
  count: number;
  price: number;
  size: string | undefined;
  color: string | undefined;
  avatarProduct: string;
}

export interface ICategoryPayload extends IPayload {
  payload: ICategory[];
}

export interface IListProduct extends IPayload {
  payload: IProduct[];
}