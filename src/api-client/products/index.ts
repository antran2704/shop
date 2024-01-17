import { IFilter } from "~/interfaces";
import { AxiosGet } from "~/configs/axiosConfig";

const PRODUCT_KEY = {
  PRODUCTS_PAGE: "products_page",
  PRODUCT_ID: "product_id",
};

const getProducts = async (page: number = 1) => {
  return await AxiosGet(`/products?page=${page}`);
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

export { getProducts, getProduct, getProductsWithFilter, PRODUCT_KEY };
