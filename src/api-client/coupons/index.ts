import { BASE_URL } from "~/common/api";
import httpConfig from "~/configs/axiosConfig";
import { IUseDiscount } from "~/interfaces";

const getDiscount = async (
   discount_code: string,
   user_id: string,
   total: number,
) => {
   return await httpConfig
      .post(BASE_URL + `/discounts/client`, {
         discount_code,
         total,
         user_id,
      })
      .then((res) => res.data);
};

const useDiscount = async (data: IUseDiscount) => {
   return await httpConfig
      .post(BASE_URL + "/discounts/use", data)
      .then((res) => res.data);
};

export { useDiscount, getDiscount };
