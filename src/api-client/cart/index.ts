import { BASE_URL } from "~/common/api";
import httpConfig from "~/configs/axiosConfig";
import { SendCartItem } from "~/interfaces";

const CART_KEY = {
   CART_USER: "cart_user",
   CART_ITEMS: "cart_items",
};

const getCart = async () => {
   return await httpConfig.get(BASE_URL + "/cart").then((res) => res.data);
};

const getCartItems = async (cartId: string) => {
   return await httpConfig
      .get(BASE_URL + `/cart/${cartId}/items`)
      .then((res) => res.data);
};

const updateCart = async (user_id: string, data: SendCartItem) => {
   return await httpConfig
      .post(BASE_URL + `/cart/${user_id}/update`, data)
      .then((res) => res.data);
};

const increaseCart = async (cartId: string, data: SendCartItem) => {
   return await httpConfig
      .post(BASE_URL + `/cart/${cartId}/increase`, data)
      .then((res) => res.data);
};

const checkInventoryItems = async (cartId: string) => {
   return await httpConfig
      .get(BASE_URL + `/cart/${cartId}/check`)
      .then((res) => res.data);
};

const deleteItemCart = async (cartId: string, cartItem: string) => {
   return await httpConfig
      .delete(BASE_URL + `/cart/${cartId}/${cartItem}`)
      .then((res) => res.data);
};

const deleteAllItemsCart = async (cartId: string) => {
   return await httpConfig
      .delete(BASE_URL + `/cart/${cartId}/all`)
      .then((res) => res.data);
};

export {
   getCart,
   getCartItems,
   updateCart,
   increaseCart,
   checkInventoryItems,
   deleteItemCart,
   deleteAllItemsCart,
   CART_KEY,
};
