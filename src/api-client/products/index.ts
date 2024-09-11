import qs from "qs";
import { IFilter, IProductData, IQueryParam } from "~/interfaces";
import { AxiosGet } from "~/configs/axiosConfig";
import axios from "axios";

const PRODUCT_KEY = {
    PRODUCTS_PAGE: "products_page",
    PRODUCTS_OTHER: "products_other",
    PRODUCTS_CATEGORY: "products_category",
    PRODUCT_ID: "product_id",
    PRODUCT_HOT: "product_hot"
};

const getProductsStatic = async (page: number = 1) => {
    return await axios
        .get(`${process.env.ENDPOINT_SERVER}/products?page=${page}`)
        .then((res) => res.data);
};

const getProducts = async (page: number = 1) => {
    return await AxiosGet(`/products?page=${page}`);
};

const getHotProducts = async (page: number = 1) => {
    return await AxiosGet(`/products/hot?page=${page}`);
};

const getOtherProducts = async (
    product_id: string,
    category_id: string,
    page: number = 1,
    select?: IQueryParam<Partial<IProductData>>
) => {
    const parseQuery = qs.stringify(select);
    return await AxiosGet(
        `/products/other?category_id=${category_id}&product_id=${product_id}&page=${page}${
            parseQuery && "&" + parseQuery
        }`
    );
};

const getProductsInCategory = async (category_id: string, page: number = 1) => {
    return await AxiosGet(
        `/products/category/${category_id}?page=${page}`
    );
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
    PRODUCT_KEY
};
