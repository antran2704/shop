import useSWR, { SWRConfiguration } from "swr";
import { CART_KEY, getCart } from "~/api-client/cart";
import { Cart } from "~/interfaces";

// refesh 1 hour
const REFESH_TIME = 1000 * 60 * 30;

const fetcherCart = async (user_id: string) => {
  try {
    const res = await getCart(user_id);
    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

const useCart = (
  isReady: boolean,
  user_id: string,
  options?: Partial<SWRConfiguration>
) => {
  const { data, isLoading, mutate, error } = useSWR(
    isReady ? CART_KEY.CART_USER : null,
    () => fetcherCart(user_id),
    {
      ...options,
      revalidateOnFocus: false,
      dedupingInterval: REFESH_TIME,
      keepPreviousData: true,
      fallbackData: { payload: null },
    }
  );

  return {
    cart: data.payload as Cart,
    loadingCart: isLoading,
    error,
    mutate,
  };
};

export { useCart };
