import { AxiosGet } from "~/configs/axiosConfig";
import axios from "axios";
import { ISearch } from "~/interfaces/paramater";
import { parseQueryString } from "~/helpers/url";

const PRODUCT_KEY = {
   PRODUCTS_PAGE: "products_page",
   PRODUCTS_OTHER: "products_other",
   PRODUCTS_CATEGORY: "products_category",
   PRODUCT_ID: "product_id",
   PRODUCT_HOT: "product_hot",
};

const getProductsStatic = async (page: number = 1) => {
   return await axios
      .get(`${process.env.ENDPOINT_SERVER}/products?page=${page}`)
      .then((res) => res.data);
};

const getProducts = async (paramater: ISearch) => {
   const parseParamater = parseQueryString(paramater, { arrayFormat: "comma" });
   return await AxiosGet("/products" + parseParamater);
};

const getHotProducts = async (page: number = 1) => {
   return await AxiosGet(`/products/hot?page=${page}`);
};

const getOtherProducts = async (productIds: string[], paramater: ISearch) => {
   const parseParamater = parseQueryString({ ...paramater, productIds });

   return await AxiosGet(`/products/other` + parseParamater);
};

const getProductsInCategory = async (
   category_id: string,
   paramater: ISearch,
) => {
   const parseParamater = parseQueryString(paramater);

   return await AxiosGet(`/products/category/${category_id}` + parseParamater);
};

const getProduct = async (product_id: string) => {
   return await AxiosGet(`/products/id/${product_id}`);
};

const getProductBySlugStatic = async (product_id: string) => {
   return await axios
      .get(`${process.env.ENDPOINT_SERVER}/products/id/${product_id}`)
      .then((res) => res.data);
};

const getProductBySlug = async (product_id: string, slug: string) => {
   return await AxiosGet(`/products/${product_id}/${slug}`);
};

const getProductsWithFilter = async (filter: any, page: number = 1) => {
   return await AxiosGet(
      `/products/search?search=${filter?.search || ""}&category=${
         filter?.category || ""
      }&page=${page}`,
   );
};

const getStockProduct = async (product_id: string) => {
   return await AxiosGet(`/products/stock/${product_id}`);
};

export {
   getProducts,
   getProductsInCategory,
   getProduct,
   getOtherProducts,
   getProductBySlug,
   getProductsWithFilter,
   getProductBySlugStatic,
   getProductsStatic,
   getHotProducts,
   getStockProduct,
   PRODUCT_KEY,
};
