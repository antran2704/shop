import { EPaymentMethod } from "~/enums";

interface IMethodPayment {
  id: number;
  title: string;
  icon?: string;
  type: EPaymentMethod;
}

export type { IMethodPayment };
