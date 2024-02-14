import { EPaymentMethod, EPaymentStatus } from "~/enums";
import { ICartItem } from "../cart";
import { IInforCheckout } from "../user";

interface ItemOrder extends ICartItem {
  price: number;
  promotion_price: number;
}

interface Order {
  order_id: string;
  user_id: string;
  user_infor: IInforCheckout;
  items: ItemOrder[];
  shipping_cost: number;
  sub_total: number;
  total: number;
  payment_method: EPaymentMethod;
  payment_status: EPaymentStatus;
  cancleContent: string | null;
  note: string | null;
}

type IOrderCreate = Omit<
  Order,
  "order_id" | "payment_status" | "cancleContent" | "note"
>;

export type { Order, ItemOrder, IOrderCreate };
