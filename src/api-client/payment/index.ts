import { AxiosPost } from "~/configs/axiosConfig";
import { Order } from "~/interfaces/order";

const createPayment = async (data: Order) => {
    return await AxiosPost("/payment/vnpay/create_payment_url", data);
};

export { createPayment };
