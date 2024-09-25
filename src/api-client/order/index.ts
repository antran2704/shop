import { BASE_URL } from "~/common/api";
import httpConfig from "~/configs/axiosConfig";

import { ENUM_ORDER_STATUS, ENUM_PAYMENT_STATUS } from "~/enums";
import { parseQueryString } from "~/helpers/url";
import { ICreateOrder, IOrderSearch } from "~/interfaces/order";
import { ISearch } from "~/interfaces/paramater";

const ORDER_KEY = {
   ORDERS_USER: "orders_user",
};

const getOrders = async (paramater: IOrderSearch) => {
   const parseParamater = parseQueryString(paramater);

   return await httpConfig
      .get(BASE_URL + `/orders` + parseParamater)
      .then((res) => res.data);
};

const getOrder = async (order_id: string) => {
   return await httpConfig
      .get(BASE_URL + `/orders/${order_id}`)
      .then((res) => res.data);
};

const getOrdersByUserId = async (user_id: string, paramater: ISearch) => {
   const parseParamater = parseQueryString(paramater);
   return await httpConfig
      .get(BASE_URL + "/orders" + parseParamater)
      .then((res) => res.data);
};

const createOrder = async (data: ICreateOrder) => {
   return await httpConfig
      .post(BASE_URL + "/orders", data)
      .then((res) => res.data);
};

const updateOrder = async (order_id: string, data: ICreateOrder) => {
   return await httpConfig
      .patch(BASE_URL + `/orders/${order_id}`, data)
      .then((res) => res.data);
};

const updatePaymentStatusOrder = async (
   order_id: string,
   paymentStatus: ENUM_PAYMENT_STATUS,
) => {
   return await httpConfig
      .patch(BASE_URL + `/orders/${order_id}/payment_status`, {
         payment_status: paymentStatus,
      })
      .then((res) => res.data);
};

const updateStatusOrder = async (
   order_id: string,
   orderStatus: ENUM_ORDER_STATUS,
) => {
   return await httpConfig
      .patch(BASE_URL + `/orders/${order_id}/status`, {
         order_status: orderStatus,
      })
      .then((res) => res.data);
};

export {
   getOrders,
   getOrder,
   createOrder,
   updateOrder,
   updatePaymentStatusOrder,
   getOrdersByUserId,
   updateStatusOrder,
   ORDER_KEY,
};
