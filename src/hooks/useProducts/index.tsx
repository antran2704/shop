import useSWR, { SWRConfiguration } from "swr";
import { PRODUCT_KEY, getProducts } from "~/api-client";

// refesh 1 hour
const REFESH_TIME = 1000 * 60 * 60;

const useProducts = (page: number = 1, options?: Partial<SWRConfiguration>) => {
  const fetcherProducts = async () => {
    try {
      const res = await getProducts(page);

      if (res.status === 200) {
        return res.payload;
      }
    } catch (error) {
      console.log(error)
    }
  };

  const {
    data: products,
    isLoading: loadingProducts,
    mutate,
    error
  } = useSWR([PRODUCT_KEY.PRODUCTS_PAGE, page], fetcherProducts, {
    ...options,
    revalidateOnFocus: false,
    dedupingInterval: REFESH_TIME,
    keepPreviousData: true,
    fallbackData: []
  });

  return { products, loadingProducts, error, mutate };
};

export { useProducts };
