import { EDicount_type, EDiscount_applies } from "~/enums";

interface ICoupon {
    _id: string;
    discount_name: string;
    discount_code: string;
    discount_value: number;
    discount_applies: EDiscount_applies;
    discount_type: EDicount_type;
    discount_product_ids: string[];
    discount_start_date: string;
    discount_end_date: string;
    discount_max_uses: number;
    discount_used_count: number;
    discount_user_used: string[];
    discount_per_user: number;
    discount_min_value: number;
    discount_thumbnail: string | null;
    discount_active: boolean;
    discount_public: boolean;
}

interface IUseDiscount {
    discount_code: string;
    user_id: string;
    total: number;
}

export type { IUseDiscount, ICoupon };
