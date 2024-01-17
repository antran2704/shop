import useSWR, { SWRConfiguration } from "swr";
import { CATEGORY_KEY, getAllCategories, getCategories } from "~/api-client";
import { IDataCategory, IQueryParam } from "~/interfaces";

// refesh 1 hour
const REFESH_TIME = 1000 * 60 * 60;

const selects: IQueryParam<Partial<IDataCategory>> = {};

const fetcherCategoriesAll = async () => {
  try {
    const res = await getAllCategories(selects);

    if (res.status === 200) {
      return res.payload;
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
    () => getCategories(page),
    { ...options, revalidateOnFocus: false, dedupingInterval: REFESH_TIME }
  );

  return { data, isLoading, mutate };
};

const useCategoriesAll = (options?: Partial<SWRConfiguration>) => {
  const {
    data: categories,
    isLoading: loadingCategories,
    mutate,
  } = useSWR([CATEGORY_KEY.CATEGORIES_ALL], fetcherCategoriesAll, {
    ...options,
    revalidateOnFocus: false,
    dedupingInterval: REFESH_TIME,
    keepPreviousData: true,
    fallbackData: [],
  });
  return { categories, loadingCategories, mutate };
};

export { useCategoriesAll, useCategories };
