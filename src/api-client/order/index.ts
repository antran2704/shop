import { AxiosPost } from "~/configs/axiosConfig";
import { IOrderCreate } from "~/interfaces/order";

const createOrder = async (data: IOrderCreate) => {
  return await AxiosPost("/orders", data);
};

export { createOrder };
