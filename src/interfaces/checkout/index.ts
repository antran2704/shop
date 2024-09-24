import { ENUM_PAYMENT_METHOD } from "~/enums";

interface IMethodPayment {
   id: number;
   title: string;
   icon?: string;
   type: ENUM_PAYMENT_METHOD;
}

export type { IMethodPayment };
