import { IProductData, IVariantProduct } from "../product";

interface ICartItem {
  product: Partial<IProductData>;
  variation: Partial<IVariantProduct> | null;
  quantity: number;
}

interface SendCartItem {
  product_id: string;
  variation_id: string | null;
  quantity: number;
}

type SendDeleteCartItem = Omit<SendCartItem, 'quantity'>;

interface Cart {
  _id: string;
  cart_userId: string;
  cart_status: "active" | "pending" | "failed" | "compeleted";
  cart_products: ICartItem[];
  cart_count: number;
  cart_total: number;
}

export type { Cart, ICartItem, SendCartItem, SendDeleteCartItem };
