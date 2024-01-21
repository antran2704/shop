import qs from "qs";
import { IFilter } from "~/interfaces";
import { AxiosGet } from "~/configs/axiosConfig";

const PRODUCT_KEY = {
  PRODUCTS_PAGE: "products_page",
  PRODUCTS_CATEGORY: "products_category",
  PRODUCT_ID: "product_id",
};

const getProducts = async (page: number = 1) => {
  return await AxiosGet(`/products?page=${page}`);
};

const getProductsInCategory = async (
  category_id: string,
  filter: IFilter | null,
  page: number = 1
) => {
  const parseQuery = qs.stringify(filter, { indices: false });
  return await AxiosGet(
    `/products/category/${category_id}?page=${page}${
      filter && "&" + parseQuery
    }`
  );
};

const getProduct = async (product_id: string) => {
  return await AxiosGet(`/products/id/${product_id}`);
};

const getProductsWithFilter = async (
  filter: IFilter | null,
  page: number = 1
) => {
  return await AxiosGet(
    `/products/search?search=${filter?.search || ""}&category=${
      filter?.category || ""
    }&page=${page}`
  );
};

export {
  getProducts,
  getProductsInCategory,
  getProduct,
  getProductsWithFilter,
  PRODUCT_KEY,
};
