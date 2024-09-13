import useSWR, { SWRConfiguration } from "swr";
import { ATTRIBUTE_KEY, getAttributes } from "~/api-client";
import { IAttribute } from "~/interfaces/attribute";
import { ISearch } from "~/interfaces/paramater";

// refesh 1 hour
const REFESH_TIME = 1000 * 60 * 60;

const handleGetAttributes = async (paramater: ISearch) => {
   try {
      const res = await getAttributes(paramater);
      if (res.status === 200) {
         return res;
      }
   } catch (error) {
      console.log(error);
   }
};

const useGetAttributes = (
   paramater: ISearch,
   options?: Partial<SWRConfiguration>,
): { attributes: IAttribute[]; loadingAttributes: boolean } => {
   const { data, isLoading } = useSWR(
      ATTRIBUTE_KEY.ATTRIBUTE_ALL,
      () => handleGetAttributes(paramater),
      {
         ...options,
         revalidateOnFocus: false,
         dedupingInterval: REFESH_TIME,
         fallbackData: { payload: [] },
      },
   );

   return { attributes: data.payload, loadingAttributes: isLoading };
};

export default useGetAttributes;
