import useSWR, { SWRConfiguration } from "swr";
import { ORDER_KEY, searchOrdersByUserId } from "~/api-client/order";
import { initPagination } from "~/data";
import { ESelectOrderStatus } from "~/enums";
import { IPagination } from "~/interfaces";
import { Order } from "~/interfaces/order";

// refesh 30 minute
const REFESH_TIME = 1000 * 60 * 30;

const fetcherOrder = async (
   user_id: string,
   filter: Partial<Pick<Order, "order_id"> & { status: ESelectOrderStatus }>,
   page: number = 1,
) => {
   try {
      const res = await searchOrdersByUserId(user_id, filter, page);
      if (res.status === 200) {
         return res;
      }
   } catch (error) {
      console.log(error);
   }
};

const useOrders = (
   isReady: boolean,
   user_id: string,
   filter: Partial<Pick<Order, "order_id"> & { status: ESelectOrderStatus }>,
   page: number = 1,
   options?: Partial<SWRConfiguration>,
) => {
   const { data, isLoading, mutate, error } = useSWR(
      isReady ? [ORDER_KEY.ORDERS_USER, filter, page] : null,
      () => fetcherOrder(user_id, filter, page),
      {
         ...options,
         revalidateOnFocus: false,
         dedupingInterval: REFESH_TIME,
         fallbackData: { pagination: initPagination },
      },
   );

   return {
      orders: (data.payload as Order[]) || null,
      pagination: data.pagination as IPagination,
      loadingOrders: isLoading,
      error,
      mutate,
   };
};

export { useOrders };
