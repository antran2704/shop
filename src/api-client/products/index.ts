import axios from "axios";
import { ISearch } from "~/interfaces/paramater";
import { parseQueryString } from "~/helpers/url";
import { IProductSearch } from "~/interfaces";
import { BASE_URL } from "~/common/api";

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

const getProducts = async (paramater: IProductSearch) => {
   const parseParamater = parseQueryString(paramater, {
      arrayFormat: "comma",
      filter: (key: keyof IProductSearch, value) => {
         if (typeof value === "number" && key === "minPrice") {
            return value;
         }

         return value || undefined;
      },
   });

   return await axios
      .get(BASE_URL + "/products" + parseParamater)
      .then((res) => res.data);
};

const getHotProducts = async (page: number = 1) => {
   return await axios
      .get(BASE_URL + `/products/hot?page=${page}`)
      .then((res) => res.data);
};

const getOtherProducts = async (productIds: string[], paramater: ISearch) => {
   const parseParamater = parseQueryString({ ...paramater, productIds });

   return await axios
      .get(BASE_URL + `/products/other` + parseParamater)
      .then((res) => res.data);
};

const getProductsInCategory = async (
   category_id: string,
   paramater: ISearch,
) => {
   const parseParamater = parseQueryString(paramater);

   return await axios
      .get(BASE_URL + `/products/category/${category_id}` + parseParamater)
      .then((res) => res.data);
};

const getProduct = async (product_id: string) => {
   return await axios
      .get(BASE_URL + `/products/id/${product_id}`)
      .then((res) => res.data);
};

const getProductBySlugStatic = async (product_id: string) => {
   return await axios
      .get(`${process.env.ENDPOINT_SERVER}/products/id/${product_id}`)
      .then((res) => res.data);
};

const getProductBySlug = async (product_id: string, slug: string) => {
   return await axios
      .get(BASE_URL + `/products/${product_id}/${slug}`)
      .then((res) => res.data);
};

const getStockProduct = async (product_id: string) => {
   return await axios
      .get(BASE_URL + `/products/stock/${product_id}`)
      .then((res) => res.data);
};

export {
   getProducts,
   getProductsInCategory,
   getProduct,
   getOtherProducts,
   getProductBySlug,
   getProductBySlugStatic,
   getProductsStatic,
   getHotProducts,
   getStockProduct,
   PRODUCT_KEY,
};
