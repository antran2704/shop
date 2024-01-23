import useSWR, { SWRConfiguration } from "swr";
import {
  CATEGORY_KEY,
  getAllCategories,
  getCategories,
  getCategory,
  getParentCategories,
} from "~/api-client";
import { initPagination } from "~/data";
import { IDataCategory, IQueryParam } from "~/interfaces";

// refesh 1 hour
const REFESH_TIME = 1000 * 60 * 60;

const selects: IQueryParam<Partial<IDataCategory>> = {};

const fetcherCategoriesAll = async () => {
  try {
    const res = await getAllCategories(selects);

    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

const fetcherParentCategories = async (select?: IQueryParam<Partial<IDataCategory>>) => {
  try {
    const res = await getParentCategories(select);

    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

const fetcherCategories = async (page: number = 1) => {
  try {
    const res = await getCategories(page);

    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

const fetcherCategory = async (category_id: string) => {
  try {
    const res = await getCategory(category_id);

    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

const useCategories = (
  page: number = 1,
  options?: Partial<SWRConfiguration>
) => {
  const { data, isLoading, mutate } = useSWR(
    [CATEGORY_KEY.CATEGORIES_PAGE, page],
    () => fetcherCategories(),
    {
      ...options,
      revalidateOnFocus: false,
      dedupingInterval: REFESH_TIME,
      fallbackData: { payload: [], pagination: initPagination },
    }
  );

  return {
    categories: data.payload,
    pagination: data.pagination,
    isLoading,
    mutate,
  };
};

const useCategoriesAll = (options?: Partial<SWRConfiguration>) => {
  const { data, isLoading, mutate } = useSWR(
    [CATEGORY_KEY.CATEGORIES_ALL],
    () => fetcherCategoriesAll(),
    {
      ...options,
      revalidateOnFocus: false,
      dedupingInterval: REFESH_TIME,
      keepPreviousData: true,
      fallbackData: { payload: [], pagination: initPagination },
    }
  );
  return {
    categories: data.payload,
    pagination: data.pagination,
    loadingCategories: isLoading,
    mutate,
  };
};

const useParentCategories = (select?: IQueryParam<Partial<IDataCategory>>, options?: Partial<SWRConfiguration>) => {
  const { data, isLoading, mutate } = useSWR(
    [CATEGORY_KEY.CATEGORIES_PARENT],
    () => fetcherParentCategories(select),
    {
      ...options,
      revalidateOnFocus: false,
      dedupingInterval: REFESH_TIME,
      keepPreviousData: true,
      fallbackData: { payload: [], pagination: initPagination },
    }
  );
  return {
    categories: data.payload,
    loadingCategories: isLoading,
    mutate,
  };
};

const useCategory = (
  isReady: boolean,
  category_id: string,
  options?: Partial<SWRConfiguration>
) => {
  const { data, isLoading, mutate } = useSWR(
    isReady ? [CATEGORY_KEY.CATEGORY_ID, category_id] : null,
    () => fetcherCategory(category_id),
    {
      ...options,
      revalidateOnFocus: false,
      dedupingInterval: REFESH_TIME,
      keepPreviousData: true,
      fallbackData: {},
    }
  );
  return {
    category: data.payload || null as (IDataCategory | null),
    loadingCategory: isLoading,
    mutate,
  };
};

export { useCategoriesAll, useCategories, useParentCategories, useCategory };
