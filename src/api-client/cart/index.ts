import { AxiosGet, AxiosPost } from "~/configs/axiosConfig";
import { SendCartItem, SendDeleteCartItem } from "~/interfaces";

const CART_KEY = {
  CART_USER: "cart_user",
};

const getCart = async (user_id: string) => {
  return await AxiosGet(`/carts/${user_id}`);
};

const updateCart = async (user_id: string, data: SendCartItem) => {
  return await AxiosPost(`/carts/update/${user_id}`, data);
};

const increaseCart = async (user_id: string, data: SendCartItem) => {
  return await AxiosPost(`/carts/increase/${user_id}`, data);
};

const deleteItemCart = async (user_id: string, data: SendDeleteCartItem) => {
  return await AxiosPost(`/carts/item/${user_id}`, data);
};

export { getCart, updateCart, increaseCart, deleteItemCart, CART_KEY };
