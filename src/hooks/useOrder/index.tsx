import useSWR, { SWRConfiguration } from "swr";
import { ORDER_KEY, getOrdersByUserId } from "~/api-client/order";
import { initPagination } from "~/data";
import { ESelectOrderStatus } from "~/enums";
import { IPagination } from "~/interfaces";
import { Order } from "~/interfaces/order";

// refesh 30 minute
const REFESH_TIME = 1000 * 60 * 30;

const fetcherOrder = async (
  user_id: string,
  payload: Partial<Pick<Order, "order_id"> & {status: ESelectOrderStatus}>,
  page: number = 1
) => {
  try {
    const res = await getOrdersByUserId(user_id, payload, page);
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
  // status_order: ESelectOrderStatus,
  payload: Partial<Pick<Order, "order_id"> & {status: ESelectOrderStatus}>,
  page: number = 1,
  options?: Partial<SWRConfiguration>
) => {
  const { data, isLoading, mutate, error } = useSWR(
    isReady ? [ORDER_KEY.ORDERS_USER, payload, page] : null,
    () => fetcherOrder(user_id, payload, page),
    {
      ...options,
      revalidateOnFocus: false,
      dedupingInterval: REFESH_TIME,
      fallbackData: { pagination: initPagination },
    }
  );

  return {
    orders: data.payload as Order[] || null,
    pagination: data.pagination as IPagination,
    loadingOrders: isLoading,
    error,
    mutate,
  };
};

export { useOrders };
