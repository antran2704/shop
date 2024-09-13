import { AxiosGet, AxiosPost } from "~/configs/axiosConfig";
import { IUseDiscount } from "~/interfaces";

const getDiscount = async (
   discount_code: string,
   user_id: string,
   total: number,
) => {
   return await AxiosPost(`/discounts/client`, {
      discount_code,
      total,
      user_id,
   });
};

const useDiscount = async (data: IUseDiscount) => {
   return await AxiosPost("/discounts/use", data);
};

export { useDiscount, getDiscount };
