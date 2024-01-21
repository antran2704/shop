import useSWR, { SWRConfiguration } from "swr";
import { ATTRIBUTE_KEY, getAttributes } from "~/api-client";

// refesh 1 hour
const REFESH_TIME = 1000 * 60 * 60;

const handleGetAttributes = async () => {
  try {
    const res = await getAttributes();
    if (res.status === 200) {
      return res.payload;
    }
  } catch (error) {
    console.log(error);
  }
};

const useGetAttributes = (options?: Partial<SWRConfiguration>) => {
  const { data: attributes, isLoading: attributeLoading } = useSWR(
    ATTRIBUTE_KEY.ATTRIBUTE_ALL,
    () => handleGetAttributes(),
    {
      ...options,
      revalidateOnFocus: false,
      dedupingInterval: REFESH_TIME,
      fallbackData: [],
    }
  );

  return { attributes, attributeLoading };
};

export default useGetAttributes;
