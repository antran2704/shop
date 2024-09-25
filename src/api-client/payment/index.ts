import { BASE_URL } from "~/common/api";
import httpConfig from "~/configs/axiosConfig";
import { IOrder } from "~/interfaces/order";

const createPayment = async (data: IOrder) => {
   return await httpConfig
      .post(BASE_URL + "/payment/vnpay/create_payment_url", data)
      .then((res) => res.data);
};

export { createPayment };
