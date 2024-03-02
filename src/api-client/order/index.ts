import { AxiosGet, AxiosPatch, AxiosPost } from "~/configs/axiosConfig";
import { ESelectOrderStatus } from "~/enums";
import { IOrderCreate, Order } from "~/interfaces/order";

const ORDER_KEY = {
  ORDERS_USER: "orders_user",
};

const getOrder = async (order_id: string) => {
  return await AxiosGet(`/orders/order_id/${order_id}`);
};

const getOrdersByUserId = async (
  user_id: string,
  // status: ESelectOrderStatus,
  payload: Partial<Pick<Order, "order_id"> & {status: ESelectOrderStatus}>,
  page: number = 1
) => {

  if (payload.status === ESelectOrderStatus.ALL) {
    delete payload.status
  }

  return await AxiosPost(`/orders/user/${user_id}?page=${page}`, payload);
};

const createOrder = async (data: IOrderCreate) => {
  return await AxiosPost("/orders", data);
};

const updateOrder = async (order_id: string, data: Partial<Order>) => {
  return await AxiosPatch(`/orders/${order_id}`, data);
};

const updatePaymentStatusOrder = async (
  order_id: string,
  data: Partial<Order>
) => {
  return await AxiosPatch(`/orders/payment_status/${order_id}`, data);
};

export {
  getOrder,
  createOrder,
  updateOrder,
  updatePaymentStatusOrder,
  getOrdersByUserId,
  ORDER_KEY,
};
