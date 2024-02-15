import { AxiosGet, AxiosPatch, AxiosPost } from "~/configs/axiosConfig";
import { IOrderCreate, Order } from "~/interfaces/order";

const getOrder = async (order_id: string) => {
  return await AxiosGet(`/orders/order_id/${order_id}`);
};

const createOrder = async (data: IOrderCreate) => {
  return await AxiosPost("/orders", data);
};

const updateOrder = async (order_id: string, data: Partial<Order>) => {
  return await AxiosPatch(`/orders/${order_id}`, data);
};

const updatePaymentStatusOrder = async (order_id: string, data: Partial<Order>) => {
  return await AxiosPatch(`/orders/payment_status/${order_id}`, data);
};

export { getOrder, createOrder, updateOrder, updatePaymentStatusOrder };
