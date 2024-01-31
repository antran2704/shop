import { AxiosGet, AxiosPost } from "~/configs/axiosConfig";
import { CartItem, SendCartItem } from "~/interfaces";

const CART_KEY = {
  CART_USER: "cart_user",
};

const getCart = async (user_id: string) => {
  return await AxiosGet(`/carts/${user_id}`);
};

const updateCart = async (user_id: string, data: SendCartItem) => {
  return await AxiosPost(`/carts/update/${user_id}`, data);
};

export { getCart, updateCart, CART_KEY };
