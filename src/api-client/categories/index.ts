import qs from "qs";

import { IDataCategory, IQueryParam } from "~/interfaces";
import { AxiosGet } from "~/configs/axiosConfig";
import { ISearch } from "~/interfaces/paramater";
import { parseQueryString } from "~/helpers/url";

const CATEGORY_KEY = {
   CATEGORIES_PAGE: "categories_page",
   CATEGORY_ID: "category_id",
   CATEGORIES_ALL: "categories_all",
   CATEGORIES_PARENT: "categories_parent",
};

const getCategories = async (page: number = 1) => {
   return await AxiosGet(`/categories?page=${page}`);
};

const getCategory = async (categoryId: string) => {
   return await AxiosGet(`/categories/id/${categoryId}`);
};

const getParentCategories = async (paramater: ISearch) => {
   const parseParamater = parseQueryString(paramater);
   return await AxiosGet("/categories/parent" + parseParamater);
};

const getAllCategories = async (
   select?: IQueryParam<Partial<IDataCategory>>,
) => {
   const parseQuery = qs.stringify(select);
   return await AxiosGet(`/categories/all?${parseQuery}`);
};

export {
   getCategories,
   getAllCategories,
   getParentCategories,
   getCategory,
   CATEGORY_KEY,
};
