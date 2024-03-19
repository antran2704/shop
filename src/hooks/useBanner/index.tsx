import useSWR, { SWRConfiguration } from "swr";
import { BANNER_KEY, getBanners } from "~/api-client/banner";
import { Banner } from "~/interfaces/banner";

// refesh 30 minute
const REFESH_TIME = 1000 * 60 * 30;

const fetcherBanner = async () => {
  try {
    const res = await getBanners();
    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

const useBanners = (options?: Partial<SWRConfiguration>) => {
  const { data, isLoading, mutate, error } = useSWR(
    [BANNER_KEY.BANNER_ALL],
    fetcherBanner,
    {
      ...options,
      revalidateOnFocus: false,
      dedupingInterval: REFESH_TIME,
      fallbackData: { payload: [] },
    }
  );

  return {
    banners: (data.payload as Banner[]),
    loadingBanner: isLoading,
    error,
    mutate,
  };
};

export { useBanners };
