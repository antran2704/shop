import qs from "qs";

import { IDataCategory, IFilter, IQueryParam } from "~/interfaces";
import { AxiosGet } from "~/configs/axiosConfig";

const CATEGORY_KEY = {
  CATEGORIES_PAGE: "categories_page",
  CATEGORY_ID: "category_id",
  CATEGORIES_ALL: "categories_all",
};

const getCategories = async (page: number = 1) => {
  return await AxiosGet(`/categories?page=${page}`);
};

const getCategory = async (category_id: string) => {
  return await AxiosGet(`/categories/id/${category_id}`);
};

const getParentCategories = async () => {
  return await AxiosGet("categories/parent");
};

const getAllCategories = async (
  select?: IQueryParam<Partial<IDataCategory>>
) => {
  const parseQuery = qs.stringify(select);
  return await AxiosGet(`/categories/all?${parseQuery}`);
};

const getCategoriesWithFilter = async (
  filter: IFilter | null,
  page: number = 1
) => {
  return await AxiosGet(
    `/categories/search?search=${filter?.search || ""}&page=${page}`
  );
};
export {
  getCategories,
  getAllCategories,
  getParentCategories,
  getCategoriesWithFilter,
  getCategory,
  CATEGORY_KEY,
};
