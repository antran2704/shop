import useSWR, { SWRConfiguration } from "swr";
import {
   PRODUCT_KEY,
   getHotProducts,
   getOtherProducts,
   getProducts,
   getProductsInCategory,
} from "~/api-client";
import { initPagination } from "~/data";
import { IPagination } from "~/interfaces";
import { ISearch } from "~/interfaces/paramater";

// refesh 1 hour
const REFESH_TIME = 1000 * 60 * 60;

const fetcherProducts = async (paramater: ISearch) => {
   try {
      const res = await getProducts(paramater);

      if (res.status === 200) {
         return res;
      }
   } catch (error) {
      console.log(error);
   }
};

const fetcherOtherProducts = async (
   productIds: string[],
   paramater: ISearch,
) => {
   const res = await getOtherProducts(productIds, paramater);

   if (res.status === 200) {
      return res;
   }
};

const fetcherHotProducts = async (page: number = 1) => {
   try {
      const res = await getHotProducts(page);

      if (res.status === 200) {
         return res;
      }
   } catch (error) {
      console.log(error);
   }
};

const fetcherProductsInCategory = async (
   category_id: string,
   paramater: ISearch,
) => {
   try {
      const res = await getProductsInCategory(category_id, paramater);
      if (res.status === 200) {
         return res;
      }
   } catch (error) {
      console.log(error);
   }
};

const useProducts = (
   paramater: ISearch,
   options?: Partial<SWRConfiguration>,
) => {
   const { data, isLoading, mutate, error } = useSWR(
      [PRODUCT_KEY.PRODUCTS_PAGE, paramater],
      () => fetcherProducts(paramater),
      {
         ...options,
         revalidateOnFocus: false,
         dedupingInterval: REFESH_TIME,
         keepPreviousData: true,
         fallbackData: { payload: [], pagination: initPagination },
      },
   );

   return {
      products: data.payload,
      pagination: data.pagination as IPagination,
      loadingProducts: isLoading,
      error,
      mutate,
   };
};

const useHotProducts = (
   page: number = 1,
   options?: Partial<SWRConfiguration>,
) => {
   const { data, isLoading, mutate, error } = useSWR(
      [PRODUCT_KEY.PRODUCT_HOT, page],
      () => fetcherHotProducts(page),
      {
         ...options,
         revalidateOnFocus: false,
         dedupingInterval: REFESH_TIME,
         keepPreviousData: true,
         fallbackData: { payload: [], pagination: initPagination },
      },
   );

   return {
      hotProducts: data.payload,
      pagination: data.pagination as IPagination,
      loadingHotProducts: isLoading,
      error,
      mutate,
   };
};

const useOtherProducts = (
   isReady: boolean,
   productIds: string[],
   paramater: ISearch,
   options?: Partial<SWRConfiguration>,
) => {
   const { data, isLoading, mutate, error } = useSWR(
      isReady ? [PRODUCT_KEY.PRODUCTS_OTHER, paramater] : null,
      () => fetcherOtherProducts(productIds, paramater),
      {
         ...options,
         revalidateOnFocus: false,
         dedupingInterval: REFESH_TIME,
         keepPreviousData: true,
         fallbackData: { payload: [], pagination: initPagination },
      },
   );

   return {
      otherProducts: data.payload,
      pagination: data.pagination as IPagination,
      loadingOtherProducts: isLoading,
      error,
      mutate,
   };
};

const useProductsInCategory = (
   isReady: boolean,
   category_id: string,
   paramater: ISearch,
   options?: Partial<SWRConfiguration>,
) => {
   const {
      data,
      isLoading = true,
      mutate,
      error,
   } = useSWR(
      isReady ? [PRODUCT_KEY.PRODUCTS_PAGE, category_id, paramater] : null,
      () => fetcherProductsInCategory(category_id, paramater),
      {
         ...options,
         revalidateOnFocus: false,
         dedupingInterval: REFESH_TIME,
         fallbackData: { payload: [], pagination: initPagination },
      },
   );

   return {
      products: data.payload,
      pagination: data.pagination as IPagination,
      loadingProducts: isLoading,
      error,
      mutate,
   };
};

export { useProducts, useOtherProducts, useHotProducts, useProductsInCategory };
