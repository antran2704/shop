interface ICartProduct {
   _id: string;
   title: string;
   slug: string;
   thumbnail: string;
}

interface ICartItem {
   _id: string;
   product: ICartProduct;
   options: string | null;
   quantity: number;
   variation: Omit<ICartProduct, "thumbnail" | "slug"> | null;
   inventory: number;
   price: number;
   promotion_price: number;
}

interface SendCartItem {
   product_id: string;
   variation_id: string | null;
   quantity: number;
}

interface Cart {
   _id: string;
   cart_userId: string;
   cart_status: "active" | "pending" | "failed" | "compeleted";
   cart_count: number;
   cart_total: number;
}

export type { Cart, ICartItem, SendCartItem };
