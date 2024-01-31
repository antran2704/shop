import { IProductData, IVariantProduct } from "../product";

interface CartItem {
  product: Partial<IProductData>;
  variation: Partial<IVariantProduct> | null;
  // option: string | null;
  quantity: number;
}

interface SendCartItem {
  product_id: string;
  variation_id: string | null;
  quantity: number;
}

interface Cart {
  cart_userId: string;
  cart_status: "active" | "pending" | "failed" | "compeleted";
  cart_products: CartItem[];
  cart_count: number;
  cart_total: number;
}

export type { Cart, CartItem, SendCartItem };
