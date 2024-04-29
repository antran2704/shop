import { AxiosGet, AxiosPost } from "~/configs/axiosConfig";
import { Cart, SendCartItem, SendDeleteCartItem } from "~/interfaces";

const CART_KEY = {
    CART_USER: "cart_user",
    CART_ITEMS: "cart_items"
};

const getCart = async (user_id: string) => {
    return await AxiosGet(`/carts/${user_id}`);
};

const getCartItems = async (user_id: string) => {
    return await AxiosGet(`/carts/items/${user_id}`);
};

const updateCart = async (user_id: string, data: SendCartItem) => {
    return await AxiosPost(`/carts/update/${user_id}`, data);
};

const increaseCart = async (user_id: string, data: SendCartItem) => {
    return await AxiosPost(`/carts/increase/${user_id}`, data);
};

const checkInventoryItems = async (user_id: string, data: Cart) => {
    return await AxiosPost(`/carts/check_inventory/${user_id}`, data);
};

const deleteItemCart = async (user_id: string, data: SendDeleteCartItem) => {
    return await AxiosPost(`/carts/item/${user_id}`, data);
};

const deleteAllItemsCart = async (user_id: string) => {
    return await AxiosPost(`/carts/items/${user_id}`, {});
};

export {
    getCart,
    getCartItems,
    updateCart,
    increaseCart,
    checkInventoryItems,
    deleteItemCart,
    deleteAllItemsCart,
    CART_KEY
};
