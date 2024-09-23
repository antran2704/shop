import {
   ENUM_ORDER_STATUS,
   ENUM_PAYMENT_METHOD,
   ENUM_PAYMENT_STATUS,
   ENUM_PROCESS_ORDER,
   ESelectOrderStatus,
} from "~/enums";
import { ICartItem } from "../cart";

// interface ItemOrder extends ICartItem {
//    price: number;
//    promotion_price: number;
// }

// interface ItemOrderCreate {
//    product: string;
//    variation: string | null;
//    price: number;
//    promotion_price: number;
//    quantity: number;
//    inventory: number;
// }

interface IOrderAddress {
   shipping_name: string;
   shipping_address: string;
   shipping_phone: string;
   shipping_email: string;
}

interface IOrderCancel {
   canCancel: boolean;
   content: string;
}

interface Discount {
   _id: string;
   discount_type: string;
   discount_name: string;
   discount_code: string;
   discount_value: number;
   discount_min_value: number;
}

interface IOrderProduct {
   product_id: string;
   model_id: string;
   image: string;
   model_name: string;
   price: number;
   promotion_price: number;
   quantity: number;
}

interface IOrderProcess {
   label: ENUM_PROCESS_ORDER;
   value: string;
}

interface IOrderShipping {
   shipping_name: string;
   shipping_fee: number;
}

interface IOrder {
   order_id: string;
   address: IOrderAddress;
   user_id: string;
   items: IOrderProduct[];
   shipping: IOrderShipping;
   processing_info: IOrderProcess[];
   order_status: ENUM_ORDER_STATUS;
   sub_total: number;
   total_before_discount: number;
   total: number;
   discount: Discount;
   currency: string;
   payment_method: ENUM_PAYMENT_METHOD;
   payment_status: ENUM_PAYMENT_STATUS;
   cancel: IOrderCancel;
   note: string;
}

interface ICreateOrder {
   address: IOrderAddress;
   user_id: string;
   items: IOrderProduct[];
   shipping: IOrderShipping;
   processing_info: IOrderProcess[];
   order_status: ENUM_ORDER_STATUS;
   sub_total: number;
   total_before_discount: number;
   total: number;
   discount: Discount | null;
   currency: string;
   payment_method: ENUM_PAYMENT_METHOD;
   payment_status: ENUM_PAYMENT_STATUS;
   cancel: IOrderCancel;
   note: string;
}

// interface TypeShowOrder {
//    title: string;
//    type: ESelectOrderStatus;
// }

export type {
   IOrder,
   ICreateOrder,
   IOrderProduct,
   IOrderAddress,
   IOrderCancel,
   IOrderProcess,
   IOrderShipping,
};
