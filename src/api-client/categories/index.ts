import { ISearch } from "~/interfaces/paramater";
import { parseQueryString } from "~/helpers/url";
import axios from "axios";
import { BASE_URL } from "~/common/api";

const CATEGORY_KEY = {
   CATEGORIES_PAGE: "categories_page",
   CATEGORY_ID: "category_id",
   CATEGORIES_ALL: "categories_all",
   CATEGORIES_PARENT: "categories_parent",
};

const getCategories = async (page: number = 1) => {
   return await axios
      .get(BASE_URL + `/categories?page=${page}`)
      .then((res) => res.data);
};

const getCategory = async (categoryId: string) => {
   return await axios
      .get(BASE_URL + `/categories/id/${categoryId}`)
      .then((res) => res.data);
};

const getParentCategories = async (paramater: ISearch) => {
   const parseParamater = parseQueryString(paramater);
   return await axios
      .get(BASE_URL + "/categories/parent" + parseParamater)
      .then((res) => res.data);
};

export { getCategories, getParentCategories, getCategory, CATEGORY_KEY };
