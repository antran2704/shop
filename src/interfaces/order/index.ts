import {
    EOrderStatus,
    EPaymentMethod,
    EPaymentStatus,
    ESelectOrderStatus
} from "~/enums";
import { ICartItem } from "../cart";
import { IInforCheckout } from "../user";
import { ICoupon } from "../coupon";

interface ItemOrder extends ICartItem {
    price: number;
    promotion_price: number;
}

interface ItemOrderCreate {
    product: string;
    variation: string | null;
    price: number;
    promotion_price: number;
    quantity: number;
    inventory: number;
}

interface Order {
    order_id: string;
    user_id: string;
    user_infor: IInforCheckout;
    items: ItemOrder[];
    shipping_cost: number;
    sub_total: number;
    total: number;
    discount: ICoupon | null;
    status: EOrderStatus;
    payment_method: EPaymentMethod;
    payment_status: EPaymentStatus;
    cancleContent: string | null;
    note: string | null;
}

type IOrderCreate = Omit<Order, "order_id" | "cancleContent" | "note"> & {
    items: ItemOrderCreate[];
};

interface TypeShowOrder {
    title: string;
    type: ESelectOrderStatus;
}

export type { Order, ItemOrder, IOrderCreate, ItemOrderCreate, TypeShowOrder };
