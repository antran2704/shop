import useSWR, { SWRConfiguration } from "swr";
import { PRODUCT_KEY, getProducts, getProductsInCategory } from "~/api-client";
import { initPagination } from "~/data";
import { IFilter, IPagination } from "~/interfaces";

// refesh 1 hour
const REFESH_TIME = 1000 * 60 * 60;

const fetcherProducts = async (page: number) => {
  try {
    const res = await getProducts(page);

    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

const fetcherProductsInCategory = async (
  category_id: string,
  filter: IFilter | null,
  page: number = 1
) => {
  try {
    const res = await getProductsInCategory(category_id, filter, page);

    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

const useProducts = (page: number = 1, options?: Partial<SWRConfiguration>) => {
  const { data, isLoading, mutate, error } = useSWR(
    [PRODUCT_KEY.PRODUCTS_PAGE, page],
    () => fetcherProducts(page),
    {
      ...options,
      revalidateOnFocus: false,
      dedupingInterval: REFESH_TIME,
      keepPreviousData: true,
      fallbackData: { payload: [], pagination: initPagination },
    }
  );

  return {
    products: data.payload,
    pagination: data.pagination as IPagination,
    loadingProducts: isLoading,
    error,
    mutate,
  };
};

const useProductsInCategory = (
  isReady: boolean,
  category_id: string,
  filter: IFilter | null,
  page: number = 1,
  options?: Partial<SWRConfiguration>
) => {
  const {
    data,
    isLoading = true,
    mutate,
    error,
  } = useSWR(
    isReady ? [PRODUCT_KEY.PRODUCTS_PAGE, category_id, filter, page] : null,
    () => fetcherProductsInCategory(category_id, filter, page),
    {
      ...options,
      revalidateOnFocus: false,
      dedupingInterval: REFESH_TIME,
      fallbackData: { payload: [], pagination: initPagination },
    }
  );

  return {
    products: data.payload,
    pagination: data.pagination as IPagination,
    loadingProducts: isLoading,
    error,
    mutate,
  };
};

export { useProducts, useProductsInCategory };
