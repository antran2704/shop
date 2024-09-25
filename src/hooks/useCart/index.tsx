import useSWR, { SWRConfiguration } from "swr";
import { CART_KEY, getCart, getCartItems } from "~/api-client/cart";
import { initPagination } from "~/data";
import { Cart, ICartItem } from "~/interfaces";

// refesh 30 minute
const REFESH_TIME = 1000 * 60 * 30;

const useCart = (isReady: boolean, options?: Partial<SWRConfiguration>) => {
   const { data, isLoading, mutate, error } = useSWR(
      isReady ? CART_KEY.CART_USER : null,
      async () => await getCart().catch((err) => err),
      {
         refreshInterval: REFESH_TIME,
         keepPreviousData: true,
         fallbackData: { payload: null },
         ...options,
         refreshWhenHidden: false,
         revalidateOnFocus: false,
      },
   );

   return {
      cart: data.payload as Cart,
      loadingCart: isLoading,
      error,
      mutate,
   };
};

const useCartItems = (
   isReady: boolean,
   cartId: string,
   options?: Partial<SWRConfiguration>,
) => {
   const { data, isLoading, mutate, error } = useSWR(
      isReady ? CART_KEY.CART_ITEMS : null,
      async () => await getCartItems(cartId).catch((err) => err),
      {
         refreshInterval: REFESH_TIME,
         keepPreviousData: true,
         fallbackData: { payload: [], pagination: initPagination },
         ...options,
      },
   );

   return {
      cart_products: data.payload as ICartItem[],
      loadingCartItems: isLoading,
      paginationCartItems: data.pagination,
      error,
      mutate,
   };
};

export { useCart, useCartItems };
