import { ENUM_PAYMENT_METHOD } from "~/enums";
import { IMethodPayment } from "~/interfaces";

const paymentMethods: IMethodPayment[] = [
   {
      id: 1,
      title: "Thanh toán khi giao hàng (COD)",
      icon: "/payments/cod.svg",
      type: ENUM_PAYMENT_METHOD.COD,
   },
   {
      id: 2,
      title: "Thanh toán Online VNPay",
      icon: "/payments/vnpay_icon.svg",
      type: ENUM_PAYMENT_METHOD.VNPAY,
   },
   {
      id: 3,
      title: "Chuyển khoản qua ngân hàng",
      icon: "/payments/banking.svg",
      type: ENUM_PAYMENT_METHOD.BANKING,
   },
];
export default paymentMethods;
