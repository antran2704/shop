import useSWR, { SWRConfiguration } from "swr";
import { CART_KEY, getCart, getCartItems } from "~/api-client/cart";
import { Cart, ICartItem } from "~/interfaces";

// refesh 30 minute
const REFESH_TIME = 1000 * 60 * 30;

const fetcherCart = async () => {
   try {
      const res = await getCart();
      if (res.status === 200) {
         return res;
      }
   } catch (error) {
      console.log(error);
   }
};

const fetcherCartItems = async (user_id: string) => {
   try {
      const res = await getCartItems(user_id);
      if (res.status === 200) {
         return res;
      }
   } catch (error) {
      console.log(error);
   }
};

const useCart = (isReady: boolean, options?: Partial<SWRConfiguration>) => {
   const { data, isLoading, mutate, error } = useSWR(
      isReady ? CART_KEY.CART_USER : null,
      () => fetcherCart(),
      {
         refreshInterval: REFESH_TIME,
         keepPreviousData: true,
         fallbackData: { payload: null },
         ...options,
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
   user_id: string,
   options?: Partial<SWRConfiguration>,
) => {
   const { data, isLoading, mutate, error } = useSWR(
      isReady ? CART_KEY.CART_ITEMS : null,
      () => fetcherCartItems(user_id),
      {
         refreshInterval: REFESH_TIME,
         keepPreviousData: true,
         fallbackData: { payload: [] },
         ...options,
      },
   );

   return {
      cart_products: data.payload as ICartItem[],
      loadingCartItems: isLoading,
      error,
      mutate,
   };
};

export { useCart, useCartItems };
